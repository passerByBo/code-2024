import { memo } from 'react';

const Demo = () => {
  return (
    <div>
      <h1>测试值</h1>
    </div>
  );
};

Demo.whyDidYouRender = true;
export default memo(Demo);
