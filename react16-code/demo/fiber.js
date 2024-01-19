// 为什么react 抛弃原来的fiber Reconciler
// requestAnimationFrame回调执行与task和microtask无关，它是在浏览器渲染前，在微任务执行后执行  时机其实也并不是很准确
// requestAnimationFrame 还有个特点 就是当页面处理未激活的状态下 requestAnmationFrame会停止执行（安卓应用切换前后台）当后面页面再次换为激活妆台时
// requestAnimationFrame又会接着上一次的地方继续执行


const tasks = [] //任务队列
let isPerformingTask = false // 标识漂亮  英语标识当前是否有任务正在运行

const channel = new MessageChannel() // 创建一个新的消息通信
const port = channel.port2;// 获取通道的第二个端口


// 任务和任务的过期时间
function scheduleTask(task, expirationTime){
    tasks.push({task, expirationTime})// 将任务和过期时间添加到任务队列中
    if(!isPerformingTask){
        isPerformingTask = true;// 将标识变量设置为true 表示现在有任务正在执行
        // 双向通信  一个发 一个接
        port.postMessage(null) // 向消息通道的第二个端口发送一个空消息\
    }
}


function performTask(currentTime){
    console.log('currentTime',currentTime)
    const frameTime = 1000 / 60 //每一帧的时间

    // performance.now()当前时间   上一帧的时间
    // 在两帧之间 一直循环判断tasks中的任务是否执行完成
    while(tasks.length > 0 && performance.now() - currentTime < frameTime){
        console.log('----currentTime---',currentTime,performance.now(), performance.now() - currentTime)
        const {task, expirationTime} = tasks.shift();// 从任务队列中取出任务和过期的时间
        if(performance.now() >= expirationTime){
            // 如果任务没有过期则执行任务
            task()
        } else {
            tasks.push({task, expirationTime})
        }
    }

    // 如果还有任务 下一次两帧之间的时间还需要继续判断
    if(tasks.length){
        requestAnimationFrame(performTask)
    } else {
        isPerformingTask = false // 如果所有的任务都已经执行完毕  将标识设置为false
    }

}


//当通道的第一个端口接收到消息时，开始执行任务
channel.port1.onmessage = () => requestAnimationFrame(performTask)


// 示例任务函数
function myTask1(){
    console.log('Performing task 1')
}

function myTask2(){
    console.log('Performing task 2')
}

function myTask3(){
    console.log('Performing task 3')
}


// 添加超时任务到任务队列 并设置过期时间
scheduleTask(myTask1, performance.now() + 1000) // 过期时间为当前时间 + 1000ms
scheduleTask(myTask2, performance.now()) // 过期时间为当前时间
scheduleTask(myTask3, performance.now() + 3000) // 过期时间为当前时间 + 3000ms


console.log('同步任务')