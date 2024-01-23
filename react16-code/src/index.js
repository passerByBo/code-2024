// import React from 'react'
import React from '../react'


// ------------------ 阶段4 -----------------

const App = ({name}) => {
    return <h1>hello {name}</h1>
}

const element = <App name='foo'></App>
console.log('element',element)

const container = document.getElementById('root')
React.render(element, container)

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