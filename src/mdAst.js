function createAST(markdownContent) {
  // Split the Markdown content into an array of lines
  const lines = markdownContent.split("\n");

  // Create the root node of the Abstract Syntax Tree (AST)
  const ast = {
    type: "root",
    children: [],
  };

  // Variables to keep track of the current nodes
  // These variables help in maintaining the proper hierarchy and structure of the AST while processing the Markdown conten
  let currentNode = ast;
  let currentParagraph = null;
  let currentTable = null;
  let currentTableRow = null;
  let currentTableCell = null;

  // Helper function to create a text node
  function createTextNode(value) {
    return { type: "text", value };
  }

  // Helper function to create a paragraph node
  function createParagraphNode() {
    const paragraphNode = {
      type: "paragraph",
      children: [],
    };
    currentNode.children.push(paragraphNode);
    currentParagraph = paragraphNode;
  }

  // Helper function to create a table node
  function createTableNode() {
    const tableNode = {
      type: "table",
      children: [],
    };
    currentNode.children.push(tableNode);
    currentTable = tableNode;
  }

  // Helper function to create a table row node
  function createTableRowNode() {
    const tableRowNode = {
      type: "tableRow",
      children: [],
    };
    currentTable.children.push(tableRowNode);
    currentTableRow = tableRowNode;
  }

  // Helper function to create a table cell node
  function createTableCellNode() {
    const tableCellNode = {
      type: "tableCell",
      children: [],
    };
    currentTableRow.children.push(tableCellNode);
    currentTableCell = tableCellNode;
  }

  // Iterate over each line of the Markdown content
  for (const line of lines) {
    // Check if the line starts with '#' (heading)
    if (line.startsWith("#")) {
      const depth = line.split(" ")[0].length;
      const text = line.slice(depth + 1);
      const headingNode = {
        type: "heading",
        depth,
        children: [createTextNode(text)],
      };
      currentNode.children.push(headingNode);
      currentParagraph = null;
      currentTable = null;
      currentTableRow = null;
      currentTableCell = null;
    }
    // Check if the line starts with '```' (preformatted text)
    else if (line.startsWith("```")) {
      const preformattedTextNode = {
        type: "preformattedText",
        children: [],
      };
      currentNode.children.push(preformattedTextNode);
      currentParagraph = null;
      currentTable = null;
      currentTableRow = null;
      currentTableCell = null;

      let preformattedTextContent = "";
      let index = lines.indexOf(line) + 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        preformattedTextContent += lines[index] + "\n";
        index++;
      }
      preformattedTextNode.children.push(
        createTextNode(preformattedTextContent),
      );
    }
    // Check if the line starts with '|' (table)
    else if (line.startsWith("|")) {
      if (!currentTable) {
        createTableNode();
      }

      if (!currentTableRow) {
        createTableRowNode();
      }

      const cells = line.split("|").slice(1, -1);
      for (const cell of cells) {
        createTableCellNode();
        currentTableCell.children.push(createTextNode(cell.trim()));
      }

      currentTableRow = null;
      currentTableCell = null;
    }
    // Check if the line is not empty (paragraph or other elements)
    else if (line.trim() !== "") {
      if (!currentParagraph) {
        createParagraphNode();
      }

      // Regular expressions for different Markdown elements
      const boldRegex = /\*\*(.*?)\*\*/g;
      const italicRegex = /\*(.*?)\*/g;
      const strikethroughRegex = /~~(.*?)~~/g;
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
      const inlineCodeRegex = /`(.*?)`/g;
      const blockquoteRegex = /^>\s*(.*)/;
      const unorderedListRegex = /^[-*+]\s*(.*)/;
      const orderedListRegex = /^(\d+)\.\s*(.*)/;
      const horizontalRuleRegex = /^(-{3,}|_{3,}|\*{3,})/;

      let currentLine = line;
      let match;

      // Process bold elements
      while ((match = boldRegex.exec(currentLine))) {
        const [fullMatch, boldText] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        if (startIndex > 0) {
          currentParagraph.children.push(
            createTextNode(currentLine.slice(0, startIndex)),
          );
        }

        const boldNode = {
          type: "bold",
          children: [createTextNode(boldText)],
        };
        currentParagraph.children.push(boldNode);

        currentLine = currentLine.slice(endIndex);
      }

      // Process italic elements
      while ((match = italicRegex.exec(currentLine))) {
        const [fullMatch, italicText] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        if (startIndex > 0) {
          currentParagraph.children.push(
            createTextNode(currentLine.slice(0, startIndex)),
          );
        }

        const italicNode = {
          type: "italic",
          children: [createTextNode(italicText)],
        };
        currentParagraph.children.push(italicNode);

        currentLine = currentLine.slice(endIndex);
      }

      // Process strikethrough elements
      while ((match = strikethroughRegex.exec(currentLine))) {
        const [fullMatch, strikethroughText] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        if (startIndex > 0) {
          currentParagraph.children.push(
            createTextNode(currentLine.slice(0, startIndex)),
          );
        }

        const strikethroughNode = {
          type: "strikethrough",
          children: [createTextNode(strikethroughText)],
        };
        currentParagraph.children.push(strikethroughNode);

        currentLine = currentLine.slice(endIndex);
      }

      // Process link elements
      while ((match = linkRegex.exec(currentLine))) {
        const [fullMatch, linkText, linkUrl] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        if (startIndex > 0) {
          currentParagraph.children.push(
            createTextNode(currentLine.slice(0, startIndex)),
          );
        }

        const linkNode = {
          type: "link",
          url: linkUrl,
          children: [createTextNode(linkText)],
        };
        currentParagraph.children.push(linkNode);

        currentLine = currentLine.slice(endIndex);
      }

      // Process image elements
      while ((match = imageRegex.exec(currentLine))) {
        const [fullMatch, altText, imageUrl] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        if (startIndex > 0) {
          currentParagraph.children.push(
            createTextNode(currentLine.slice(0, startIndex)),
          );
        }

        const imageNode = {
          type: "image",
          url: imageUrl,
          alt: altText,
        };
        currentParagraph.children.push(imageNode);

        currentLine = currentLine.slice(endIndex);
      }

      // Process inline code elements
      while ((match = inlineCodeRegex.exec(currentLine))) {
        const [fullMatch, codeText] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        if (startIndex > 0) {
          currentParagraph.children.push(
            createTextNode(currentLine.slice(0, startIndex)),
          );
        }

        const inlineCodeNode = {
          type: "inlineCode",
          children: [createTextNode(codeText)],
        };
        currentParagraph.children.push(inlineCodeNode);

        currentLine = currentLine.slice(endIndex);
      }

      // Process blockquote elements
      if ((match = blockquoteRegex.exec(currentLine))) {
        const [, quotedText] = match;
        const blockquoteNode = {
          type: "blockquote",
          children: [createTextNode(quotedText)],
        };
        currentParagraph.children.push(blockquoteNode);

        currentLine = "";
      }

      // Process unordered list elements
      if ((match = unorderedListRegex.exec(currentLine))) {
        const [, listItemText] = match;
        const unorderedListNode = {
          type: "unorderedList",
          children: [createTextNode(listItemText)],
        };
        currentParagraph.children.push(unorderedListNode);

        currentLine = "";
      }

      // Process ordered list elements
      if ((match = orderedListRegex.exec(currentLine))) {
        const [, orderNumber, listItemText] = match;
        const orderedListNode = {
          type: "orderedList",
          order: parseInt(orderNumber),
          children: [createTextNode(listItemText)],
        };
        currentParagraph.children.push(orderedListNode);

        currentLine = "";
      }

      // Process horizontal rule elements
      if ((match = horizontalRuleRegex.exec(currentLine))) {
        const horizontalRuleNode = {
          type: "horizontalRule",
        };
        currentParagraph.children.push(horizontalRuleNode);

        currentLine = "";
      }

      // Add any remaining text as a text node
      if (currentLine.length > 0) {
        currentParagraph.children.push(createTextNode(currentLine));
      }
    }
    // Reset the current paragraph if the line is empty
    else {
      currentParagraph = null;
    }
  }

  // Return the constructed AST
  return ast;
}

module.exports = createAST;
