// Filename: ./src/MarkdownParser.class.js

const fs = require('fs');

class MarkdownParser {
    constructor(content) {
        this.lines = this.parseContent(content);
    }

    parseContent(content) {
        return content.split('\n').map(line => new Line(line));
    }

    parse() {
        let html = '';
        let listStack = [];
    
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];
            const nextLine = i < this.lines.length - 1 ? this.lines[i + 1] : null;
    
            if (line.type === 'ul' || line.type === 'ol') {
                const currentDepth = line.depth;
    
                while (listStack.length > currentDepth) {
                    html += `</${listStack.pop()}>`;
                }
    
                if (listStack.length < currentDepth) {
                    const listType = line.type;
                    const listClass = listType === 'ul' ? 'markdown-content markdown-unordered-list' : 'markdown-content markdown-ordered-list';
                    html += `<${listType} class="${listClass}">`;
                    listStack.push(listType);
                }
    
                html += line.render();
            } else {
                while (listStack.length > 0) {
                    html += `</${listStack.pop()}>`;
                }
                html += line.render();
            }
        }
    
        // Close any remaining open lists
        while (listStack.length > 0) {
            html += `</${listStack.pop()}>`;
        }
    
        return html;
    }

    toHTML() {
        return `<html><body>${this.parse()}</body></html>`;
    }
}

class Line {
    constructor(text) {
        this.rawContent = text;
        this.content = this.getText();
        this.type = this.getType();
        this.depth = this.getDepth();
    }

    getText() {
        return this.rawContent.trim();
    }

    getDepth() {
        const match = this.rawContent.match(/^\s+/);
        return match ? Math.floor(match[0].length / 2) : 0;
    }

    getType() {
        const trimmedContent = this.rawContent.trim();
        if (trimmedContent.startsWith('# ')) return 'h1';
        if (trimmedContent.startsWith('## ')) return 'h2';
        if (trimmedContent.startsWith('### ')) return 'h3';
        if (trimmedContent.startsWith('- ')) return 'ul';
        if (trimmedContent.match(/^\d+\. /)) return 'ol';
        if (trimmedContent.startsWith('```')) return 'code';
        if (trimmedContent.startsWith('>')) return 'blockquote';
        return 'p';
    }

    render() {
        let content = this.applyInlineStyles(this.content);
    
        switch (this.type) {
            case 'h1':
                return `<h1 class="markdown-content markdown-h1">${content.substring(1).trim()}</h1>`;
            case 'h2':
                return `<h2 class="markdown-content markdown-h2">${content.substring(2).trim()}</h2>`;
            case 'h3':
                return `<h3 class="markdown-content markdown-h3">${content.substring(3).trim()}</h3>`;
            case 'ul':
                return `<li class="markdown-content markdown-ul-item">${content.replace(/^- /, '')}</li>`;
            case 'ol':
                return `<li class="markdown-content markdown-ol-item">${content.replace(/^\d+\. /, '')}</li>`;
            case 'code':
                return `<pre class="markdown-content markdown-code"><code>${content}</code></pre>`;
            case 'blockquote':
                return `<blockquote class="markdown-content markdown-blockquote">${content.substring(1).trim()}</blockquote>`;
            default:
                return `<p class="markdown-content markdown-paragraph">${content}</p>`;
        }
    }

    applyInlineStyles(text) {
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="markdown-content markdown-bold">$1</strong>');
        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em class="markdown-content markdown-italic">$1</em>');
        // Code
        text = text.replace(/`(.*?)`/g, '<code class="markdown-content markdown-inline-code">$1</code>');
        // Links
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="markdown-content markdown-link">$1</a>');
        return text;
    }
}

module.exports = { MarkdownParser, Line };