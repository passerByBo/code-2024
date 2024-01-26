// import React from 'react'
import React from "../react";

// --------------------- hooks --------------------

function Counter() {
//   const [state, setState] = React.useState(1);
  const [state2, setState2] = React.useState(2);

  function onClickHandle(params) {
    // const [state3, setState3] = React.useState(3)
    // setState((state) => state + 1);
    // setState((state) => state + 2);
  }

  return (
    <div>
      <h1>Count: {'state'}</h1>
      <button onClick={onClickHandle}>+Add</button>
      <hr />
      <h1>Count2: {state2}</h1>
      <button onClick={() => setState2((state) => state + 1)}>+1</button>
      {/* <button onClick={() => setState2((state) => state + 1)}>+1</button> */}
      <button onClick={() => setState2((state) => state + 2)}>+2</button>
    </div>
  );
}

const element = <Counter />;

React.render(element, document.getElementById("root"));

// React Hooks使用一个单向链表来保存组件的状态和副作用，在每次组件渲染时，React会遍历这个链表，按照定义的顺序依次执行每个Hook对应的状态更新和副作用函数。通
// 过链表的形式，React可以保持Hook的调用顺序一致，并正确的跟踪每个Hook的状态和更新

// ------------------ 阶段4 -----------------

// const App = ({name}) => {
//     return <h1>hello {name}</h1>
// }

// const element = <App name='foo'></App>
// console.log('element',element)

// const container = document.getElementById('root')
// React.render(element, container)

// ------------------ 阶段3 --------------------
// const container = document.getElementById('root')

// const updateValue = (e) => {
//     rerender(e.target.value)
// }

// const rerender = (value) => {
//     const element = (
//         <div>
//             <input onInput={updateValue} value={value}/>
//             <h2>Hello {value}</h2>
//         </div>
//     )

//     React.render(element, container)
// }

// rerender('World')

// ---------------------阶段2--------------------
// const element = <div>
//     文本节点
//     <h1 title="foo">hello react</h1>
//     <a>测试链接</a>
// </div>

// console.log('element',element)

// const container = document.getElementById('root')
// React.render(element, container)

// ------------------阶段1--------------------
// container.appendChild(node)
// const node = document.createElement(element.type)
// node['title'] = element.props.title;

// const text  = document.createTextNode('')
// text['nodeValue'] = element.props.children;

// node.appendChild(text)

// const element = {
//     type: 'h1',
//     props: {
//         title: 'foo',
//         children: 'hello react'
//     }
// }
