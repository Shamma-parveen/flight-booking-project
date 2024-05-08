import axiosInstance from "@/api/axiosInstance";
import generateRequestData from "@/utils/generateRequestData";
interface ILoginResponse {
  main_data: {
    res_code: number;
    response: string;
    data: {
      profile: {
        token: string;
      };
    };
  };
}
const login = async (body: { email: string; password: string }) => {
  const { data } = await axiosInstance.post<ILoginResponse>(
    "/auth/login",
    generateRequestData(JSON.stringify(body))
  );
  return data;
};
export default login;
