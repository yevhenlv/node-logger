const path = require('path');

const LOGGER_DATA = {
  LOG_ID: '',
  PROJECT_NAME: '',
  SERVICE_NAME: '',

  FILE_NAME: `${process.env.HOSTNAME}_application.log`,
  FILE_PATH: path.resolve(
    __dirname,
    `/var/fluentbit-logs/${getProjectName()}/${getLogId()}`,
  ),
};

const getProjectName = () => LOGGER_DATA.PROJECT_NAME;

const getLogId = () => LOGGER_DATA.LOG_ID;

const getFileServicePath = () => path.resolve(
  __dirname,
  `/var/fluentbit-logs/${getProjectName()}/${getLogId()}/${LOGGER_DATA.SERVICE_NAME}`);

const getFullFilePath = () => path.resolve(`${getFileServicePath()}`, LOGGER_DATA.FILE_NAME);

const setServiceName = (SERVICE_NAME) => {
  const parsed = SERVICE_NAME.replace(/-/g, '_').toUpperCase();

  LOGGER_DATA.LOG_ID = process.env[`ED_${parsed}_LOG_ID`] || 'unknown';
  LOGGER_DATA.PROJECT_NAME = process.env[`ED_${parsed}_PROJECT_NAME`] || 'englishdom';
  LOGGER_DATA.SERVICE_NAME = SERVICE_NAME;
};

module.exports = {
  getProjectName,
  getLogId,
  LOGGER_DATA,
  getFileServicePath,
  getFullFilePath,
  setServiceName,
};
