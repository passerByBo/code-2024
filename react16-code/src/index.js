// import React from 'react'
import React from '../react'
const element = <div>
    文本节点
    <h1 title="foo">hello react</h1>
    <a>测试链接</a>
</div>

console.log('element',element)

// const node = document.createElement(element.type)
// node['title'] = element.props.title;

// const text  = document.createTextNode('')
// text['nodeValue'] = element.props.children;

// node.appendChild(text)


const container = document.getElementById('root')
React.render(element, container)
// container.appendChild(node)


// const element = {
//     type: 'h1',
//     props: {
//         title: 'foo',
//         children: 'hello react'
//     }
// }