import { enqueueSnackbar } from "notistack";

class Alert {
  static error = (message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  };
  static success = (message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  };
}
export default Alert;
