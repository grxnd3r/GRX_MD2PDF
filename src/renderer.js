const fs = require('fs');
const { MarkdownParser, Line } = require('./src/MarkdownParser.class.js');

const filePath = './Documents/Exercice/Exercice.md';
const fileContent = fs.readFileSync(filePath, 'utf-8');

function main()
{
    const app = document.querySelector('#app');

    const editorText = app.querySelector('#editor-text');
    editorText.textContent = fileContent;


    
    const parser = new MarkdownParser(fileContent);
}

main();