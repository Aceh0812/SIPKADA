import{R as e,L as r}from"./app-2f88eaee.js";function c({links:t,align:l}){return e.createElement(e.Fragment,null,e.createElement("nav",null,e.createElement("ul",{className:`pagination justify-content-${l} mb-0`},t.map((a,n)=>e.createElement("li",{className:`page-item ${a.url==null} ? 'disabled' : '' ${a.active?"active":""}`,key:n},e.createElement(r,{className:"page-link",href:a.url===null?"#":a.url,dangerouslySetInnerHTML:{__html:a.label}}))))))}export{c as P};
