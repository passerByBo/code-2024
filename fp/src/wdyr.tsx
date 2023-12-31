import React from 'react';
/// <reference types="@welldone-software/why-did-you-render" />
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    titleColor: 'green',
    trackAllPureComponents: true,
    trackHooks: true,
  });
}
