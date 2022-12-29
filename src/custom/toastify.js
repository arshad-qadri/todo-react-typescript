import { toast } from "react-toastify";

export const toastify = (message,type) => {
 return toast[type](message);
};
