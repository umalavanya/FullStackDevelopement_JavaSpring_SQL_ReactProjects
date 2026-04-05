// Install openai, docx and fs modules before running
// npm install openai docx fs
// Deepseek API documentation: https://docs.deepseek.com/api-reference
const { OpenAI } = require("openai");
const fs = require("fs");
const { Document, Packer, Paragraph, TextRun } = require("docx");

// 1. Initialize DeepSeek client
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-04308d103172445bbe5e899c076f9de5' // Replace with your actual key
});

// 2. Helper function for the 2-minute delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runRequests() {
  const requests = [
    "Explain the concept of quantum entanglement.",
    "Write a short story about a robot learning to paint.",
    "Provide a recipe for a classic chocolate cake."
  ];

  const results = [];

  for (let i = 0; i < requests.length; i++) {
    console.log(`Processing request ${i + 1}/${requests.length}: "${requests[i]}"`);

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: requests[i] }],
        model: "deepseek-chat",
      });

      const responseText = completion.choices[0].message.content;
      results.push({ query: requests[i], response: responseText });

      // 3. Apply 2-minute delay (120,000 ms) except after the last request
      if (i < requests.length - 1) {
        console.log("Waiting 2 minutes before the next request...");
        await delay(120000); 
      }
    } catch (error) {
      console.error(`Error on request ${i + 1}:`, error.message);
    }
  }

  // 4. Create and save the .docx file
  const doc = new Document({
    sections: [{
      properties: {},
      children: results.flatMap(item => [
        new Paragraph({
          children: [new TextRun({ text: `Query: ${item.query}`, bold: true, break: 1 })],
        }),
        new Paragraph({
          children: [new TextRun({ text: item.response, break: 1 })],
        }),
        new Paragraph({ children: [new TextRun({ text: "____________________", break: 1 })] }),
      ]),
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("DeepSeek_Responses.docx", buffer);
  console.log("File saved: DeepSeek_Responses.docx");
}

runRequests();
