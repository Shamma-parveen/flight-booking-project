import axiosInstance from "@/api/axiosInstance";
import generateRequestData from "@/utils/generateRequestData";

export interface ISearchFlightBody {
  user_id: number;
  from_airport: string;
  to_airport: string;
  year: string;
  month: string;
  day: string;
  round_year: string;
  round_month: string;
  round_day: string;
  adults: string;
  childs: string;
  infants: string;
  class_type: string;
  travel_type: string;
  max_result: number;
}
const searchFlight = async (body: ISearchFlightBody) => {
  const url = "/flight/new-flight-search";
  const { data } = await axiosInstance.post(
    url,
    generateRequestData(JSON.stringify(body))
  );
  console.log("searchflightData: ", data);
  return data;
};
export default searchFlight;
