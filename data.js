const path = require('path');

const getProjectName = () => process.env.ED_NODE_GRAPHQL_PROJECT_NAME || 'englishdom';

const getLogId = () => process.env.ED_NODE_GRAPHQL_LOG_ID || 'unknown';

const LOGGER_DATA = {
  LOG_ID: process.env.ED_NODE_GRAPHQL_LOG_ID || 'unknown',
  PROJECT_NAME: process.env.ED_NODE_GRAPHQL_PROJECT_NAME || 'englishdom',
  SERVICE_NAME: '',

  FILE_NAME: `${process.env.HOSTNAME}_application.log`,
  FILE_PATH: path.resolve(
    __dirname,
    `/var/fluentbit-logs/${getProjectName()}/${getLogId()}`,
  ),
};

const getFileServicePath = () => `${LOGGER_DATA.FILE_PATH}/${LOGGER_DATA.SERVICE_NAME}`;

const getFullFilePath = () => path.resolve(
  `${LOGGER_DATA.FILE_PATH}/${LOGGER_DATA.SERVICE_NAME}`,
  LOGGER_DATA.FILE_NAME,
);

const setServiceName = (SERVICE_NAME) => {
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
