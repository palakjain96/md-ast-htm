function astToHTML(ast) {
  if (!ast) return "";

  const nodeHandlers = {
    root: handleRoot,
    heading: handleHeading,
    paragraph: handleParagraph,
    text: handleText,
    preformattedText: handlePreformattedText,
    table: handleTable,
    tableRow: handleTableRow,
    tableCell: handleTableCell,
    bold: handleBold,
    italic: handleItalic,
    strikethrough: handleStrikethrough,
    link: handleLink,
    image: handleImage,
    inlineCode: handleInlineCode,
    blockquote: handleBlockquote,
    unorderedList: handleUnorderedList,
    orderedList: handleOrderedList,
    horizontalRule: handleHorizontalRule,
  };

  if (nodeHandlers.hasOwnProperty(ast.type)) {
    return nodeHandlers[ast.type](ast);
  }

  return "";
}

function handleRoot(ast) {
  let htmlContent = "";
  for (const child of ast.children) {
    htmlContent += astToHTML(child);
  }
  return htmlContent;
}

function handleHeading(ast) {
  return `<h${ast.depth}>${ast.children.map((child) => astToHTML(child)).join("")}</h${ast.depth}>`;
}

function handleParagraph(ast) {
  return `<p>${ast.children.map((child) => astToHTML(child)).join("")}</p>`;
}

function handleText(ast) {
  return ast.value;
}

function handlePreformattedText(ast) {
  return `<pre>${ast.children.map((child) => astToHTML(child)).join("")}</pre>`;
}

function handleTable(ast) {
  return `<table>${ast.children.map((child) => astToHTML(child)).join("")}</table>`;
}

function handleTableRow(ast) {
  return `<tr>${ast.children.map((child) => astToHTML(child)).join("")}</tr>`;
}

function handleTableCell(ast) {
  return `<td>${ast.children.map((child) => astToHTML(child)).join("")}</td>`;
}

function handleBold(ast) {
  return `<strong>${ast.children.map((child) => astToHTML(child)).join("")}</strong>`;
}

function handleItalic(ast) {
  return `<em>${ast.children.map((child) => astToHTML(child)).join("")}</em>`;
}

function handleStrikethrough(ast) {
  return `<del>${ast.children.map((child) => astToHTML(child)).join("")}</del>`;
}

function handleLink(ast) {
  return `<a href="${ast.url}">${ast.children.map((child) => astToHTML(child)).join("")}</a>`;
}

function handleImage(ast) {
  return `<img src="${ast.url}" alt="${ast.alt}" />`;
}

function handleInlineCode(ast) {
  return `<code>${ast.children.map((child) => astToHTML(child)).join("")}</code>`;
}

function handleBlockquote(ast) {
  return `<blockquote>${ast.children.map((child) => astToHTML(child)).join("")}</blockquote>`;
}

function handleUnorderedList(ast) {
  return `<ul><li>${ast.children.map((child) => astToHTML(child)).join("")}</li></ul>`;
}

function handleOrderedList(ast) {
  return `<ol start="${ast.order}"><li>${ast.children.map((child) => astToHTML(child)).join("")}</li></ol>`;
}

function handleHorizontalRule(ast) {
  return `<hr />`;
}

module.exports = astToHTML;
