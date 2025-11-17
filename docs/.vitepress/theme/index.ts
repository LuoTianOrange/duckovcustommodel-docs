import { h } from 'vue'
import Theme from 'vitepress/theme'
import RegisterSW from './components/RegisterSW.vue'
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import './custom.css'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'layout-bottom': () => h(RegisterSW)
    })
  },
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx);
    // 注册全局组件（可选）
    ctx.app.component('vImageViewer', vImageViewer);
},
setup() {
    const route = useRoute();
    // 启用插件
    imageViewer(route);
}
}