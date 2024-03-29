# Separate component levels

For a component:

- what are the matter when it first appeared:

  - Layout
  - Spacing
  - Font size
  - base colors

- when it got interaction
  - how those things change to react with hover, focus, active, keyboard input,
    content change
  - most of the time, layout won't change (unless content grow).

Button component should encapsulate most styling logic, except:

- what happens in `onClick`?

VBar, HBar:

- Keyboard movements.

Tree:

- Should we stop at the hierarchy looks and leave the interaction for higher
  level? There are many things to customize:
  - Hover: part of row or full row?
  - Click outside of row content: select that row, or parent row?
  - Toggle open with single or double click?
  - Keyboard movements.

2 levels:

- Pure looks/ content:
- Layout
- Interactive
