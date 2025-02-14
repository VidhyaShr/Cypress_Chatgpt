const cy = require('cypress')
const fs = require('fs')
const { default: OpenAI } = require("openai");
var description, result
var JiraApi = require('jira-client');
var jira = new JiraApi({
  protocol: 'https',
  host: '********',
  username: '********',
  password: '********'
});
var delayInMilliseconds = 9000; //1 second
function jiraStory(){
   jira.findIssue('********')
  .then(function(issue) {
    description = issue.fields.description
    fs.writeFile('cypress/fixtures/JIRAStory.txt', description, function(err,data){
      if (err) {
        return console.error(err);
     }
    })
  })
  .catch(function(err) {
    console.error(err);
  });
}

function createScenarios(){
  setTimeout(()=>{
    const openai = new OpenAI({ apiKey: 'sk-proj-************************************'});
    fs.readFile('cypress/fixtures/JIRAStory.txt', 'utf8', async (err,data) => {
     const completion = await openai.chat.completions.create({
       messages: [{ role: "system", content: data + "For above jira story generate functional test scenarios with scenario id and scenario description columns" }],
       model: "gpt-3.5-turbo",
     });
  var keys1 = Object.keys(completion.choices[0])
  var values1 = Object.values(completion.choices[0])
     var messageValues = Object.values(values1[1])
     var finalMessage = messageValues[1]
    fs.writeFile('cypress/fixtures/testscenarios.xls', finalMessage, function(err,data){
      if (err) {
        return console.error(err);
     }
    })
  
   })
  }, delayInMilliseconds)
}




function createTestCases(){
  setTimeout(()=>{
    const openai = new OpenAI({ apiKey: 'sk-*******************************'});
    fs.readFile('cypress/fixtures/testscenarios.xls', 'utf8', async (err,data) => {
     const completion = await openai.chat.completions.create({
       messages: [{ role: "system", content: data + "For above scenarios generate functional test cases with test steps, actual result and expected result" }],
       model: "gpt-3.5-turbo",
     });
  var keys1 = Object.keys(completion.choices[0])
  var values1 = Object.values(completion.choices[0])
     var messageValues = Object.values(values1[1])
     var finalMessage = messageValues[1]
    fs.writeFile('cypress/fixtures/testcases.csv', finalMessage, function(err,data){
      if (err) {
        return console.error(err);
     }
    })
  
   })
  }, delayInMilliseconds)
}

function createFeatureFile(){
  setTimeout(()=>{
    const openai = new OpenAI({ apiKey: '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'});
    fs.readFile('cypress/e2e/BDD/********.feature', 'utf8', async (err,data) => {
     const completion = await openai.chat.completions.create({
       messages: [{ role: "system", content: "In cypress BDD Framework, create step definitions using valid selectors for given scenario" + data}],
       model: "gpt-3.5-turbo",
     });
  var keys1 = Object.keys(completion.choices[0])
  var values1 = Object.values(completion.choices[0])
     var messageValues = Object.values(values1[1])
     var finalMessage = messageValues[1]
    fs.writeFile('cypress/e2e/BDD/stepDefinitions.cy.js', finalMessage, function(err,data){
      if (err) {
        return console.error(err);
     }
    })
  
   })
  }, delayInMilliseconds)
}


async function main() {
 // jiraStory()
 // createFeatureFile()
   createScenarios()
 }

main();
