# Obsidian Mind Map Plugin - Project Structure

## Overview

A TypeScript-based Obsidian plugin for creating and managing mind maps. Built for brainstorming and ideation with keyboard-first workflows and auto-layout features.

```
obsidian-plugin/
├── src/                     # Source code
│   ├── main.ts             # Plugin entry point
│   ├── commands/           # Command registration
│   │   └── index.ts
│   ├── storage/            # Data persistence
│   │   └── parser.ts       # Markdown serialization/parsing
│   └── mindmap/            # Core mindmap logic
│       ├── view.ts         # Main view component
│       ├── canvas.ts       # Canvas rendering & interactions
│       ├── tree.ts         # Tree data structure
│       ├── tree.test.ts    # Tree unit tests
│       ├── layout.ts       # Auto-layout algorithm
│       ├── models.ts       # TypeScript interfaces
│       └── history.ts      # Undo/redo state
├── manifest.json           # Obsidian plugin metadata
├── package.json            # npm dependencies
├── tsconfig.json           # TypeScript config
├── esbuild.config.mjs      # Build configuration
└── main.js                # Compiled output
```

---

## Core Components

### `src/main.ts`
Plugin lifecycle entry point. Registers the mindmap view, commands, and ribbon icon with Obsidian's Plugin API.

**Key exports:**
- `MindMapPlugin` — Main plugin class extending `Plugin`

---

### `src/mindmap/` — Core Mindmap Engine

#### `view.ts` (View Controller)
Primary Obsidian view component. Manages the mindmap lifecycle, UI toolbar, and coordinates between canvas, data model, and storage.

**Responsibilities:**
- View registration and initialization
- Toolbar button handlers (zoom, add/delete nodes, auto-layout, save)
- Keyboard shortcuts and hotkeys
- Selection state and multi-node operations
- Autosave coordination
- File I/O (load/save markdown)

**Key classes:**
- `MindMapView` — Extends `ItemView`, main view container

---

#### `canvas.ts` (Rendering & Interaction)
SVG-based canvas rendering and mouse/keyboard interaction handling. Pure rendering layer with no business logic.

**Responsibilities:**
- SVG node/edge rendering with visual styles
- Pan and zoom transforms
- Box selection, drag-to-select
- Mouse events (click, drag, context menu)
- Hit testing for node interactions

**Key functions:**
- `render()` — Draws nodes and edges from state
- `createSVG()` — SVG element creation helpers
- `createEdgePath()` — Bezier curve path generation

---

#### `tree.ts` + `tree.test.ts` (Data Structure)
Hierarchical tree model with parent-child relationships. All mutation operations go through this layer.

**Key functions:**
- `createNode(content, parent?)` — Create new node
- `addChildNode(parent, content)` — Append child
- `addSiblingNode(ref, content)` — Add next to existing
- `deleteNode(id)` — Remove subtree
- `moveNode(id, newParent, position)` — Reorder/reattach
- `setNodeContent(id, content)` — Update text

**Tests:** Unit tests in `tree.test.ts` verify tree mutations.

---

#### `layout.ts` (Auto-Layout)
Computes node positions for organized tree layouts. Uses horizontal tree algorithm with depth-based spacing.

**Key functions:**
- `layoutTree(root, options)` — Main entry, returns positioned nodes
- Returns `{ x, y }` coordinates for each node ID

---

#### `models.ts` (TypeScript Types)
Interface definitions for mindmap data structures.

**Key types:**
- `MindMapNode` — Node structure (id, content, children, position, note, linkedFilePath)
- `MindMapData` — Full mindmap state (root, connections, view state)
- `MindMapViewState` — Zoom/pan state
- `MindMapConnection` — Cross-branch edge references

---

#### `history.ts` (Undo/Redo)
Command pattern for reversible operations. Stores past states and supports undo/redo navigation.

**Key class:**
- `CommandHistory` — Manages undo stack and redo stack

---

### `src/storage/parser.ts` — Data Persistence

Handles serialization between mindmap data and Obsidian markdown files. Stores mindmap as YAML frontmatter within markdown.

**Key functions:**
- `createEmptyMindMap()` — New mindmap with default root
- `serializeMindMap(data)` — Convert to markdown YAML + body
- `parseMindMap(markdown)` — Parse YAML frontmatter into data model
- `normalizeMindMap(data)` — Validate and migrate older formats

**Storage format:**
```markdown
---
mindmap:
  version: "2.0"
  root:
    id: "xxx"
    content: "Central Topic"
    children: [...]
---

<!-- mindmap:content:start -->
<!-- mindmap:content:end -->
```

---

### `src/commands/` — Command Registration

Registers Obsidian commands (global shortcuts, palette commands) with the app.

**Key functions:**
- `registerCommands(app, plugin)` — Register all commands

---

## Build Configuration

### `esbuild.config.mjs`
Bundles TypeScript to `main.js` for Obsidian. Used by `npm run dev` and `npm run build`.

### `tsconfig.json`
TypeScript compiler configuration. Targets ES6 with strict null checks enabled.

---

## Development Workflow

1. **Build:** `npm run build` — Compiles TypeScript to `main.js`
2. **Install:** Copy `main.js`, `manifest.json` to `.obsidian/plugins/obsidian-mindmap/`
3. **Reload:** Obsidian hot-reloads the plugin
4. **Test:** `npm test` — Runs tree.test.ts with Node.js built-in test runner

---

## Data Flow

```
User Action (click/key)
    → view.ts handler
    → tree.ts mutation
    → history.ts record
    → layout.ts recompute positions
    → canvas.ts render
    → parser.ts serialize (on save)
    → markdown file in vault
```

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `obsidian` | Obsidian API types |
| `esbuild` | Fast bundler |
| `typescript` | Type checking and compilation |
| `tslib` | TypeScript runtime helpers |

---

## File Key Summary

| File | Purpose |
|------|---------|
| `main.ts` | Plugin entry, view registration |
| `mindmap/view.ts` | Main view controller, toolbar, selection |
| `mindmap/canvas.ts` | SVG rendering, mouse handling |
| `mindmap/tree.ts` | Hierarchical data model |
| `mindmap/layout.ts` | Auto-layout algorithm |
| `mindmap/history.ts` | Undo/redo state |
| `mindmap/models.ts` | TypeScript interfaces |
| `storage/parser.ts` | Markdown YAML persistence |
| `commands/index.ts` | Command registration |
