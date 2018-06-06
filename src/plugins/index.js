import { message } from 'antd'
import { createLogger } from 'redux-logger'

export default {
  onAction: createLogger(),
  onError (e) {
    e.preventDefault()
    message.error(e.message)
  },
}
