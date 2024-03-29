import { createContainer, updateContainer } from 'react-reconciler/src/fiberReconciler';
import { ReactElementType } from 'shared/ReactTypes';
import { Container } from 'react-reconciler/src/hostConfig';
import { initEvent } from './SyntheticEvent';

export function createRoot(container: Container) {
  // 创建FiberRootNode  关联HostRootFiber  current  stateNode
  const root = createContainer(container);
  return {
    render(element: ReactElementType) {
      initEvent(container, 'click');
      return updateContainer(element, root);
    },
  };
}
