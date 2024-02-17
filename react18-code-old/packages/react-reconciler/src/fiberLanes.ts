import { FiberRootNode } from './fiber';

export type Lane = number;
export type Lanes = number;

export const SyncLane = 0b0001;
export const NoLane = 0b0000;
export const NoLanes = 0b0000;

export function mergeLanes(laneA: Lane, laneB: Lane): Lanes {
  // 按位或   合并
  return laneA | laneB;
}

export function requestUpdateLane() {
  return SyncLane;
}

export function getHighestPriorityLane(lanes: Lanes): Lane {
  // 取出最右边 最低位中的1
  return lanes & -lanes;
}

export function markRootFinished(root: FiberRootNode, lane: Lane) {
  root.pendingLanes &= ~lane;
}
