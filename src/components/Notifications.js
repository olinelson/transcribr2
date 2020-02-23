import { notification } from 'antd'

export const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message,
    duration: 2
  })
}
