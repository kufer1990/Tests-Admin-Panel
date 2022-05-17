/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}


// const { isFileExist } = require('cy-verify-downloads');

// module.exports = (on, config) => {
//   on('task', { isFileExistm })
// }

// const { isFileExist, findFiles } = require('cy-verify-downloads');




const fs = require('fs');
module.exports = (on, config) => {
  on('task', {
    getDownload: () => {
      const downloadsFolder = config['downloadsFolder'];
      return new Promise((resolve, reject) => {
        const watcher = fs.watch(downloadsFolder, (eventType, filename) => {
          if (eventType === 'rename' && !filename.endsWith('.crdownload')) {
            resolve(filename);
            watcher.close();
          }
        });
        setTimeout(reject, config.taskTimeout); // Or another timeout if desired
      });
    },
  });
};



// module.exports = (on, config) => {
//   on('task', { isFileExist, findFiles })
// }
