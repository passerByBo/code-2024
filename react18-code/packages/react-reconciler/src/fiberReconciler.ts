import { Container } from './hostConfig';
import { ReactElement, ReactElementType } from 'shared/ReactTypes';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import { UpdateQueue, createUpdate, createUpdateQueue, enqueueUpdate } from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { requestUpdateLane } from './fiberLanes';

//setstate -> scheduleUpdateOnFiber -> scheduleWork ->

//requestWork -> scheduleWork -> performSyncWorkOnRoot -> renderRootSync -> workLoopSync -> performUnitOfWork -> beginWork

export function createContainer(container: Container) {
  //根据页面中真实的dom hostRootFiber
  const hostRootFiber = new FiberNode(HostRoot, {}, null);
  const root = new FiberRootNode(container, hostRootFiber);
  hostRootFiber.updateQueue = createUpdateQueue();
  return root;
}

export function updateContainer(element: ReactElement | null, root: FiberRootNode) {
  const hostRootFiber = root.current;
  // 优先级 SyncLane 同步  真实代码中可能会根据一些条件差异化返回
  const lane = requestUpdateLane();
  // 创建update 根据element和lane   结构是传入的element赋值给action lane和next
  const update = createUpdate<ReactElementType | null>(element, lane);
  // update.next = update ---- updateQueue.shared.pending = update;
  enqueueUpdate(hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>, update);
  // 开启调度
  scheduleUpdateOnFiber(hostRootFiber, lane);
  return element;
}
