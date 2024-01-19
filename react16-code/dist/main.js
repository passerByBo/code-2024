/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./react/createElement.js
function createElement(type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  };
}
function createTextElement(text) {
  return {
    type: 'text',
    props: {
      nodeValue: text,
      children: []
    }
  };
}
;// CONCATENATED MODULE: ./react/react-dom.js
function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type);
  const isProperty = key => key !== 'children';
  Object.keys(element.props).filter(isProperty).forEach(name => dom[name] = element.props[name]);
  element.props.children.forEach(element => render(element, dom));
  container.appendChild(dom);
}
;// CONCATENATED MODULE: ./react/index.js


const React = {
  createElement: createElement,
  render: render
};

/* harmony default export */ const react = (React);
;// CONCATENATED MODULE: ./src/index.js
// import React from 'react'

const src_element = /*#__PURE__*/react.createElement("div", null, "\u6587\u672C\u8282\u70B9", /*#__PURE__*/react.createElement("h1", {
  title: "foo"
}, "hello react"), /*#__PURE__*/react.createElement("a", null, "\u6D4B\u8BD5\u94FE\u63A5"));
console.log('element', src_element);

// const node = document.createElement(element.type)
// node['title'] = element.props.title;

// const text  = document.createTextNode('')
// text['nodeValue'] = element.props.children;

// node.appendChild(text)

const container = document.getElementById('root');
react.render(src_element, container);
// container.appendChild(node)

// const element = {
//     type: 'h1',
//     props: {
//         title: 'foo',
//         children: 'hello react'
//     }
// }
/******/ })()
;