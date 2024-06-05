(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{397:function(e,t,r){Promise.resolve().then(r.bind(r,7810))},7810:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Home}});var n=r(7437),o=r(2265);function addVertexIfNotExist(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(e.vertices.find(e=>e.id===t))return e;e.vertices.push({id:t,label:r})}var s=r(1279);let generateGraph=(e,t)=>{let r={directed:t,vertices:[],edges:[]},n=e.split("\n");var o=0;for(let e of n){let matchVertex=()=>{let t=/^\s*(-?\d+)\s*(?::(.*))?\s*$/,n=e.match(t);if(null!==n){console.log(n);let[,e,t]=n;r.vertices.some(t=>t.id===parseInt(e))?function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e.vertices.find(e=>e.id===t);void 0!==n&&(n.label=r)}(r,parseInt(e),t):addVertexIfNotExist(r,parseInt(e),t)}},matchEdge=()=>{let t=/^\s*(-?\d+)\s+(-?\d+)\s*$/,n=e.match(t);if(null!==n){var s,a,i;let[,e,t]=n;s=o++,a=parseInt(e),i=parseInt(t),addVertexIfNotExist(r,a),addVertexIfNotExist(r,i),r.edges.push({id:s,from:a,to:i})}};matchVertex(),matchEdge()}return r};function TextEditor(){let{graphBundle:e,setGraphBundle:t,inputBoxText:r,setInputBoxText:a}=(0,o.useContext)(x),{graph:i,vertexStates:l,edgeStates:d}=e,[c,u]=(0,o.useState)(!1),setGraph=e=>{t({graph:e,vertexStates:l,edgeStates:d})};(0,o.useEffect)(()=>{setGraph(generateGraph(r,i.directed))},[r]);let onChange=e=>{r!==e.target.value&&(a(e.target.value),setGraph(generateGraph(e.target.value,i.directed)))};return(0,n.jsxs)("div",{className:" flex flex-col",children:[(0,n.jsxs)("div",{onMouseEnter:()=>{u(!0)},onMouseLeave:()=>{u(!1)},children:["Input: ",(0,n.jsx)(s.G,{icon:"question-circle",className:"max-h-6 max-w-6"}),c?(0,n.jsxs)("p",{className:"fixed bg-black color rounded-lg text-white px-2",children:["lone vertex - id ",(0,n.jsx)("br",{}),"labeled vertex - id: label ",(0,n.jsx)("br",{}),"edge - id1 id2 ",(0,n.jsx)("br",{})]}):null]}),(0,n.jsx)("div",{className:"grow ",children:(0,n.jsx)("textarea",{className:"border-2 border-solid resize-none h-full",value:r,onChange:e=>onChange(e)})})]})}let Vector=class Vector{add(e){return Vector.add(this,e)}sub(e){return Vector.sub(this,e)}norm(){return Vector.norm(this)}scale(e){return Vector.scale(this,e)}normalize(){return Vector.normalize(this)}scaleToLength(e){return Vector.scaleToLength(this,e)}static add(e,t){return new Vector(e.x+t.x,e.y+t.y)}static sub(e,t){return new Vector(e.x-t.x,e.y-t.y)}static norm(e){return Math.sqrt(e.x*e.x+e.y*e.y)}static scale(e,t){return new Vector(e.x*t,e.y*t)}static normalize(e){return 1e-9>=e.norm()?new Vector(0,0):Vector.scale(e,1/Vector.norm(e))}static scaleToLength(e,t){return Vector.scale(Vector.normalize(e),t)}constructor(e,t){this.x=e,this.y=t}};var a=r(2397),i=r.n(a);let l=5/6;function placeInBounds(e,t){var{x:r,y:n}=e;return r<40&&(r=40),r>t-40&&(r=t-40),n<40&&(n=40),n>t-40&&(n=t-40),new Vector(r,n)}function VertexView(e){let{v:t}=e,{graphBundle:r,setGraphBundle:s,mouseMode:a,mouseDown:d,windowHeight:c}=(0,o.useContext)(x),{graph:u,vertexStates:m,edgeStates:h}=r,p=c*l,setVertexStates=e=>s({...r,vertexStates:e});if(void 0===m.get(t.id))return(0,n.jsx)(n.Fragment,{});let{x:g,y:f}=m.get(t.id).pos;return(0,n.jsx)(i(),{onDrag:(e,r)=>{setVertexStates(new Map(Array.from(m.entries()).map(e=>{let[n,o]=e;if(n!==t.id)return[n,o];var{x:s,y:a}=r;return{x:s,y:a}=placeInBounds(new Vector(s,a),p),[n,{...m.get(t.id),pos:new Vector(s,a)}]})))},onStart:(e,r)=>{let n=new Map(m);n.set(t.id,{...m.get(t.id),heldAt:Date.now()}),setVertexStates(n)},onStop:(e,r)=>{var n=m.get(t.id).frozen;"freeze"===a.mode&&Date.now()-m.get(t.id).heldAt<100&&10>=new Vector(r.deltaX,r.deltaY).norm()&&(n=!n);let o=new Map(m);o.set(t.id,{...m.get(t.id),heldAt:null,frozen:n}),setVertexStates(o)},position:{x:g,y:f},children:(0,n.jsxs)("g",{onClick:()=>{"paint"===a.mode&&("vertex-border"===a.subject&&setVertexStates(new Map(m).set(t.id,{...m.get(t.id),borderColor:a.color})),"vertex-fill"===a.subject&&setVertexStates(new Map(m).set(t.id,{...m.get(t.id),fillColor:a.color})))},onMouseEnter:()=>{"paint"===a.mode&&"vertex-border"===a.subject&&d&&setVertexStates(new Map(m).set(t.id,{...m.get(t.id),borderColor:a.color})),"paint"===a.mode&&"vertex-fill"===a.subject&&d&&setVertexStates(new Map(m).set(t.id,{...m.get(t.id),fillColor:a.color}))},children:[(0,n.jsx)("circle",{r:20,strokeWidth:m.get(t.id).frozen?"4":"2",stroke:m.get(t.id).borderColor,fill:m.get(t.id).fillColor}),(0,n.jsx)("text",{textAnchor:"middle",alignmentBaseline:"middle",className:"select-none",children:null===t.label?t.id:t.label})]})},t.id)}function EdgeView(e){var t,r;let{e:s}=e,{graphBundle:a,setGraphBundle:i,mouseMode:l,mouseDown:d}=(0,o.useContext)(x),{graph:c,vertexStates:u,edgeStates:m}=a,setEdgeStates=e=>i({...a,edgeStates:e});if(void 0===u.get(s.from)||void 0===u.get(s.to))return(0,n.jsx)(n.Fragment,{});let{x:h,y:p}=u.get(s.from).pos,{x:g,y:f}=u.get(s.to).pos,v=g-h,b=f-p,j=Math.sqrt(v*v+b*b),w=v/j,C=b/j,N=h+20*w,y=p+20*C,S=g-20*w,V=f-20*C;return(0,n.jsxs)("svg",{children:[(0,n.jsx)("defs",{children:(0,n.jsx)("marker",{id:"arrowhead",markerWidth:"5",markerHeight:"6",refX:"5",refY:"3.5",orient:"auto",children:(0,n.jsx)("polygon",{points:"0 0, 5 3, 0 6"})})}),(0,n.jsxs)("g",{onMouseEnter:()=>{"paint"===l.mode&&"edge"===l.subject&&d&&setEdgeStates(new Map(m).set(s.id,{...m.get(s.id),color:l.color}))},onClick:()=>{"paint"===l.mode&&"edge"===l.subject&&setEdgeStates(new Map(m).set(s.id,{...m.get(s.id),color:l.color}))},pointerEvents:"all",children:[(0,n.jsx)("line",{x1:N,y1:y,x2:S,y2:V,stroke:"black",visibility:"hidden",strokeWidth:"13"}),(0,n.jsx)("line",{x1:N,y1:y,x2:S,y2:V,stroke:null!==(r=null===(t=m.get(s.id))||void 0===t?void 0:t.color)&&void 0!==r?r:"black",strokeWidth:"2","marker-end":c.directed?"url(#arrowhead)":""})]})]})}let d={CEN_CHARGE:-700,VTX_CHARGE:400,EDGE_CHARGE:200,MIN_ELEC_DIST:10,K_CONST:.5,SPR_CONST:15,SPR_LEN:100};function GraphViewer(){let{graphBundle:e,setGraphBundle:t,windowHeight:r}=(0,o.useContext)(x),{graph:s,vertexStates:a,edgeStates:i}=e,c=(0,o.useRef)(void 0),u=(0,o.useRef)(0),m=r*l;function randInt(e,t){return Math.floor(Math.random()*(t-e))+e}(0,o.useEffect)(()=>{let step=e=>{if(void 0!==c.current){let r=c.current;t(t=>(function(e,t,r){let{graph:n,vertexStates:o,edgeStates:s}=e,{CEN_CHARGE:a,VTX_CHARGE:i,EDGE_CHARGE:l,MIN_ELEC_DIST:c,K_CONST:u,SPR_CONST:m,SPR_LEN:x}=d,h=x+n.edges.length,p=new Map;for(let e of n.vertices)p.set(e.id,new Vector(0,0));for(let e of(new Vector(t/2,t/2),n.vertices)){if(void 0===o.get(e.id))continue;let t=o.get(e.id).pos,r=o.size;for(let s of n.vertices){if(e.id===s.id||void 0===o.get(s.id))continue;let n=o.get(s.id).pos,a=n.sub(t),l=Math.max(c,a.norm()),d=-u*i*i/(l*l),m=a.scaleToLength(d/r);p.set(e.id,p.get(e.id).add(m))}}for(let e of n.edges){if(void 0===o.get(e.from)||void 0===o.get(e.to)||o.get(e.to)===o.get(e.from))continue;let t=o.get(e.from).pos,r=o.get(e.to).pos,n=r.sub(t),s=n.norm(),a=m*(s-h),i=n.scaleToLength(a/s);p.set(e.from,p.get(e.from).add(i)),p.set(e.to,p.get(e.to).sub(i))}let g=new Map,f=Math.min(r/15,3);for(let e of n.vertices)if(void 0!==o.get(e.id)){if(null!==o.get(e.id).heldAt||o.get(e.id).frozen){g.set(e.id,o.get(e.id));continue}g.set(e.id,{...o.get(e.id),pos:o.get(e.id).pos.add(p.get(e.id).scale(f))})}for(let e of n.vertices){if(void 0===g.get(e.id))continue;let r=g.get(e.id);g.set(e.id,{...r,pos:placeInBounds(r.pos,t)})}return{...e,vertexStates:g}})(t,m,e-r))}c.current=e,u.current=window.requestAnimationFrame(step)};return u.current=window.requestAnimationFrame(step),()=>{window.cancelAnimationFrame(u.current)}},[m]);let h=new Map;var p=!1;for(let e of s.vertices)if(a.has(e.id)&&!Number.isNaN(a.get(e.id).pos.x))h.set(e.id,a.get(e.id));else{let t=randInt(20,m-20),r=randInt(20,m-20);h.set(e.id,{pos:new Vector(t,r),frozen:!1,heldAt:null,borderColor:"black",fillColor:"white"}),p=!0}return p&&t({...e,vertexStates:h}),(0,n.jsx)("div",{className:"min-w-[${dim}] min-h-[${dim}]",children:(0,n.jsxs)("svg",{width:m,height:m,className:"border-solid border-2 graph-view-svg",id:"graph-view-svg",children:[s.edges.map(e=>(0,n.jsx)(EdgeView,{e:e},e.id)),s.vertices.map(e=>(0,n.jsx)(VertexView,{v:e},e.id))]})})}var c=r(9119);function InsertSubgraphPanel(){let[e,t]=(0,o.useState)("complete"),{graphBundle:r,setGraphBundle:s,inputBoxText:a,setInputBoxText:i}=(0,o.useContext)(x),parseIntoList=e=>{if(!e||""===e)return[];let t=e.match(/[^\d-+]*([-+]?\d+)[^\d-+]*/g).map(e=>parseInt(e));return t},handleSubmit=t=>{t.preventDefault();var r=a;switch(""===r||r.endsWith("\n")||(r+="\n"),e){case"complete":{let e=parseIntoList(t.currentTarget.vertices.value);for(let[t,n]of e.entries())for(let[o,s]of e.entries())t<o&&(r+=n+" "+s+"\n")}break;case"complete-bipartite":{let e=parseIntoList(t.currentTarget.vertices1.value),n=parseIntoList(t.currentTarget.vertices2.value);for(let t of e)for(let e of n)r+=t+" "+e+"\n"}break;case"cycle":{let e=parseIntoList(t.currentTarget.vertices.value);for(let[t,n]of e.entries())r+=n+" "+e[(t+1)%e.length]+"\n"}break;case"path":{let e=parseIntoList(t.currentTarget.vertices.value);for(let[t,n]of e.entries())0!==t&&(r+=e[t-1]+" "+n+"\n")}}i(r)};return(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"flex",children:(0,n.jsxs)("div",{className:"m-auto text-center flex",children:["Insert\xa0",(0,n.jsxs)("div",{className:"hover-dropdown m-auto",children:[e,(0,n.jsxs)("div",{className:"hover-dropdown-content",children:[(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>t("complete"),children:"complete"}),(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>t("complete-bipartite"),children:"complete bipartite"}),(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>t("cycle"),children:"cycle"}),(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>t("path"),children:"path"})]})]}),"\xa0subgraph"]})}),(()=>{let t=(()=>{let t="px-1 focus:outline-none focus:border-transparent";switch(e){case"complete":case"cycle":case"path":return(0,n.jsx)("input",{type:"text",name:"vertices",placeholder:"Vertices",className:t});case"complete-bipartite":return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("input",{type:"text",name:"vertices1",placeholder:"Side 1",className:t}),(0,n.jsx)("input",{type:"text",name:"vertices2",placeholder:"Side 2",className:t})]})}})();return(0,n.jsxs)("form",{autoComplete:"off",method:"post",onSubmit:handleSubmit,className:"flex flex-col",children:[t,(0,n.jsx)("button",{type:"submit",value:"Submit",className:"panel-button",children:"Insert"})]})})()]})}function ModifyCommandPanel(){let{graphBundle:e,setGraphBundle:t}=(0,o.useContext)(x),{graph:r,vertexStates:s,edgeStates:a}=e,setDirected=n=>{console.log(n),t({...e,graph:{...r,directed:n}})};return(0,n.jsxs)(CommandPanel,{children:[(0,n.jsx)(InsertSubgraphPanel,{}),(0,n.jsx)("div",{style:{margin:"15px 0"}})," ",(0,n.jsx)("div",{className:"flex flex-row w-full",children:(0,n.jsx)("button",{onClick:()=>setDirected(!r.directed),className:"panel-button grow basis-0",children:"Toggle directed"})})]})}function ArrangeCommandPanel(){let{graphBundle:e,setGraphBundle:t}=(0,o.useContext)(x),{graph:r,vertexStates:s,edgeStates:a}=e,setFreeze=n=>{let o=new Map(s);for(let e of r.vertices)o.set(e.id,{...s.get(e.id),frozen:n});t({...e,vertexStates:o})};return(0,n.jsx)(CommandPanel,{children:(0,n.jsxs)("div",{className:"flex flex-row w-full",children:[(0,n.jsx)("button",{onClick:()=>setFreeze(!0),className:"panel-button grow basis-0",children:"Freeze all"}),(0,n.jsx)("button",{onClick:()=>setFreeze(!1),className:"panel-button grow basis-0",children:"Unfreeze all"})]})})}function LocateCommandPanel(){return(0,n.jsx)(CommandPanel,{children:(0,n.jsx)("p",{children:"Coming soon!"})})}function PaintCommandPanel(){let{mouseMode:e,setMouseMode:t}=(0,o.useContext)(x),[r,s]=(0,o.useState)({r:255,g:0,b:0,a:1}),[a,i]=(0,o.useState)(!1),[l,d]=(0,o.useState)({mode:"paint",subject:"vertex-border",color:"rgba(255, 0, 0, 1)"}),getColor=()=>"rgba(".concat(r.r,", ").concat(r.g,", ").concat(r.b,", ").concat(r.a,")");return(0,n.jsxs)("div",{className:"flex flex-col",children:[(0,n.jsxs)("div",{className:"m-auto text-center flex relative",children:["Paint\xa0",(0,n.jsxs)("div",{className:"hover-dropdown m-auto",children:[l.subject,(0,n.jsxs)("div",{className:"hover-dropdown-content",children:[(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>{d({mode:"paint",subject:"vertex-border",color:"rgba(255, 0, 0, 1)"}),"paint"===e.mode&&t({mode:"paint",subject:"vertex-border",color:getColor()})},children:"vertex border"}),(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>{d({mode:"paint",subject:"vertex-fill",color:"rgba(255, 0, 0, 1)"}),"paint"===e.mode&&t({mode:"paint",subject:"vertex-fill",color:getColor()})},children:"vertex fill"}),(0,n.jsx)("div",{className:"hover-dropdown-item",onClick:()=>{d({mode:"paint",subject:"edge",color:"rgba(255, 0, 0, 1)"}),"paint"===e.mode&&t({mode:"paint",subject:"edge",color:getColor()})},children:"edge"})]})]}),"\xa0with\xa0",(0,n.jsx)("div",{className:"w-4 h-4 rounded-full border-none",onClick:()=>{i(!a),"paint"===e.mode&&t({mode:"paint",subject:e.subject,color:getColor()})},style:{background:getColor()}}),a?(0,n.jsx)(c.AI,{onChange:r=>{s(r.rgb),"paint"===e.mode&&t({mode:"paint",subject:e.subject,color:getColor()})},color:r,className:"absolute top-5"}):null]}),"paint"===e.mode?(0,n.jsx)("button",{onClick:()=>t({mode:"freeze"}),className:"panel-button ",children:"Cancel"}):(0,n.jsx)("button",{onClick:()=>{t({mode:"paint",subject:l.subject,color:getColor()})},className:"panel-button ",children:"Brush mode"})]})}function AnnotateCommandPanel(){return(0,n.jsx)(CommandPanel,{children:(0,n.jsx)(PaintCommandPanel,{})})}function ExportCommandPanel(){return(0,n.jsx)(CommandPanel,{children:(0,n.jsx)("button",{onClick:()=>{let e=document.getElementById("graph-view-svg");if(null===e)return;let t=new XMLSerializer().serializeToString(e),r=new Blob([t],{type:"image/svg+xml;charset=utf-8"}),n=URL.createObjectURL(r),o=document.createElement("a");o.href=n,o.download="graph.svg",document.body.appendChild(o),o.click(),document.body.removeChild(o)},className:"panel-button w-full",children:"Download SVG"})})}function CommandPanel(e){return(0,n.jsx)("div",{className:"border-solid border-2 grow p-2 h-full w-full",children:e.children})}function CommandBar(e){let{setMouseMode:t}=(0,o.useContext)(x);return(0,n.jsx)("div",{className:"flex justify-between",onClick:()=>t({mode:"freeze"}),children:e.children})}function CommandMenu(){let[e,t]=(0,o.useState)({type:"modify"}),r=(()=>{switch(e.type){case"modify":return(0,n.jsx)(ModifyCommandPanel,{});case"arrange":return(0,n.jsx)(ArrangeCommandPanel,{});case"locate":return(0,n.jsx)(LocateCommandPanel,{});case"annotate":return(0,n.jsx)(AnnotateCommandPanel,{});case"export":return(0,n.jsx)(ExportCommandPanel,{})}})(),style=t=>{var r="grow basis-0 ";return e.type===t?r+="bg-gray-200":r+="hover:bg-gray-100 active:bg-gray-200",r};return(0,n.jsxs)("div",{className:"min-w-[400px] max-w-[400px] flex flex-col",children:[(0,n.jsxs)(CommandBar,{children:[(0,n.jsx)("button",{onClick:()=>t({type:"modify"}),className:style("modify"),children:"Modify"}),(0,n.jsx)("button",{onClick:()=>t({type:"arrange"}),className:style("arrange"),children:"Arrange"}),(0,n.jsx)("button",{onClick:()=>t({type:"locate"}),className:style("locate"),children:"Locate"}),(0,n.jsx)("button",{onClick:()=>t({type:"annotate"}),className:style("annotate"),children:"Annotate"}),(0,n.jsx)("button",{onClick:()=>t({type:"export"}),className:style("export"),children:"Export"})]}),(0,n.jsx)("div",{children:r})]})}var u=r(1988),m=r(2759);u.vI.add(m.Fuz);let x=(0,o.createContext)({graphBundle:{graph:{directed:!1,vertices:[],edges:[]},vertexStates:new Map,edgeStates:new Map},setGraphBundle:()=>{},inputBoxText:"",setInputBoxText:()=>{},mouseMode:{mode:"freeze"},setMouseMode:()=>{},mouseDown:!1,setMouseDown:()=>{},windowHeight:0});function GraphVisualizer(){let[e,t]=(0,o.useState)("0 1\n0 2\n0 3\n1 3\n"),[r,s]=(0,o.useState)({graph:generateGraph(e,!1),vertexStates:new Map,edgeStates:new Map}),[a,i]=(0,o.useState)({mode:"freeze"}),[l,d]=(0,o.useState)(!1),[c,u]=(0,o.useState)(800);return(0,o.useLayoutEffect)(()=>{u(window.innerHeight)},[]),(0,o.useEffect)(()=>{let handleResize=()=>{u(window.innerHeight)};return window.addEventListener("resize",handleResize),()=>window.removeEventListener("resize",handleResize)},[]),(0,n.jsx)("main",{children:(0,n.jsx)(x.Provider,{value:{graphBundle:r,setGraphBundle:s,inputBoxText:e,setInputBoxText:t,mouseMode:a,setMouseMode:i,mouseDown:l,setMouseDown:d,windowHeight:c},children:(0,n.jsx)("div",{className:"h-screen m-screen flex",onMouseDown:()=>d(!0),onMouseUp:()=>d(!1),children:(0,n.jsxs)("div",{className:"flex h-5/6 m-auto",children:[(0,n.jsx)(TextEditor,{}),(0,n.jsx)(GraphViewer,{}),(0,n.jsx)(CommandMenu,{})]})})})})}function Home(){return(0,n.jsx)("main",{children:(0,n.jsx)(GraphVisualizer,{})})}}},function(e){e.O(0,[676,425,971,864,744],function(){return e(e.s=397)}),_N_E=e.O()}]);