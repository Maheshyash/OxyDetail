import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Toaster.css'

export const toaster = (identifier: 'info' | 'success' | 'warning' | 'error', message: string, timeout = 5000) => {
  toast[identifier](message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: timeout,
    hideProgressBar: true,
    pauseOnHover: false,
  })
}
