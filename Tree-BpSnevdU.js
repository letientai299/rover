import{G as x,j as e,T as i,k as p,$ as j,l as m,m as w,n as f,I as g}from"./app-wXXRkJhG.js";const k={"render the basic tree -> done":{"render the indent -> done":{},"render the default prefix icons -> done":{},"render custom icons as prefix -> done":{},"do some CSS magic to visualize indent guide -> nope, too hard for me right now":{}},"support mouse click for open and close -> done":{"with prefix, mouse click can be handled on the icon -> done":{},"how about no prefix -> won't support, don't know how to do this nicely":{}},"support external/remote data":{"check and improve the TreeNode type definition":{"should it be an sync or async function? -> async, let's user handle data loading":{},"handle loading state while waiting for the children loaded? -> done":{}}}};class l{constructor(n,o){this.content=n,this.data=o}static parse(n){return Object.entries(n).map(([o,s])=>new l(o,s))}childNodes(){return new Promise(n=>{const o=l.parse(this.data);o.length>0?setTimeout(()=>n(o),400):n(o)})}}const r=l.parse(k);function y(t){return x({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M1,23 L16,23 L23,16 L23,1 L1,1 L1,23 Z M15,23 L15,15 L23,15"},child:[]}]})(t)}const d=({node:t})=>{const{first:n,second:o,found:s}=p(t.content,"->");return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{children:n}),s&&e.jsxs("span",{style:{color:"var(--colors-neutral-secondary)",fontSize:"0.9em",display:"flow",alignItems:"center",gap:4},children:[e.jsx(y,{style:{translate:"0 20%"}}),o]})]})},c=t=>{const{toggleReveal:n,reveal:o}=t,s=o==="loading",u=j(o).with("loading",()=>m).with("open",()=>w).with("close",()=>f).exhaustive();return e.jsx(g,{icon:u,onClick:n,disabled:s})};function I(){return e.jsxs("section",{children:[e.jsx("h2",{children:"Examples"}),e.jsx("p",{children:"All below tree are rendered from the same data with different config"}),e.jsx(a,{title:"Without default (i.e none) row icons and no custom icons",children:e.jsx(i,{data:r,render:d,rowIcon:"none"})}),e.jsx(a,{title:"With default row icons",children:e.jsx(i,{data:r,render:d,rowIcon:"default"})}),e.jsx(a,{title:"With custom icons",children:e.jsx(i,{data:r,render:d,rowIcon:c})}),e.jsx(a,{title:"With custom icons and open by default",children:e.jsx(i,{data:r,render:d,rowIcon:c,open:!0})})]})}function a(t){const{title:n,children:o}=t;return e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:n}),o,e.jsx("br",{})]})}function h(t){const n={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Tree"}),`
`,e.jsx(n.h2,{children:"Todo"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Comment it"}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Consider implement the ",e.jsx(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/treeview",children:"ARIA Tree View pattern"})]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Kinds of tree we should build to test our own dog foods:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Todo list, with add, check, edit, remove."}),`
`,e.jsx(n.li,{children:"File explorer, with add, delete, move, drag and drop."}),`
`,e.jsx(n.li,{children:"Nested comments page."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:`The interactive of tree Row right now and support for single/multi select is
not well-thought-out yet. I need to work on something else before I can
finalize my thought.`}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{children:"Features"}),`
`,`
`,e.jsx(I,{})]})}function b(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}export{b as default};
