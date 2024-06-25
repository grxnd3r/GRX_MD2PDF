// Filename: ./src/renderer.js

const fs = require('fs');
const { MarkdownParser } = require('./src/MarkdownParser.class.js');
const pdf = require('html-pdf');

const filePath = './Documents/Exercice/Exercice.md';
const fileContent = fs.readFileSync(filePath, 'utf-8');

function main() 
{
    const app = document.querySelector('#app');
    const editorText = app.querySelector('#editor-text');
    const preview = app.querySelector('#preview');

    // Set the editor value to the file content
    editorText.value = fileContent;

    refreshPreview();

    editorText.addEventListener('input', () => 
    {
        refreshPreview();
    });

    syncScrollSpeed(editorText, preview);
}

function generatePDF(html, outputPath) 
{
    const options = { format: 'A4' };

    pdf.create(html, options).toFile(outputPath, (err, res) => 
    {
        if (err) return console.log(err);
        console.log(`PDF generated successfully: ${res.filename}`);
    });
}

function syncScrollSpeed(container1, container2) 
{
    let isScrolling = false;
    const refreshRate = 10;

    function syncScroll(source, target) 
    {
        if (!isScrolling) {
            isScrolling = true;
            const sourceScrollRatio = source.scrollTop / (source.scrollHeight - source.clientHeight);
            target.scrollTop = sourceScrollRatio * (target.scrollHeight - target.clientHeight);
            setTimeout(() => { isScrolling = false; }, refreshRate);
        }
    }

    container1.addEventListener('scroll', () => syncScroll(container1, container2));
    container2.addEventListener('scroll', () => syncScroll(container2, container1));
}

function refreshPreview() 
{
    const app = document.querySelector('#app');
    const editorText = app.querySelector('#editor-text');
    const preview = app.querySelector('#preview');

    const markdownParser = new MarkdownParser(editorText.value);
    const html = markdownParser.toHTML();
    preview.innerHTML = html;
}

main();