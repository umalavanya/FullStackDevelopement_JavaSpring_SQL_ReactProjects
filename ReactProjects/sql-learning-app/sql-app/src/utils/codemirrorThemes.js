import { EditorView } from '@codemirror/view';

// Custom light theme
export const customLightTheme = EditorView.theme({
  "&": {
    backgroundColor: "#ffffff",
    color: "#1e293b",
  },
  ".cm-content": {
    caretColor: "#2563eb",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "#2563eb",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "#dbeafe",
  },
  ".cm-panels": {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
  ".cm-panels.cm-panels-top": {
    borderBottom: "1px solid #e2e8f0",
  },
  ".cm-panels.cm-panels-bottom": {
    borderTop: "1px solid #e2e8f0",
  },
  ".cm-searchMatch": {
    backgroundColor: "#fef3c7",
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#fbbf24",
  },
  ".cm-activeLine": {
    backgroundColor: "#f1f5f9",
  },
  ".cm-selectionMatch": {
    backgroundColor: "#dbeafe",
  },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#dbeafe",
  },
  ".cm-gutters": {
    backgroundColor: "#f8fafc",
    color: "#64748b",
    borderRight: "1px solid #e2e8f0",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#f1f5f9",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#94a3b8",
  },
  ".cm-tooltip": {
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: "#f1f5f9",
      color: "#1e293b",
    },
  },
}, { dark: false });