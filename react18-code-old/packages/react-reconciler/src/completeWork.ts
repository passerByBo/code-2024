import { FiberNode } from './fiber';
import { HostRoot, HostText, HostComponent, FunctionComponent, Fragment } from './workTags';
import { appendInitialChild, createInstance, createTextInstance } from './hostConfig';
import { NoFlags, Update } from './fiberFlags';
import { Container } from './hostConfig';
import { updateFiberProps } from 'react-dom/src/SyntheticEvent';

function markUpdate(fiber: FiberNode) {
  fiber.flags |= Update;
}

function appendAllChildren(parent: Container, wip: FiberNode) {
  let node = wip.child;

  while (node !== null) {
    if (node.tag === HostComponent || node.tag === HostText) {
      appendInitialChild(parent, node?.stateNode);
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }

    if (node === wip) {
      return;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === wip) {
        return;
      }
      node = node?.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function bubbleProperties(wip: FiberNode) {
  let subtreeFlags = NoFlags;
  let child = wip.child;

  while (child !== null) {
    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;
    // console.log('🌺: ', child, subtreeFlags);
    child.return = wip;
    child = child.sibling;
  }
  wip.subtreeFlags |= subtreeFlags;
}

export const completeWork = (wip: FiberNode) => {
  // if (__DEV__) {
  //   console.warn('render阶段结束');
  // }
  const newProps = wip.pendingProps;
  const current = wip.alternate;
  switch (wip.tag) {
    case HostComponent:
      // console.log('🐻', newProps, current);
      if (current !== null && wip.stateNode) {
        // 更新
        // 1. props是否变化 {onClick: xx} {onClick: xxx}
        // 2. 变了 Update flag
        // className style
        updateFiberProps(wip.stateNode, newProps);
      } else {
        //构建dom
        const instance = createInstance(wip.type, newProps);
        // const instance = createInstance(wip.type);
        // console.log(wip);
        //加到dom树中
        appendAllChildren(instance, wip);
        //dom真实对应的dom
        wip.stateNode = instance;
        // console.log('🌺: ', wip);
      }
      bubbleProperties(wip);
      // console.log('🌲: ', wip);
      return null;
    case HostText:
      if (current !== null && wip.stateNode) {
        // update
        const oldText = current.memoizedProps?.content;
        const newText = newProps.content;
        if (oldText !== newText) {
          markUpdate(wip);
        }
      } else {
        // 1. 构建DOM
        const instance = createTextInstance(newProps.content);
        wip.stateNode = instance;
      }
      bubbleProperties(wip);
      return null;
    case HostRoot:
    case FunctionComponent:
    case Fragment:
      bubbleProperties(wip);
      return null;
    default:
      if (__DEV__) {
        console.warn('未处理的completeWork情况', wip);
      }
      return null;
  }
};
