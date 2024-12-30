import { Mark } from "@tiptap/core";

const Highlight = Mark.create({
  name: "highlight",

  // Define addOptions to configure colors
  addOptions() {
    return {
      HTMLAttributes: {
        style: "background-color: yellow;",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["mark", this.options.HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setHighlight:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
      toggleHighlight:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export default Highlight;
