import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Toaster.css'

toast.configure()

export const toaster = (identifier:any, message, timeout = 2000) => {
  toast[identifier](message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: timeout,
    hideProgressBar: true,
    pauseOnHover: false,
  })
}
