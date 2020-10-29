import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const customErrorMessage = function(message) {
    toast.success(message, {
        position: 'bottom-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

}

export const successMessage = function(message) {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

}