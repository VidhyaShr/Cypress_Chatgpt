// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import "cypress-cucumber-attach-screenshots-to-failed-steps"
// Import commands.js using ES2015 syntax:
import './Utils/generic'
import './Utils/StockCommands'
import './Utils/AdministratorCommands'
import './Utils/BankCommands'
import './Utils/authourizationcommands'
import './Utils/comissioncommands'
import './Utils/securityCommands'
import './Utils/subscriberCommands'
import './Utils/registration'
//import 'cypress-failed-log'

import '@shelex/cypress-allure-plugin';
import '@cypress/code-coverage/support'

module.exports = (on, config) => {
    on("file:preprocessor", cucumber());
  };
//  require('cypress-failed-log')    
  
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    
    return false
    })

// Alternatively you can use CommonJS syntax:
// require('./commands')

//import "cypress-fail-fast";

// const options = {
//   // Log console output only
//   collectTypes: ['cy:xhr', 'cy:request', 'cy:intercept'],
//   xhr:
//   {
//     printRequestData: true
//   }
   
 
// };
// //import 'cypress-failed-log'
// require('cypress-terminal-report/src/installLogsCollector')(options);
