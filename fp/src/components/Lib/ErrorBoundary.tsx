import { Component, ErrorInfo, ReactNode, ReactElement } from 'react';
interface State {
  hasError: boolean;
}
interface Props {
  children: ReactNode;
  fallbackRender: ({ error }: { error: Error | null }) => ReactElement;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // 当子组件抛出异常 这里会接收到并且调用
  public static getDerivedStateFromError(_: Error): State {
    console.log('🍌', _);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 嵌入SDK
    console.error('报告错误🧓', error, errorInfo);
  }

  // 对外的render必须增加一个返回值
  public render(): ReactNode {
    const { children, fallbackRender } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return fallbackRender({ error: new Error('系统组件出错') });
    }
    return children;
  }
}

export default ErrorBoundary;
