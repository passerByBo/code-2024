import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import { MutationMask, NoFlags } from './fiberFlags';
import { commitMutationEffects } from './commitWork';
import {
  getHighestPriorityLane,
  Lane,
  markRootFinished,
  mergeLanes,
  NoLane,
  SyncLane,
} from './fiberLanes';
import { flushSyncCallbacks, scheduleSyncCallback } from './syncTaskQueue';
import { scheduleMicroTask } from './hostConfig';

//正在工作中的树
let workInProgress: FiberNode | null = null;
let wipRootRenderLane: Lane = NoLane;

function prepareFreshStack(root: FiberRootNode, lane: Lane) {
  workInProgress = createWorkInProgress(root.current, {});
  wipRootRenderLane = lane;
}

function completeUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;
  do {
    //兄弟节点
    completeWork(node);
    const sibling = node.sibling;

    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }

    node = node.return;
    workInProgress = node;
  } while (node !== null);
}

// 这里少了原来的分片机制   直接一口气执行完成
function performUnitOfWork(fiber: FiberNode) {
  //child
  const next = beginWork(fiber, wipRootRenderLane);
  fiber.memoizedProps = fiber.pendingProps;

  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    workInProgress = next!;
  }
}

function workLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}
function commitRoot(root: FiberRootNode) {
  // console.log('root: ', root);
  const finishedWork = root.finishedWork;

  if (finishedWork === null) {
    return;
  }

  if (__DEV__) {
    console.log('commit阶段开始', finishedWork);
  }
  const lane = root.finishedLane;
  if (lane === NoLane && __DEV__) {
    console.error('commit阶段finishedLane不应该是NoLane');
  }
  root.finishedWork = null;
  root.finishedLane = NoLane;
  markRootFinished(root, lane);
  // 判断是否存在3个子阶段需要执行的操作
  const subtreeHasEffect = (finishedWork.subtreeFlags & MutationMask) !== NoFlags;
  const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;
  if (subtreeHasEffect || rootHasEffect) {
    // beforeMutation
    // mutation Placement
    commitMutationEffects(finishedWork);
    root.current = finishedWork;
    //layout
  } else {
    root.current = finishedWork;
  }
}

// function renderRoot(root: FiberRootNode) {
//   // 初始化
//   prepareFreshStack(root);
//   do {
//     try {
//       workLoop();
//       break;
//     } catch (e) {
//       if (__DEV__) {
//         console.warn('workLoop发生错误', e);
//       }
//       workInProgress = null;
//     }
//   } while (true);

//   const finishedWork = root.current.alternate;
//   root.finishedWork = finishedWork;
//   commitRoot(root);
// }

function markUpdateFromFiberToRoot(fiber: FiberNode) {
  let node = fiber;
  let parent = node.return;
  while (parent !== null) {
    node = parent;
    parent = node.return;
  }
  // console.log('node: ', node.tag, HostRoot);
  if (node.tag === HostRoot) {
    return node.stateNode;
  }
  return null;
}
function performSyncWorkOnRoot(root: FiberRootNode, lane: Lane) {
  const nextLane = getHighestPriorityLane(root.pendingLanes);
  if (nextLane !== SyncLane) {
    // 其他比SyncLane低的优先级
    // NoLane
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    ensureRootIsScheduled(root);
    return;
  }
  if (__DEV__) {
    console.warn('render阶段开始');
  }
  // 创建根FiberNode 赋值给workingProgress
  prepareFreshStack(root, lane);
  do {
    try {
      workLoop();
      break;
    } catch (e) {
      if (__DEV__) {
        console.warn('workLoop发生错误', e);
      }
      workInProgress = null;
    }
  } while (true);

  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;
  root.finishedLane = lane;
  wipRootRenderLane = NoLane;
  commitRoot(root);
}
// schedule阶段入口
function ensureRootIsScheduled(root: FiberRootNode) {
  const updateLane = getHighestPriorityLane(root.pendingLanes);
  if (updateLane === NoLane) {
    return;
  }
  // updateLane = 1同步任务
  //react18 并行更新任务 startTransition
  if (updateLane === SyncLane) {
    // 同步优先级 用微任务调度
    if (__DEV__) {
      console.log('在微任务中调度，优先级：', updateLane);
    }
    // [performSyncWorkOnRoot, performSyncWorkOnRoot, performSyncWorkOnRoot]
    // scheduleSyncCallback 添加函数执行
    scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root, updateLane));
    // 通过微任务  宏任务等方式执行函数
    scheduleMicroTask(flushSyncCallbacks);
  } else {
    // 其他优先级 用宏任务调度
  }
}

function markRootUpdated(root: FiberRootNode, lane: Lane) {
  root.pendingLanes = mergeLanes(root.pendingLanes, lane);
}
export function scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) {
  // //正在工作中的树
  // workInProgress = fiber;
  // //根节点
  // const root = fiber.return as FiberNode;
  // 根据传入的fiber获取root  这里的root为FiberRootNode
  const root = markUpdateFromFiberToRoot(fiber);
  //开始渲染
  console.log('🐱开始渲染');
  // renderRoot(root);
  // 传入FiberRootNode 和lane 给root的pendingLanes合并
  // 二进制数据取或
  // FiberRootNode的pendingLanes设置为1
  markRootUpdated(root, lane);
  ensureRootIsScheduled(root);
}
