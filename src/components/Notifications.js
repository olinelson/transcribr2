import { message } from 'antd'

export const openNotificationWithIcon = (type, _message) => {
  message[type](
    _message,
    2
  )
}
