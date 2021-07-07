/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1622737610702_6627';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    mysql: {
      // database configuration
      client: {
        // host
        host: '192.168.1.4',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: 'Yy@123..',
        // database
        database: 'react_blog',    
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: ["*"],
    },
    cors: {
      origin: "*",
      credentials: true, // 允许跨越
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
