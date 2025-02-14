//import { defineConfig } from "cypress";

const { defineConfig } = require("cypress")

const pg = require('pg-promise');
//const pg = require("pg")
const { Client } = require('pg')

const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const nodePolyfills =
  require("@esbuild-plugins/node-modules-polyfill").NodeModulesPolyfillPlugin;
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const oracledb = require("oracledb");
const date = new Date().getTime();
const date2 = new Date().toLocaleString().split(" ");
const day1 = date2[0].split("/"),
  day2 = day1[0].concat(day1[1]),
  day4 = day1[2].split(","),
  day3 = day2.concat(day4[0]);
const time1 = date2[1].split(":"),
  time2 = time1[0].concat(time1[1]),
  time3 = time2.concat(time1[2]);
const finalTime = day3.concat(time3);

module.exports = defineConfig({
  defaultCommandTimeout: 25000,
  pageLoadTimeout: 25000,
  viewportWidth: 1200,
  viewportHeight: 900,
  trashAssetsBeforeRuns: true,
  videoCompression: false,
  videoUploadOnPasses: false,
  video: false,
  downloadsFolder: 'cypress/fixtures/templates',

  env: {

    Adminurl: "http://********",
    apiBaseURL: "http://********",
    codeCoverage: {
      url: "http://********/__coverage__"
    },
    coverage: true,
  },
  projectId: "********",
  chromeWebSecurity: false,
  retries: {
    runMode: 0,
    openMode: 0,
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const fs = require("fs");
      allureWriter(on, config);
      require('@cypress/code-coverage/task')(on, config)
      on("task", {
        downloads: (downloadspath) => {
          return fs.readdirSync(downloadspath);
        },
      });      
      on(
        "file:preprocessor",
        createBundler({
          plugins: [nodePolyfills(), createEsbuildPlugin(config)],
        })
      );
      return config
    },

    specPattern: [
      "cypress/e2e/BDD/*.feature"
    ],
  },
});
