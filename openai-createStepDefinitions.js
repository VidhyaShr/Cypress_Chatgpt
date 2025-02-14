const cy = require('cypress')
const fs = require('fs')
const { default: OpenAI } = require("openai");


function createStepDefinitions(){
 
  const openai = new OpenAI({ apiKey: 'sk-********'});
  fs.readFile('cypress/e2e/BDD/********.feature', async (err,data1) => {
   const completion = await openai.chat.completions.create({
     messages: [{ role: "system", content: "Write a Cypress script that validates the given cucumber scenario" + data1 + "using valid class attributes as selectors"}],
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
}


async function main() {
  createStepDefinitions()
 }

main();
