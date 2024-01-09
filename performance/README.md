性能监控平台

页面的加载速度指标
FP
FCP  1.8秒一下   大于3秒  谷歌官方标准
LCP  2.5-4s

页面响应能力
FID会被INP指标替换  2024年3月   100-300
INP 300-500 统计所有用户输入延迟

稳定指标
CLS 累计布局偏移  0.1 - 0.25


TBT长任务阻塞总时间   大于50ms的就是长任务   任务超过50ms的部分被认为是阻塞的时间  将所有的阻塞时间加起来  控制在300ms以内

TTFB  页面打开到响应的第一个字节


性能监控方案选择
1、google提供  api式的web-vitals库
2、自定义性能指标 开发人员可以自定义javascript脚本来 监控页面的加载时间，资源加载时间，白屏时间等等
3、完全采用三方第三方监控平台 New Relic、Sentry、SpeedCurve提供更丰富的性能数据和可视化报告
4、结合Performance.timing使用

通过监控Perfor mance实例的不同entryType 获取不同的性能数据
需要考虑某些实验性的属性在低版本浏览器上的兼容性

性能监控-自定义SDK
数据清洗
指标监听  上报机制  数据分析   可视化呈现


日志服务器,直接入库，或者1kb图片带数据传递，
上传数据不影响主线程：requestIdleCallback   navigator.sendBeacon
不能写侵入式的代码

TODO： web-vitals的源码

1、抛出问题
2、方案：上面四种方案
3、难点，技术、资源
4、收益：项目现状-使用后效果

cls 图片视频要有宽度和高度避免突变   内容突然插入突然消失   动画的选择


img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
}














































