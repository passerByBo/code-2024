// 下一个工作单元
let nextNuitOfWork = null;

// fiberRoot根节点
let wipRoot = null

export function render(element, container) {
  // 初始化设置根节点为下一个工作单元
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  nextNuitOfWork = wipRoot
}

/**
 * 工作循环
 * @param {*} deadline
 */
function workLoop(deadline) {
  // 停止标识
  let shouldYield = false;
  while (nextNuitOfWork && deadline) {
    // 执行工作单元
    nextNuitOfWork = performUnitOfWork(nextNuitOfWork);
    // 判断是否需要停止
    shouldYield = deadline.timeRemaining() < 1;
  }

  // dom创建完成  统一将d
    while(!domParentFiber.dom){
        domParentFiber = domParentFiber.parent
    }

    // 将fiber的dom节点追加到父节点
    domParentFiber.dom.appendChild(fiber.dom)

    // 深度优先遍历 递归的方式
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}


function commitRoot(){
    commitWork(wipRoot.child)
     // 提交完成后 设置为null
     wipRoot = null
}


// dom描述对象转换为fiber对象
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
//   if (fiber.parent) {
//     fiber.parent.dom.appendChild(fiber.dom);
//   }
  const elements = fiber.props.children;

  // 默认索引为0
  let index = 0;
  // 保存上一个兄弟节点
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    // 将子一个孩子节点设置fiber的子节点
    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      // 第一个之外的子节点设置为第一个子节点的兄弟节点
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

  // 深度优先遍历  下一层遍历节点优先遍历子节点
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  // 其次遍历兄弟节点  如果兄弟节点存在 返回兄弟节点作为下一次任务需要处理的节点
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    // 如果没有child也没有sibling 将当前while循环指向父节点 查找父节点的sibling
    // 一直向上递归 直到parent不存在为止
    nextFiber = nextFiber.parent;
  }
}

export function createDom(fiber) {
  // 新的fiber模型
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  const isProperty = (key) => key !== "children";

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => (dom[name] = fiber.props[name]));
  return dom;
}

// export function render(element, container){

//     const dom = element.type === 'TEXT_ELEMENT'
//     ? document.createTextNode('')
//     : document.createElement(element.type)

//     const isProperty = key => key !== 'children'

//     Object.keys(element.props)
//     .filter(isProperty)
//     .forEach(name => dom[name] = element.props[name])

//     // stack 同比的 不能被中断
//     element.props.children.forEach(element => render(element, dom))

//     container.appendChild(dom)
// }

// 链表 执行工作单元  下一个工作单元
// while(下一个工作单元){
//     下一个工作单元 = 执行工作单元(返回下一个工作的安全)
// }
