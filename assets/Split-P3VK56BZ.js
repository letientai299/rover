import{j as n,r as o,B as h,g as v}from"./app-wXXRkJhG.js";import{S as s}from"./Split-DD_cSkos.js";function l(i){const{style:e,children:t,...c}=i;return n.jsx("div",{style:{width:"100%",display:"flex",minHeight:"var(--sizes-9)",border:"1px solid var(--colors-bd-clear)",...e},...c,children:t})}function f(){return n.jsx(l,{children:n.jsxs(s,{direction:"vertical",children:[n.jsx("div",{children:"Pane 1"}),n.jsx("div",{children:"Pane 2"}),n.jsx("div",{children:"Pane 3"})]})})}function m(){return n.jsx(l,{children:n.jsxs(s,{direction:"horizontal",children:[n.jsx("div",{children:"Pane 1"}),n.jsx("div",{children:"Pane 2"}),n.jsx("div",{children:"Pane 3"})]})})}function p(){return n.jsx(l,{children:n.jsxs(s,{direction:"vertical",children:[n.jsx("div",{children:"Pane 1"}),n.jsxs(s,{direction:"horizontal",children:[n.jsx("div",{children:"Pane 1"}),n.jsxs(s,{direction:"vertical",children:[n.jsx("div",{children:"Pane 1"}),n.jsx("div",{children:"Pane 2"})]}),n.jsx("div",{children:"Pane 3"})]}),n.jsx("div",{children:"Pane 2"})]})})}function P(){const i=o.useRef(3),[e,t]=o.useState([1,2]),c=()=>t(r=>{const d=[...r,i.current];return i.current++,d}),x=r=>t(d=>d.filter(u=>u!==r)),j=e.map(r=>n.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minWidth:"fit-content"},children:n.jsxs(h,{onClick:()=>x(r),variant:"outline",children:["Remove ",r]})},r));return n.jsxs(l,{style:{display:"flex",flexDirection:"column"},children:[n.jsx("div",{style:{borderBottom:"1px solid var(--colors-bd-clear)"},children:n.jsx(h,{onClick:c,icon:v,variant:"outline",children:"Add new pane"})}),n.jsx(s,{direction:"horizontal",style:{flexGrow:1},children:j})]})}function a(i){const e={h1:"h1",h2:"h2",li:"li",ul:"ul",...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h1,{children:"Split"}),`
`,n.jsx(e.h2,{children:"Vertical"}),`
`,n.jsx(f,{}),`
`,n.jsx(e.h2,{children:"Horizontal"}),`
`,n.jsx(m,{}),`
`,n.jsx(e.h2,{children:"Nested"}),`
`,n.jsx(p,{}),`
`,n.jsx(e.h2,{children:"Add/Remove panes"}),`
`,n.jsx(P,{}),`
`,n.jsx(e.h2,{children:"TODO"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Consider min/initial/max width/height of split child."}),`
`,n.jsx(e.li,{children:"Fallback if there's no children."}),`
`]})]})}function b(i={}){const{wrapper:e}=i.components||{};return e?n.jsx(e,{...i,children:n.jsx(a,{...i})}):a(i)}export{b as default};
