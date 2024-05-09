import { encrypt } from "./crypto";

export interface RequestData {
  request_data: string;
}
const generateRequestData = (data: string): RequestData => {
  return { request_data: encrypt(data) };
};
export default generateRequestData;
