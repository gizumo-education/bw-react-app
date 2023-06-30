import { toast } from 'react-toastify'

import { Icon } from '../../components/ui/Icon'
import styles from './index.module.css'

const customId = 'custom-id-yes'

export const errorToast = (message) => {
  toast.error(message, {
    autoClose: false,
    position: toast.POSITION.TOP_RIGHT,
    icon: <Icon iconName='circleAlert' color='danger' size='medium' />,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: false,
    className: styles['toast-message-error'],
    toastId: customId,
  })
}
