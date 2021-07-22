import { App } from 'vue'
import {
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table,
  Drawer,
  Switch,
  Upload,
  Modal,
  TreeSelect,
  DatePicker,
  Cascader,
  Radio,
  Tabs,
  Rate,
  InputNumber,
  Tag,
  Popconfirm,
  Alert,
  Spin,
  Popover,
  Empty,
  Avatar,
  Tooltip
} from 'ant-design-vue'

export const components = [
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table,
  Drawer,
  Switch,
  Upload,
  Modal,
  TreeSelect,
  DatePicker,
  Cascader,
  Radio,
  Tabs,
  Rate,
  InputNumber,
  Tag,
  Popconfirm,
  Alert,
  Spin,
  Popover,
  Empty,
  Avatar,
  Tooltip
]

export default {
  install: (app: App) => {
    components.forEach(component => {
      app.use(component)
    })
  }
}
