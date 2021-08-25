import { toast } from "react-toastify";

toast.configure();

export const warningNotify = (text) => {
  return toast.warn(text);
};

export const errorNotify = (text) => {
  return toast.error(text);
};

export const successNotify = (text) => {
  return toast.success(text);
};
