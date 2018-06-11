import { message } from 'antd'
import { createLogger } from 'redux-logger'

const logger = process.env.NODE_ENV === 'production' ? () => {} : createLogger
export default {
  onAction: logger(),
  onError (e) {
    e.preventDefault()
    message.error(e.message)
  },
}
