<!-- @format -->
<template>
  <div class="ScreenAdapter" :style="style">
    <slot />
  </div>
</template>
<script>
export default {
  name: '',
  // 参数注入
  props: {
    width: {
      type: String,
      default: '1920'
    },
    height: {
      type: String,
      default: '1080'
    }
  },
  data () {
    return {
      style: {
        // width: this.width + 'px',
        width: '100vw', // 竖向有滚动条
        height: 0 + 'px',
        transform: 'scale(1, 1)' // translate(-50%, -50%)'
      },
      ua: navigator.userAgent.toLocaleLowerCase(),
      windowWidth: document.documentElement.clientWidth, // 实时屏幕宽度
      windowHeight: document.documentElement.clientHeight // 实时屏幕高度
    }
  },
  mounted () {
    this.setScale()
    window.onresize = this.Debounce(this.setScale, 500)
  },
  methods: {
    Debounce: (fn, t) => {
      const delay = t || 500
      let timer
      return function () {
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    },
    // 获取放大缩小比例
    getScale () {
      const w = window.innerWidth / +this.width
      const h = window.innerHeight / this.height
      // const h = 0.61;//纵向压缩没有滚动条
      // console.log(window.innerWidth, this.width, w);
      // console.log(window.innerHeight, this.height, h);
      // return w < h ? w : h;
      // const scale = [w, h]; //纵向压缩没有滚动条
      return w
      // return scale;
    },
    // 设置比例
    setScale () {
      const scale = this.getScale()
      this.style.transform = `scaleX(${scale}) scaleY(${scale})`
      // this.style.transform =
      //   'scale(' + this.getScale() + ', ' + this.getScale() + ')'; // translate(-50%, -50%)';
      // this.style.transform = 'scale(' + scale[0] + ', ' + scale[1] + ')'; //纵向压缩没有滚动条
    }
  }
}
</script>
<style lang="less" scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  transition: 0.2s;
  width: 100vw;
  height: 0;
  top: 0;
  left: 0;
  right: 0;
  font-family: Microsoft YaHei;
  box-sizing: border-box;
  transform: translateZ(0)
}
</style>
