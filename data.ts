import path from 'path';

export const getProjectName = () => process.env.ED_NODE_GRAPHQL_PROJECT_NAME || 'englishdom';

export const getLogId = () => process.env.ED_NODE_GRAPHQL_LOG_ID || 'unknown';

export const LOGGER_DATA = {
  LOG_ID: process.env.ED_NODE_GRAPHQL_LOG_ID || 'unknown',
  PROJECT_NAME: process.env.ED_NODE_GRAPHQL_PROJECT_NAME || 'englishdom',
  SERVICE_NAME: '',

  FILE_NAME: `${process.env.HOSTNAME}_application.log`,
  FILE_PATH: path.resolve(
    __dirname,
    `/var/fluentbit-logs/${getProjectName()}/${getLogId()}`,
  ),
};

export const getFileServicePath = () => `${LOGGER_DATA.FILE_PATH}/${LOGGER_DATA.SERVICE_NAME}`;

export const getFullFilePath = () => path.resolve(
  `${LOGGER_DATA.FILE_PATH}/${LOGGER_DATA.SERVICE_NAME}`,
  LOGGER_DATA.FILE_NAME,
);

export const setServiceName = (SERVICE_NAME: string) => {
  LOGGER_DATA.SERVICE_NAME = SERVICE_NAME;
};
