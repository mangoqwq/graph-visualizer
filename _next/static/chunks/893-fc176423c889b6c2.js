(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[893],{348:function(t,e,r){"use strict";function n(){for(var t,e,r=0,n="";r<arguments.length;)(t=arguments[r++])&&(e=function t(e){var r,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e){if(Array.isArray(e))for(r=0;r<e.length;r++)e[r]&&(n=t(e[r]))&&(o&&(o+=" "),o+=n);else for(r in e)e[r]&&(o&&(o+=" "),o+=r)}return o}(t))&&(n&&(n+=" "),n+=e);return n}r.r(e),r.d(e,{clsx:function(){return n}}),e.default=n},622:function(t,e,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),o=Symbol.for("react.element"),a=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function s(t,e,r){var n,a={},s=null,c=null;for(n in void 0!==r&&(s=""+r),void 0!==e.key&&(s=""+e.key),void 0!==e.ref&&(c=e.ref),e)i.call(e,n)&&!l.hasOwnProperty(n)&&(a[n]=e[n]);if(t&&t.defaultProps)for(n in e=t.defaultProps)void 0===a[n]&&(a[n]=e[n]);return{$$typeof:o,type:t,key:s,ref:c,props:a,_owner:u.current}}e.Fragment=a,e.jsx=s,e.jsxs=s},7437:function(t,e,r){"use strict";t.exports=r(622)},3018:function(t,e,r){"use strict";var n=r(1289);function o(){}function a(){}a.resetWarningCache=o,t.exports=function(){function t(t,e,r,o,a,i){if(i!==n){var u=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function e(){return t}t.isRequired=t;var r={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},4275:function(t,e,r){t.exports=r(3018)()},1289:function(t){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},2436:function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"DraggableCore",{enumerable:!0,get:function(){return f.default}}),e.default=void 0;var o=function(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!==n(t)&&"function"!=typeof t)return{default:t};var r=g(e);if(r&&r.has(t))return r.get(t);var o={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in t)if("default"!==i&&Object.prototype.hasOwnProperty.call(t,i)){var u=a?Object.getOwnPropertyDescriptor(t,i):null;u&&(u.get||u.set)?Object.defineProperty(o,i,u):o[i]=t[i]}return o.default=t,r&&r.set(t,o),o}(r(2265)),a=y(r(4275)),i=y(r(4887)),u=y(r(348)),l=r(7251),s=r(3742),c=r(9177),f=y(r(4664)),d=y(r(7685)),p=["axis","bounds","children","defaultPosition","defaultClassName","defaultClassNameDragging","defaultClassNameDragged","position","positionOffset","scale"];function y(t){return t&&t.__esModule?t:{default:t}}function g(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,r=new WeakMap;return(g=function(t){return t?r:e})(t)}function h(){return(h=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach(function(e){P(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function O(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function S(t,e){return(S=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function D(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function P(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(y,t);var e,r,a,c=(e=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}(),function(){var t,r=w(y);if(e){var o=w(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return function(t,e){if(e&&("object"===n(e)||"function"==typeof e))return e;if(void 0!==e)throw TypeError("Derived constructors may only return object or undefined");return D(t)}(this,t)});function y(t){var e;return!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,y),P(D(e=c.call(this,t)),"onDragStart",function(t,r){if((0,d.default)("Draggable: onDragStart: %j",r),!1===e.props.onStart(t,(0,s.createDraggableData)(D(e),r)))return!1;e.setState({dragging:!0,dragged:!0})}),P(D(e),"onDrag",function(t,r){if(!e.state.dragging)return!1;(0,d.default)("Draggable: onDrag: %j",r);var n=(0,s.createDraggableData)(D(e),r),o={x:n.x,y:n.y};if(e.props.bounds){var a=o.x,i=o.y;o.x+=e.state.slackX,o.y+=e.state.slackY;var u=(0,s.getBoundPosition)(D(e),o.x,o.y),l=function(t){if(Array.isArray(t))return t}(u)||function(t,e){var r,n,o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var a=[],i=!0,u=!1;try{for(o=o.call(t);!(i=(r=o.next()).done)&&(a.push(r.value),!e||a.length!==e);i=!0);}catch(t){u=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(u)throw n}}return a}}(u,2)||function(t,e){if(t){if("string"==typeof t)return v(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if("Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(t,e)}}(u,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),c=l[0],f=l[1];o.x=c,o.y=f,o.slackX=e.state.slackX+(a-o.x),o.slackY=e.state.slackY+(i-o.y),n.x=o.x,n.y=o.y,n.deltaX=o.x-e.state.x,n.deltaY=o.y-e.state.y}if(!1===e.props.onDrag(t,n))return!1;e.setState(o)}),P(D(e),"onDragStop",function(t,r){if(!e.state.dragging||!1===e.props.onStop(t,(0,s.createDraggableData)(D(e),r)))return!1;(0,d.default)("Draggable: onDragStop: %j",r);var n={dragging:!1,slackX:0,slackY:0};if(e.props.position){var o=e.props.position,a=o.x,i=o.y;n.x=a,n.y=i}e.setState(n)}),e.state={dragging:!1,dragged:!1,x:t.position?t.position.x:t.defaultPosition.x,y:t.position?t.position.y:t.defaultPosition.y,prevPropsPosition:m({},t.position),slackX:0,slackY:0,isElementSVG:!1},t.position&&!(t.onDrag||t.onStop)&&console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."),e}return r=[{key:"componentDidMount",value:function(){void 0!==window.SVGElement&&this.findDOMNode() instanceof window.SVGElement&&this.setState({isElementSVG:!0})}},{key:"componentWillUnmount",value:function(){this.setState({dragging:!1})}},{key:"findDOMNode",value:function(){var t,e,r;return null!==(t=null===(e=this.props)||void 0===e?void 0:null===(r=e.nodeRef)||void 0===r?void 0:r.current)&&void 0!==t?t:i.default.findDOMNode(this)}},{key:"render",value:function(){var t,e=this.props,r=(e.axis,e.bounds,e.children),n=e.defaultPosition,a=e.defaultClassName,i=e.defaultClassNameDragging,c=e.defaultClassNameDragged,d=e.position,y=e.positionOffset,g=(e.scale,function(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}(e,p)),b={},v=null,O=!d||this.state.dragging,S=d||n,D={x:(0,s.canDragX)(this)&&O?this.state.x:S.x,y:(0,s.canDragY)(this)&&O?this.state.y:S.y};this.state.isElementSVG?v=(0,l.createSVGTransform)(D,y):b=(0,l.createCSSTransform)(D,y);var w=(0,u.default)(r.props.className||"",a,(P(t={},i,this.state.dragging),P(t,c,this.state.dragged),t));return o.createElement(f.default,h({},g,{onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop}),o.cloneElement(o.Children.only(r),{className:w,style:m(m({},r.props.style),b),transform:v}))}}],a=[{key:"getDerivedStateFromProps",value:function(t,e){var r=t.position,n=e.prevPropsPosition;return r&&(!n||r.x!==n.x||r.y!==n.y)?((0,d.default)("Draggable: getDerivedStateFromProps %j",{position:r,prevPropsPosition:n}),{x:r.x,y:r.y,prevPropsPosition:m({},r)}):null}}],r&&O(y.prototype,r),a&&O(y,a),Object.defineProperty(y,"prototype",{writable:!1}),y}(o.Component);e.default=j,P(j,"displayName","Draggable"),P(j,"propTypes",m(m({},f.default.propTypes),{},{axis:a.default.oneOf(["both","x","y","none"]),bounds:a.default.oneOfType([a.default.shape({left:a.default.number,right:a.default.number,top:a.default.number,bottom:a.default.number}),a.default.string,a.default.oneOf([!1])]),defaultClassName:a.default.string,defaultClassNameDragging:a.default.string,defaultClassNameDragged:a.default.string,defaultPosition:a.default.shape({x:a.default.number,y:a.default.number}),positionOffset:a.default.shape({x:a.default.oneOfType([a.default.number,a.default.string]),y:a.default.oneOfType([a.default.number,a.default.string])}),position:a.default.shape({x:a.default.number,y:a.default.number}),className:c.dontSetMe,style:c.dontSetMe,transform:c.dontSetMe})),P(j,"defaultProps",m(m({},f.default.defaultProps),{},{axis:"both",bounds:!1,defaultClassName:"react-draggable",defaultClassNameDragging:"react-draggable-dragging",defaultClassNameDragged:"react-draggable-dragged",defaultPosition:{x:0,y:0},scale:1}))},4664:function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!==n(t)&&"function"!=typeof t)return{default:t};var r=d(e);if(r&&r.has(t))return r.get(t);var o={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in t)if("default"!==i&&Object.prototype.hasOwnProperty.call(t,i)){var u=a?Object.getOwnPropertyDescriptor(t,i):null;u&&(u.get||u.set)?Object.defineProperty(o,i,u):o[i]=t[i]}return o.default=t,r&&r.set(t,o),o}(r(2265)),a=f(r(4275)),i=f(r(4887)),u=r(7251),l=r(3742),s=r(9177),c=f(r(7685));function f(t){return t&&t.__esModule?t:{default:t}}function d(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,r=new WeakMap;return(d=function(t){return t?r:e})(t)}function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r,n,o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var a=[],i=!0,u=!1;try{for(o=o.call(t);!(i=(r=o.next()).done)&&(a.push(r.value),!e||a.length!==e);i=!0);}catch(t){u=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(u)throw n}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return y(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if("Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(t,e)}}(t,e)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function g(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var O={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},S=O.mouse,D=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(f,t);var e,r,a,s=(e=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}(),function(){var t,r=m(f);if(e){var o=m(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return function(t,e){if(e&&("object"===n(e)||"function"==typeof e))return e;if(void 0!==e)throw TypeError("Derived constructors may only return object or undefined");return b(t)}(this,t)});function f(){var t;!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,f);for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return v(b(t=s.call.apply(s,[this].concat(r))),"state",{dragging:!1,lastX:NaN,lastY:NaN,touchIdentifier:null}),v(b(t),"mounted",!1),v(b(t),"handleDragStart",function(e){if(t.props.onMouseDown(e),!t.props.allowAnyClick&&"number"==typeof e.button&&0!==e.button)return!1;var r=t.findDOMNode();if(!r||!r.ownerDocument||!r.ownerDocument.body)throw Error("<DraggableCore> not mounted on DragStart!");var n=r.ownerDocument;if(!(t.props.disabled||!(e.target instanceof n.defaultView.Node)||t.props.handle&&!(0,u.matchesSelectorAndParentsTo)(e.target,t.props.handle,r)||t.props.cancel&&(0,u.matchesSelectorAndParentsTo)(e.target,t.props.cancel,r))){"touchstart"===e.type&&e.preventDefault();var o=(0,u.getTouchIdentifier)(e);t.setState({touchIdentifier:o});var a=(0,l.getControlPosition)(e,o,b(t));if(null!=a){var i=a.x,s=a.y,f=(0,l.createCoreData)(b(t),i,s);(0,c.default)("DraggableCore: handleDragStart: %j",f),(0,c.default)("calling",t.props.onStart),!1!==t.props.onStart(e,f)&&!1!==t.mounted&&(t.props.enableUserSelectHack&&(0,u.addUserSelectStyles)(n),t.setState({dragging:!0,lastX:i,lastY:s}),(0,u.addEvent)(n,S.move,t.handleDrag),(0,u.addEvent)(n,S.stop,t.handleDragStop))}}}),v(b(t),"handleDrag",function(e){var r=(0,l.getControlPosition)(e,t.state.touchIdentifier,b(t));if(null!=r){var n=r.x,o=r.y;if(Array.isArray(t.props.grid)){var a=n-t.state.lastX,i=o-t.state.lastY,u=p((0,l.snapToGrid)(t.props.grid,a,i),2);if(a=u[0],i=u[1],!a&&!i)return;n=t.state.lastX+a,o=t.state.lastY+i}var s=(0,l.createCoreData)(b(t),n,o);if((0,c.default)("DraggableCore: handleDrag: %j",s),!1===t.props.onDrag(e,s)||!1===t.mounted){try{t.handleDragStop(new MouseEvent("mouseup"))}catch(e){var f=document.createEvent("MouseEvents");f.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),t.handleDragStop(f)}return}t.setState({lastX:n,lastY:o})}}),v(b(t),"handleDragStop",function(e){if(t.state.dragging){var r=(0,l.getControlPosition)(e,t.state.touchIdentifier,b(t));if(null!=r){var n=r.x,o=r.y;if(Array.isArray(t.props.grid)){var a=n-t.state.lastX||0,i=o-t.state.lastY||0,s=p((0,l.snapToGrid)(t.props.grid,a,i),2);a=s[0],i=s[1],n=t.state.lastX+a,o=t.state.lastY+i}var f=(0,l.createCoreData)(b(t),n,o);if(!1===t.props.onStop(e,f)||!1===t.mounted)return!1;var d=t.findDOMNode();d&&t.props.enableUserSelectHack&&(0,u.removeUserSelectStyles)(d.ownerDocument),(0,c.default)("DraggableCore: handleDragStop: %j",f),t.setState({dragging:!1,lastX:NaN,lastY:NaN}),d&&((0,c.default)("DraggableCore: Removing handlers"),(0,u.removeEvent)(d.ownerDocument,S.move,t.handleDrag),(0,u.removeEvent)(d.ownerDocument,S.stop,t.handleDragStop))}}}),v(b(t),"onMouseDown",function(e){return S=O.mouse,t.handleDragStart(e)}),v(b(t),"onMouseUp",function(e){return S=O.mouse,t.handleDragStop(e)}),v(b(t),"onTouchStart",function(e){return S=O.touch,t.handleDragStart(e)}),v(b(t),"onTouchEnd",function(e){return S=O.touch,t.handleDragStop(e)}),t}return r=[{key:"componentDidMount",value:function(){this.mounted=!0;var t=this.findDOMNode();t&&(0,u.addEvent)(t,O.touch.start,this.onTouchStart,{passive:!1})}},{key:"componentWillUnmount",value:function(){this.mounted=!1;var t=this.findDOMNode();if(t){var e=t.ownerDocument;(0,u.removeEvent)(e,O.mouse.move,this.handleDrag),(0,u.removeEvent)(e,O.touch.move,this.handleDrag),(0,u.removeEvent)(e,O.mouse.stop,this.handleDragStop),(0,u.removeEvent)(e,O.touch.stop,this.handleDragStop),(0,u.removeEvent)(t,O.touch.start,this.onTouchStart,{passive:!1}),this.props.enableUserSelectHack&&(0,u.removeUserSelectStyles)(e)}}},{key:"findDOMNode",value:function(){var t,e,r;return null!==(t=this.props)&&void 0!==t&&t.nodeRef?null===(e=this.props)||void 0===e?void 0:null===(r=e.nodeRef)||void 0===r?void 0:r.current:i.default.findDOMNode(this)}},{key:"render",value:function(){return o.cloneElement(o.Children.only(this.props.children),{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}],g(f.prototype,r),a&&g(f,a),Object.defineProperty(f,"prototype",{writable:!1}),f}(o.Component);e.default=D,v(D,"displayName","DraggableCore"),v(D,"propTypes",{allowAnyClick:a.default.bool,disabled:a.default.bool,enableUserSelectHack:a.default.bool,offsetParent:function(t,e){if(t[e]&&1!==t[e].nodeType)throw Error("Draggable's offsetParent must be a DOM Node.")},grid:a.default.arrayOf(a.default.number),handle:a.default.string,cancel:a.default.string,nodeRef:a.default.object,onStart:a.default.func,onDrag:a.default.func,onStop:a.default.func,onMouseDown:a.default.func,scale:a.default.number,className:s.dontSetMe,style:s.dontSetMe,transform:s.dontSetMe}),v(D,"defaultProps",{allowAnyClick:!1,disabled:!1,enableUserSelectHack:!0,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){},scale:1})},2397:function(t,e,r){"use strict";var n=r(2436),o=n.default,a=n.DraggableCore;t.exports=o,t.exports.default=o,t.exports.DraggableCore=a},7251:function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.addClassName=p,e.addEvent=function(t,e,r,n){if(t){var o=l({capture:!0},n);t.addEventListener?t.addEventListener(e,r,o):t.attachEvent?t.attachEvent("on"+e,r):t["on"+e]=r}},e.addUserSelectStyles=function(t){if(t){var e=t.getElementById("react-draggable-style-el");e||((e=t.createElement("style")).type="text/css",e.id="react-draggable-style-el",e.innerHTML=".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n",e.innerHTML+=".react-draggable-transparent-selection *::selection {all: inherit;}\n",t.getElementsByTagName("head")[0].appendChild(e)),t.body&&p(t.body,"react-draggable-transparent-selection")}},e.createCSSTransform=function(t,e){var r=d(t,e,"px");return s({},(0,a.browserPrefixToKey)("transform",a.default),r)},e.createSVGTransform=function(t,e){return d(t,e,"")},e.getTouch=function(t,e){return t.targetTouches&&(0,o.findInArray)(t.targetTouches,function(t){return e===t.identifier})||t.changedTouches&&(0,o.findInArray)(t.changedTouches,function(t){return e===t.identifier})},e.getTouchIdentifier=function(t){return t.targetTouches&&t.targetTouches[0]?t.targetTouches[0].identifier:t.changedTouches&&t.changedTouches[0]?t.changedTouches[0].identifier:void 0},e.getTranslation=d,e.innerHeight=function(t){var e=t.clientHeight,r=t.ownerDocument.defaultView.getComputedStyle(t);return e-=(0,o.int)(r.paddingTop),e-=(0,o.int)(r.paddingBottom)},e.innerWidth=function(t){var e=t.clientWidth,r=t.ownerDocument.defaultView.getComputedStyle(t);return e-=(0,o.int)(r.paddingLeft),e-=(0,o.int)(r.paddingRight)},e.matchesSelector=f,e.matchesSelectorAndParentsTo=function(t,e,r){var n=t;do{if(f(n,e))return!0;if(n===r)break;n=n.parentNode}while(n);return!1},e.offsetXYFromParent=function(t,e,r){var n=e===e.ownerDocument.body?{left:0,top:0}:e.getBoundingClientRect();return{x:(t.clientX+e.scrollLeft-n.left)/r,y:(t.clientY+e.scrollTop-n.top)/r}},e.outerHeight=function(t){var e=t.clientHeight,r=t.ownerDocument.defaultView.getComputedStyle(t);return e+((0,o.int)(r.borderTopWidth)+(0,o.int)(r.borderBottomWidth))},e.outerWidth=function(t){var e=t.clientWidth,r=t.ownerDocument.defaultView.getComputedStyle(t);return e+((0,o.int)(r.borderLeftWidth)+(0,o.int)(r.borderRightWidth))},e.removeClassName=y,e.removeEvent=function(t,e,r,n){if(t){var o=l({capture:!0},n);t.removeEventListener?t.removeEventListener(e,r,o):t.detachEvent?t.detachEvent("on"+e,r):t["on"+e]=null}},e.removeUserSelectStyles=function(t){if(t)try{if(t.body&&y(t.body,"react-draggable-transparent-selection"),t.selection)t.selection.empty();else{var e=(t.defaultView||window).getSelection();e&&"Caret"!==e.type&&e.removeAllRanges()}}catch(t){}};var o=r(9177),a=function(t,e){if(!e&&t&&t.__esModule)return t;if(null===t||"object"!==n(t)&&"function"!=typeof t)return{default:t};var r=i(e);if(r&&r.has(t))return r.get(t);var o={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in t)if("default"!==u&&Object.prototype.hasOwnProperty.call(t,u)){var l=a?Object.getOwnPropertyDescriptor(t,u):null;l&&(l.get||l.set)?Object.defineProperty(o,u,l):o[u]=t[u]}return o.default=t,r&&r.set(t,o),o}(r(3543));function i(t){if("function"!=typeof WeakMap)return null;var e=new WeakMap,r=new WeakMap;return(i=function(t){return t?r:e})(t)}function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach(function(e){s(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function s(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var c="";function f(t,e){return c||(c=(0,o.findInArray)(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],function(e){return(0,o.isFunction)(t[e])})),!!(0,o.isFunction)(t[c])&&t[c](e)}function d(t,e,r){var n=t.x,o=t.y,a="translate(".concat(n).concat(r,",").concat(o).concat(r,")");if(e){var i="".concat("string"==typeof e.x?e.x:e.x+r),u="".concat("string"==typeof e.y?e.y:e.y+r);a="translate(".concat(i,", ").concat(u,")")+a}return a}function p(t,e){t.classList?t.classList.add(e):t.className.match(new RegExp("(?:^|\\s)".concat(e,"(?!\\S)")))||(t.className+=" ".concat(e))}function y(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(RegExp("(?:^|\\s)".concat(e,"(?!\\S)"),"g"),"")}},3543:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.browserPrefixToKey=o,e.browserPrefixToStyle=function(t,e){return e?"-".concat(e.toLowerCase(),"-").concat(t):t},e.default=void 0,e.getPrefix=n;var r=["Moz","Webkit","O","ms"];function n(){var t,e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transform";if("undefined"==typeof window)return"";var a=null===(t=window.document)||void 0===t?void 0:null===(e=t.documentElement)||void 0===e?void 0:e.style;if(!a||n in a)return"";for(var i=0;i<r.length;i++)if(o(n,r[i]) in a)return r[i];return""}function o(t,e){return e?"".concat(e).concat(function(t){for(var e="",r=!0,n=0;n<t.length;n++)r?(e+=t[n].toUpperCase(),r=!1):"-"===t[n]?r=!0:e+=t[n];return e}(t)):t}var a=n();e.default=a},7685:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){}},3742:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.canDragX=function(t){return"both"===t.props.axis||"x"===t.props.axis},e.canDragY=function(t){return"both"===t.props.axis||"y"===t.props.axis},e.createCoreData=function(t,e,r){var o=t.state,i=!(0,n.isNum)(o.lastX),u=a(t);return i?{node:u,deltaX:0,deltaY:0,lastX:e,lastY:r,x:e,y:r}:{node:u,deltaX:e-o.lastX,deltaY:r-o.lastY,lastX:o.lastX,lastY:o.lastY,x:e,y:r}},e.createDraggableData=function(t,e){var r=t.props.scale;return{node:e.node,x:t.state.x+e.deltaX/r,y:t.state.y+e.deltaY/r,deltaX:e.deltaX/r,deltaY:e.deltaY/r,lastX:t.state.x,lastY:t.state.y}},e.getBoundPosition=function(t,e,r){if(!t.props.bounds)return[e,r];var i=t.props.bounds;i="string"==typeof i?i:{left:(l=i).left,top:l.top,right:l.right,bottom:l.bottom};var u=a(t);if("string"==typeof i){var l,s,c=u.ownerDocument,f=c.defaultView;if(!((s="parent"===i?u.parentNode:c.querySelector(i))instanceof f.HTMLElement))throw Error('Bounds selector "'+i+'" could not find an element.');var d=f.getComputedStyle(u),p=f.getComputedStyle(s);i={left:-u.offsetLeft+(0,n.int)(p.paddingLeft)+(0,n.int)(d.marginLeft),top:-u.offsetTop+(0,n.int)(p.paddingTop)+(0,n.int)(d.marginTop),right:(0,o.innerWidth)(s)-(0,o.outerWidth)(u)-u.offsetLeft+(0,n.int)(p.paddingRight)-(0,n.int)(d.marginRight),bottom:(0,o.innerHeight)(s)-(0,o.outerHeight)(u)-u.offsetTop+(0,n.int)(p.paddingBottom)-(0,n.int)(d.marginBottom)}}return(0,n.isNum)(i.right)&&(e=Math.min(e,i.right)),(0,n.isNum)(i.bottom)&&(r=Math.min(r,i.bottom)),(0,n.isNum)(i.left)&&(e=Math.max(e,i.left)),(0,n.isNum)(i.top)&&(r=Math.max(r,i.top)),[e,r]},e.getControlPosition=function(t,e,r){var n="number"==typeof e?(0,o.getTouch)(t,e):null;if("number"==typeof e&&!n)return null;var i=a(r),u=r.props.offsetParent||i.offsetParent||i.ownerDocument.body;return(0,o.offsetXYFromParent)(n||t,u,r.props.scale)},e.snapToGrid=function(t,e,r){return[Math.round(e/t[0])*t[0],Math.round(r/t[1])*t[1]]};var n=r(9177),o=r(7251);function a(t){var e=t.findDOMNode();if(!e)throw Error("<DraggableCore>: Unmounted during event!");return e}},9177:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.dontSetMe=function(t,e,r){if(t[e])return Error("Invalid prop ".concat(e," passed to ").concat(r," - do not set this, set it on the child."))},e.findInArray=function(t,e){for(var r=0,n=t.length;r<n;r++)if(e.apply(e,[t[r],r,t]))return t[r]},e.int=function(t){return parseInt(t,10)},e.isFunction=function(t){return"function"==typeof t||"[object Function]"===Object.prototype.toString.call(t)},e.isNum=function(t){return"number"==typeof t&&!isNaN(t)}}}]);