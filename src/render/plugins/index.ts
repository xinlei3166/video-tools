import { App } from 'vue'
import antd from './antd'
import icon from './icon'
import bus from './bus'

export default {
  install: (app: App) => {
    app.use(antd)
    app.use(icon)
    app.use(bus)
  }
}
