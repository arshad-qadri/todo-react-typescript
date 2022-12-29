import { toast } from "react-toastify";

export const toastify = (message: string, type: "success" | "error") => {
  toast[type](message);
};
