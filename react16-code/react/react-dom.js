// 下一个工作单元
let nextNuitOfWork = null;

// fiberRoot根节点
let wipRoot = null;
// 更新前的根节点fiber树
let currentRoot = null;
// 需要删除u的节点
let deletions = null;

const isProperty = (key) => key !== "children";
// 是否有新属性 属性被更新
const isNew = (prev, next) => (key) => prev[key] !== next[key];
// 是否有旧属性
const isGone = (prev, next) => (key) => !(key in next);
// 是否是事件 这里其实只是模拟  真实的肯定不是这样
const isEvent = (key) => key.startsWith("on");

export function render(element, container) {
  // 初始化设置根节点为下一个工作单元
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    // 映射保存对应的新老fiber节点
    alternate: currentRoot,
  };

  // 初始化设置为空的数组
  deletions = [];
  nextNuitOfWork = wipRoot;
  requestIdleCallback(workLoop);
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

  // 将所有的dom描述都转换为fiber node
  if (!nextNuitOfWork && wipRoot) {
    // 提交阶段  创建dom  将dom绑定到父节点上
    commitRoot();
  }

  requestIdleCallback(workLoop);
}


/**
 * 更新dom的属性
 * @param {*} dom
 * @param {*} preProps
 * @param {*} nextProps
 */
function updateDom(dom, prevProps, nextProps) {
  // 移除老的事件监听
  Object.keys(prevProps)
    .filter(isEvent)
    // 第一步判断 在新的事件中已经被删除  或者 事件处理函数被修改
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  // 移除老的属性
  Object.keys(prevProps)
    .filter(isProperty)
    // 在新的中不存在
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });

  // 添加和替换新的事件监听
  Object.keys(nextProps)
    .filter(isEvent)
    .filter((key) => isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });

  // 添加新的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      // 包含新增和替换的属性
      dom[name] = nextProps[name];
    });
}

/**
 * 删除dom
 * @param {*} fiber 
 * @param {*} domParent 
 */
const commitDeletion = (fiber, domParent) => {
  if(fiber.dom){
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

function commitWork(fiber) {
  // 结束条件
  if (!fiber) {
    return;
  }

  // 查找真实父级节点
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }

  const domParent = domParentFiber.dom;

  // 操作DOM
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    // domParent.removeChild(fiber.dom);
    commitDeletion(fiber, domParent)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }

  // // 绑定dom节点
  // domParentFiber.dom.appendChild(fiber.dom);

  // 如果当前的dom节点已经被删除或者移动 还需要继续递归吗？
  // 深度优先遍历递归
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

/**
 * 将fiber tree渲染为真实的dom节点
 */
function commitRoot() {
  // 提交前清空删除待删除的节点
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  // 渲染完毕后的树  当前界面DOM-fiberTree 对应渲染为真实的dom
  currentRoot = wipRoot;
  // 提交完成后 设置为null
  wipRoot = null;
}
// 构建了一棵新的elementTree -> 转换为fiberTree 新老fiber有关联
/**
 * 协调
 * @param {*} wipFiber
 * @param {*} elements
 */
function reconcileChildren(wipFiber, elements) {
  // 索引给index = 0
  let index = 0;
  // 上一个兄弟节点
  let prevSibling = null;
  // 上一次渲染的fiber  dom diff
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;

  // elements是新的fiber.child  oldFiber是老的 fiber.child
  // 循环遍历新的child 和老的进行比较
  // 基于同一层做比较
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    // 第一个element为child  进行对比
    const sameType = oldFiber && element && element.type === oldFiber.type;

    // 如下四个操作可能会有组合式的条件

    // 类型相同需要更新
    if (sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        parent: wipFiber,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }

    // 如下两个条件 如果存在节点类型变更 会走两个类型 结合起来就是删除老节点 新增新的节点  组成更新节点

    // 新的存在 并且类型和老的不相同需要新增
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        parent: wipFiber,
        dom: null,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    // 老的存在 并且和新的类型不同 删除老的节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      // 深度优先遍历
      deletions.push(oldFiber);
    }

    // 处理老fiber的兄弟节点  和后续的新节点fiber对应
    // （这里应该少了一些东西  只能在顺序进行比较 如果有位置移动的操作 这里就是直接创建和删除 和原始的不一致）
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    // 将子一个孩子节点设置fiber的子节点
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      // 第一个之外的子节点设置为第一个子节点的兄弟节点
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

/**
 * Function Component 组件
 * @param {*} fiber 
 */
const updateFunctionComponent = (fiber) => {
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

/**
 * 原生dom组件
 * @param {*} fiber 
 */
const updateHostComponent = (fiber) => {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements)
}

// dom描述对象转换为fiber对象
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if(isFunctionComponent){
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
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
  // 第一次渲染的时候新的传递老的为空
  updateDom(dom, {}, fiber.props);
  // Object.keys(fiber.props)
  //   .filter(isProperty)
  //   .forEach((name) => (dom[name] = fiber.props[name]));
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
