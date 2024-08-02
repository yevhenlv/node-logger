// @ts-ignore
const md5 = require('blueimp-md5/js/md5');
const fs  = require('fs');
const {
  LOGGER_DATA,
  getFileServicePath,
  getFullFilePath,
} = require('@ed/logger/data');

// 0 - Emergency
// 1 - Alert
// 2 - Critical
// 3 - Error
// 4 - Warning
// 5 - Notice
// 6 - Informational
// 7 - Debug

let PATH_CHECKED = false;
let PENDING_LOGS = [];

const getFilePath = () => new Promise((resolve) => {
  const servicePath = getFileServicePath();
  const fullPath = getFullFilePath();

  if (PATH_CHECKED) {
    resolve(getFullFilePath());
  } else {
    try {
      fs.access(servicePath, fs.constants.F_OK, (access_error) => {
        if (access_error) {
          if (!fs.existsSync(servicePath)) {
            fs.mkdirSync(servicePath, { recursive: true });
          }

          fs.close(fs.openSync(fullPath, 'w'), (close_err) => {
            if (close_err) {
              resolve('');
              return;
            }
            PATH_CHECKED = true;
            resolve(fullPath);
          });
        } else {
          fs.close(fs.openSync(fullPath, 'a'), (close_err) => {
            if (close_err) {
              resolve('');
              return;
            }
            PATH_CHECKED = true;
            resolve(fullPath);
          });
        }
      });
    } catch (error) {
      resolve('');
    }
  }
});

const getLogData = () => ({
  log_id: LOGGER_DATA.LOG_ID,
  project: LOGGER_DATA.PROJECT_NAME,
  service_name: LOGGER_DATA.SERVICE_NAME,
  timestamp: new Date().getTime(),
});

const getErrorLogData = (error, type) => ({
  ...getLogData(),
  leftl: 2,
  short_message: error?.message || `Error with logs file ${type}`,
});

const log = async (
  level,
  short_message,
  x_request_id,
) => {
  const data = `${JSON.stringify({
    ...getLogData(),
    level: typeof level === 'number' ? level : 7,
    short_message,
    'x-request-id': x_request_id || `${LOGGER_DATA.SERVICE_NAME}_${md5(new Date().getTime())}`,
  })}\n`;

  const file_path = await getFilePath();

  if (file_path) {
    try {
      const content = fs.readFileSync(file_path, { encoding: 'utf-8' });
      let updated = `${content}${data}`;

      if (PENDING_LOGS?.length) {
        PENDING_LOGS.forEach((info) => {
          updated = `${updated}${info}`;
        });
      }

      fs.writeFileSync(file_path, updated, { encoding: 'utf-8' });
      PENDING_LOGS = [];
    } catch (error) {
      PATH_CHECKED = false;
      PENDING_LOGS.push(data);
      PENDING_LOGS.push(`${JSON.stringify(getErrorLogData(error, 'writing'))}\n`);
    }
  }
};

module.exports = {
  log,
};
