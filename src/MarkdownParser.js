class MarkdownParser {

    constructor() 
    {
        this.lines = [];
        console.log('MarkdownParser constructor');
    }
}

class Line
{
    constructor(text) 
    {
        this.rawContent = text;
        this.content = this.getText();
        this.type = this.getType();
        
    }
}

module.exports = { MarkdownParser, Line };