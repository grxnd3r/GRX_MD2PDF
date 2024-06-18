const fs = require('fs');
const { MarkdownParser, Line } = require('./MarkdownParser.js');

const filePath = './Documents/Exercice/Exercice.md';
const fileContent = fs.readFileSync(filePath, 'utf-8');

function main()
{
    console.log(fileContent);
    const parser = new MarkdownParser(fileContent);
}



// KEEP IT AT THE END OF THE FILE
main();