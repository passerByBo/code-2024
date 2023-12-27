import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './wdyr';
// import App from '@pages/App';
import './style.css';
// import Home from '@components/Test/Index';
import ErrorBoundary from '@components/Lib/ErrorBoundary';
import PageErrorFallback from '@components/Lib/BeautifulError';
import App from '@pages/App';

const container = document.getElementById('app')!;

const root = createRoot(container);

root.render(
  <ErrorBoundary fallbackRender={PageErrorFallback}>
    <BrowserRouter>
      {/* <App title="京程一灯DApp项目架构" /> */}
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
);
