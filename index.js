const fs = require("fs");
const path = require("path");
const open = require("open");
const createAST = require("./src/mdAst.js");
const AstToHtml = require("./src/astHtml.js");

// Validate the input file path
function validateFilePath(filePath) {
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist.");
  }

  // Check if the file extension is .md
  if (path.extname(filePath).toLowerCase() !== ".md") {
    throw new Error("File is not a Markdown file (.md).");
  }
}

// Function to convert markdown file to HTML and display in default browser
async function displayMarkdownInBrowser(filePath) {
  //Validate file path
  validateFilePath(filePath);

  // Read the Markdown content
  const markdown = fs.readFileSync(filePath, "utf8");

  // Create AST
  const ast = createAST(markdown);

  // Convert AST to HTML
  const html = AstToHtml(ast);

  // Create a unique temporary HTML file path
  const tempHtmlPath = path.join(
    process.cwd(),
    `tempOutput-${Date.now()}.html`,
  );
  fs.writeFileSync(tempHtmlPath, html);

  // Open the HTML file in the default browser
  await open(tempHtmlPath);
}

let filePath = process.argv[2];

displayMarkdownInBrowser(filePath).catch(console.error);
