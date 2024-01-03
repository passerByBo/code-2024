// (function(){
//     function hello(){
//         return 'hello'
//     }

//     function word(){
//         return 'word'
//     }

//     const s = hello() + ' ' + word()
//     console.log('s', s)
// })()
import data from './data'
import('./async').then((module) => {
    console.log(module)
})
console.log('是小波', data)