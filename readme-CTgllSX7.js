import{j as n}from"./app-wXXRkJhG.js";function l(s){const e={code:"code",h1:"h1",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Separate component levels"}),`
`,n.jsx(e.p,{children:"For a component:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:"what are the matter when it first appeared:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Layout"}),`
`,n.jsx(e.li,{children:"Spacing"}),`
`,n.jsx(e.li,{children:"Font size"}),`
`,n.jsx(e.li,{children:"base colors"}),`
`]}),`
`]}),`
`,n.jsxs(e.li,{children:[`
`,n.jsx(e.p,{children:"when it got interaction"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:`how those things change to react with hover, focus, active, keyboard input,
content change`}),`
`,n.jsx(e.li,{children:"most of the time, layout won't change (unless content grow)."}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:"Button component should encapsulate most styling logic, except:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["what happens in ",n.jsx(e.code,{children:"onClick"}),"?"]}),`
`]}),`
`,n.jsx(e.p,{children:"VBar, HBar:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Keyboard movements."}),`
`]}),`
`,n.jsx(e.p,{children:"Tree:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[`Should we stop at the hierarchy looks and leave the interaction for higher
level? There are many things to customize:`,`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Hover: part of row or full row?"}),`
`,n.jsx(e.li,{children:"Click outside of row content: select that row, or parent row?"}),`
`,n.jsx(e.li,{children:"Toggle open with single or double click?"}),`
`,n.jsx(e.li,{children:"Keyboard movements."}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(e.p,{children:"2 levels:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Pure looks/ content:"}),`
`,n.jsx(e.li,{children:"Layout"}),`
`,n.jsx(e.li,{children:"Interactive"}),`
`]}),`
`,n.jsxs(e.p,{children:["I need so set a boundary between ",n.jsx(e.code,{children:"layout"})," and ",n.jsx(e.code,{children:"interactive"}),"."]}),`
`,n.jsx(e.pre,{children:n.jsxs(e.code,{className:"code-highlight",children:[n.jsx(e.span,{className:"code-line",children:`AppShell {
`}),n.jsx(e.span,{className:"code-line",children:`  Col {
`}),n.jsx(e.span,{className:"code-line",children:`    Row(#address){}
`}),n.jsx(e.span,{className:"code-line",children:`    Row(#toolbar){}
`}),n.jsx(e.span,{className:"code-line",children:`    Row(#toolbar){}
`}),n.jsx(e.span,{className:"code-line",children:`    Split {
`}),n.jsx(e.span,{className:"code-line",children:`      primary_sidebar,
`}),n.jsx(e.span,{className:"code-line",children:`      content,
`}),n.jsx(e.span,{className:"code-line",children:`      secondary_sidebar
`}),n.jsx(e.span,{className:"code-line",children:`    }
`}),n.jsx(e.span,{className:"code-line",children:`    Row(#status_bar){}
`}),n.jsx(e.span,{className:"code-line",children:`  }
`}),n.jsx(e.span,{className:"code-line",children:`}
`})]})})]})}function i(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(l,{...s})}):l(s)}export{i as default};
