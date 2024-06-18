# MD2PDF

**MD2PDF** is a Node.js script designed to convert Markdown files into PDF format. This utility is perfect for those who need to generate professional-looking PDFs from Markdown documents quickly and efficiently.

## Features

- Converts Markdown (.md) files to PDF (.pdf)
- Simple command-line interface
- Supports GitHub Flavored Markdown
- Customizable PDF output options

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or later)
- npm (Node package manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/md2pdf.git
    ```
2. Navigate to the project directory:
    ```bash
    cd md2pdf
    ```
3. Install the required dependencies:
    ```bash
    npm install
    ```

## Usage

To convert a Markdown file to PDF, use the following command:

```bash
node md2pdf.js <input-file.md> <output-file.pdf>
```

### Example

Convert `README.md` to `README.pdf`:

```bash
node md2pdf.js README.md README.pdf
```

## Options

You can customize the PDF output by editing the `options` object in `md2pdf.js`. For example, you can set the page size, margins, and other PDF options.

```javascript
const options = {
    format: 'A4',
    margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
    },
    printBackground: true
};
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, feel free to open an issue or contact me directly at [your-email@example.com].

---

**Happy converting!**