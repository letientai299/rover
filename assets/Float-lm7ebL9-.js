import{j as e,r as i,f as c}from"./app-wXXRkJhG.js";import{F as l}from"./Float-BvH9ZVtZ.js";function d(n){const{style:t,children:a,...r}=n;return e.jsx("div",{style:{width:"100%",display:"flex",minHeight:"var(--sizes-8)",...t},...r,children:a})}function s({place:n}){const t=i.useId();return e.jsxs(d,{style:{alignItems:"center",justifyContent:"center",minHeight:"var(--sizes-9)",margin:"var(--margin-sm)"},children:[e.jsx("div",{id:t,children:e.jsx("code",{children:n})}),e.jsxs(l,{place:n,anchor:t,style:{padding:4,display:"flex",flexDirection:"column"},children:[e.jsx(c,{size:60,strokeWidth:1}),"I'm a long string at the ",e.jsx("code",{children:n})]})]})}function o(n){const t={code:"code",h1:"h1",p:"p",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h1,{children:"Float"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"Float"}),` is the container for things that can appear temporary on the page,
doesn't belong to any other container.`]}),`
`,e.jsxs(t.p,{children:["It's not called ",e.jsx(t.code,{children:"Modal"}),` because it's not supposed to steal all user attention
and darken the page behind it.`]}),`
`,`
`,e.jsx(s,{place:"left-start"}),`
`,e.jsx(s,{place:"left"}),`
`,e.jsx(s,{place:"left-end"}),`
`,e.jsx(s,{place:"right-start"}),`
`,e.jsx(s,{place:"right"}),`
`,e.jsx(s,{place:"right-end"}),`
`,e.jsx(s,{place:"top"}),`
`,e.jsx(s,{place:"top-start"}),`
`,e.jsx(s,{place:"top-end"}),`
`,e.jsx(s,{place:"bottom"}),`
`,e.jsx(s,{place:"bottom-start"}),`
`,e.jsx(s,{place:"bottom-end"})]})}function p(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{d as Box,s as FloatDemo,p as default};
