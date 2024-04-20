const createAST = require("../../src/mdAst");

describe("Markdown to AST Parser - Comprehensive Test Suite", () => {
  describe("Basic Elements", () => {
    test("Empty string produces empty AST", () => {
      const markdown = "";
      const ast = createAST(markdown);
      expect(ast.children.length).toBe(0);
    });

    test("Simple paragraph parsing", () => {
      const markdown = "This is a simple paragraph.";
      const ast = createAST(markdown);
      expect(ast.children.length).toBe(1);
      expect(ast.children[0].type).toBe("paragraph");
      expect(ast.children[0].children[0].value).toBe(markdown);
    });

    test("Multiple paragraphs", () => {
      const markdown = "Paragraph 1\n\nParagraph 2";
      const ast = createAST(markdown);
      expect(ast.children[0].type).toBe("paragraph");
      expect(ast.children[1].type).toBe("paragraph");
      expect(ast.children[0].children[0].value).toBe("Paragraph 1");
      expect(ast.children[1].children[0].value).toBe("Paragraph 2");
    });

    // Additional basic elements tests...
  });

  describe("Combination of Elements", () => {
    test("Heading with bold and italic text", () => {
      const markdown = "# This is a *mixed* **heading**";
      const ast = createAST(markdown);
      expect(ast.children[0].type).toBe("heading");
      expect(ast.children[0].children.length).toBe(3); // Expecting plain text, italic, and bold
      expect(ast.children[0].children[1].type).toBe("italic");
      expect(ast.children[0].children[2].type).toBe("bold");
    });

    test("Paragraph with links, images, and formatted text", () => {
      const markdown =
        "This is a [link](http://example.com), ![image](image.png), **bold**, and *italic*.";
      const ast = createAST(markdown);
      const paragraphChildren = ast.children[0].children;

      expect(paragraphChildren[1].type).toBe("link"); // Expected type mismatch
      expect(paragraphChildren[3].type).toBe("image");
      expect(paragraphChildren[5].type).toBe("bold");
      expect(paragraphChildren[7].type).toBe("italic");
    });

    // Additional combination tests...
  });

  describe("Edge Cases", () => {
    test("Incorrectly formatted list items are parsed as paragraphs", () => {
      const markdown = "-Item 1\n-Item 2";
      const ast = createAST(markdown);
      expect(ast.children.every((child) => child.type === "paragraph")).toBe(
        true,
      );
    });

    test("Links and images without spaces", () => {
      const markdown =
        "This contains a[link](http://example.com)and an![Image](http://example.com/image.png).";
      const ast = createAST(markdown);
      expect(ast.children[0].children[1].type).toBe("link");
      expect(ast.children[0].children[3].type).toBe("image");
    });

    // Additional edge cases tests...
  });

  describe("Complex Documents", () => {
    test("Full document with mixed content", () => {
      const markdown = `
# Heading 1

This is a paragraph with **bold**, *italic*, and [a link](http://example.com).

- List item 1
  - Nested list item
- List item 2

> Blockquote with **bold**

\`\`\`
Code block
\`\`\`

| Table Head | Another Head |
|------------|--------------|
| Table Cell | Another Cell |
`;

      const ast = createAST(markdown);
      // Verify the complex structure of the AST combining different elements.
      // This would involve writing multiple expect() statements to verify each part.
    });

    // Additional tests for complex documents...
  });

  // Any additional specific or detailed tests...
});
