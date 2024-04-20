const astToHTML = require("../../src/astHtml");

describe("astToHTML Function - Comprehensive Test Suite", () => {
  describe("Basic Elements", () => {
    test("Converts text node to HTML", () => {
      const ast = { type: "text", value: "Hello, world!" };
      const html = astToHTML(ast);
      expect(html).toBe("Hello, world!");
    });

    test("Converts paragraph node to HTML", () => {
      const ast = {
        type: "paragraph",
        children: [{ type: "text", value: "Hello, world!" }],
      };
      const html = astToHTML(ast);
      expect(html).toBe("<p>Hello, world!</p>");
    });

    // Add more basic elements tests...
  });

  describe("Complex Structures", () => {
    test("Heading with bold and italic text", () => {
      const ast = {
        type: "heading",
        depth: 2,
        children: [
          { type: "text", value: "This is " },
          {
            type: "bold",
            children: [
              { type: "text", value: "bold " },
              {
                type: "italic",
                children: [{ type: "text", value: "and italic" }],
              },
            ],
          },
          { type: "text", value: " text." },
        ],
      };
      const html = astToHTML(ast);
      expect(html).toBe(
        "<h2>This is <strong>bold <em>and italic</em></strong> text.</h2>",
      );
    });

    test("List with mixed content items", () => {
      const ast = {
        type: "root",
        children: [
          {
            type: "list",
            children: [
              {
                type: "listItem",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      { type: "text", value: "First item with plain text." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "link",
                        url: "http://example.com",
                        children: [
                          { type: "text", value: "Second item with a link" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const html = astToHTML(ast); // Convert AST to HTML
      expect(html).toBe(
        '<ul><li><p>First item with plain text.</p></li><li><p><a href="http://example.com">Second item with a link</a></p></li></ul>',
      ); // Expected HTML output
    });

    // Add more complex structures tests...
  });

  describe("Mixed and Edge Cases", () => {
    test("Blockquote with nested elements", () => {
      const ast = {
        type: "blockquote",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: "Blockquote with " }],
          },
          {
            type: "bold",
            children: [{ type: "text", value: "bold" }],
          },
          {
            type: "text",
            value: " and ",
          },
          {
            type: "italic",
            children: [{ type: "text", value: "italic" }],
          },
          {
            type: "text",
            value: " text.",
          },
        ],
      };
      const html = astToHTML(ast);
      expect(html).toBe(
        "<blockquote><p>Blockquote with </p><strong>bold</strong> and <em>italic</em> text.</blockquote>",
      );
    });

    test("Complex structure with headings, paragraphs, and lists", () => {
      const ast = {
        type: "root",
        children: [
          {
            type: "heading",
            depth: 2,
            children: [{ type: "text", value: "Complex Structure" }],
          },
          {
            type: "paragraph",
            children: [{ type: "text", value: "Introduction paragraph." }],
          },
          {
            type: "list",
            children: [
              {
                type: "listItem",
                children: [
                  {
                    type: "paragraph",
                    children: [{ type: "text", value: "List item 1" }],
                  },
                ],
              },
              {
                type: "listItem",
                children: [
                  {
                    type: "list",
                    children: [
                      {
                        type: "listItem",
                        children: [
                          {
                            type: "paragraph",
                            children: [
                              { type: "text", value: "Nested list item 1" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      const html = astToHTML(ast); // Convert AST to HTML
      expect(html).toBe(
        "<h2>Complex Structure</h2><p>Introduction paragraph.</p><ul><li><p>List item 1</p><ol><li><p>Nested list item 1</p></li></ol></li></ul>", // Expected HTML output
      );
    });

    // Add more mixed and edge cases tests...
  });
});
