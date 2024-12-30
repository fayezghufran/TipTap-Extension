import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "./Highlight";
import TextAlign from "./TextAlign";
import FontSize from "./FontSize";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineHighlight,
  AiOutlineLink,
  AiFillFormatPainter,
} from "react-icons/ai";
import { BiFontSize } from "react-icons/bi";
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined } from "react-icons/md";
import { ChromePicker } from "react-color";
import "./Editor.css";

const Editor = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TextStyle,
      FontSize,
      TextAlign.configure({ alignments: ["left", "center", "right"] }),
      Link.configure({ openOnClick: true }),
      Color,
    ],
    content: "<p>Edit me with custom styles and alignment!</p>",
  });

  const setLink = () => {
    const url = window.prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 text-xl font-bold text-gray-800">Enhanced Tiptap Editor</div>

      {/* Icon Toolbar */}
      <div className="mb-6 flex gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-md">
        {/* Bold */}
        <MdFormatBold
          className="text-2xl text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        />

        {/* Italic */}
        <MdFormatItalic
          className="text-2xl text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        />

        {/* Underline */}
        <MdFormatUnderlined
          className="text-2xl text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        />

        {/* Highlight */}
        <AiOutlineHighlight
          className="text-2xl text-yellow-500 cursor-pointer hover:text-yellow-700"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          title="Highlight"
        />

        {/* Text Alignment */}
        <AiOutlineAlignLeft
          className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="Align Left"
        />
        <AiOutlineAlignCenter
          className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="Align Center"
        />
        <AiOutlineAlignRight
          className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          title="Align Right"
        />

        {/* Font Size */}
        <div className="flex items-center space-x-2">
          {[12, 16, 20, 24].map((size) => (
            <BiFontSize
              key={size}
              className="text-2xl text-green-500 cursor-pointer hover:text-green-700"
              onClick={() => editor.chain().focus().setFontSize(size).run()}
              title={`Font Size ${size}px`}
            />
          ))}
        </div>

        {/* Link */}
        <AiOutlineLink
          className="text-2xl text-purple-500 cursor-pointer hover:text-purple-700"
          onClick={setLink}
          title="Add Link"
        />

        {/* Color Picker */}
        <div className="relative">
          <AiFillFormatPainter
            className="text-2xl text-pink-500 cursor-pointer hover:text-pink-700"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Text Color"
          />
          {showColorPicker && (
            <div className="absolute z-10">
              <ChromePicker
                color={color}
                onChangeComplete={(color) => {
                  setColor(color.hex);
                  editor.chain().focus().setColor(color.hex).run();
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="border rounded-lg shadow-lg p-6 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
