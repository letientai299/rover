import{j as e}from"./app-wXXRkJhG.js";function s(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"Atoms"}),`
`,e.jsx(n.p,{children:"Atom is the foundation, primitive kind of element."}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"https://atomicdesign.bradfrost.com/chapter-2/#atoms",children:"Atomic design"})]}),`
`,e.jsx(n.h2,{children:"Icon"}),`
`,e.jsxs(n.p,{children:["It's actually just a type that allow using the ",e.jsx(n.code,{children:"IconType"})," from ",e.jsx(n.code,{children:"react-icons"}),` in
our base components without actually depends on that packages. In case we
migrate to another icon sets later, or move the base components into a library,
we don't want to install `,e.jsx(n.code,{children:"react-icons"})," just for its type."]}),`
`,e.jsx(n.h2,{children:"Progress"}),`
`,e.jsxs(n.p,{children:["See ",e.jsx(n.a,{href:"#/components/atoms/Progress/Progress.mdx",children:"Progress"})]})]})}function r(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{r as default};
