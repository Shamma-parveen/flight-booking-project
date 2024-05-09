import axiosInstance from "@/api/axiosInstance";
import generateRequestData from "@/utils/generateRequestData";
export interface IAirport {
  id: number;
  airport_name: string;
  city: string;
  iata: string;
  country: string;
  short_name: string;
  input_name: string;
  lat: string;
  lon: string;
}
export interface ISearchAirportResponse {
  main_data: {
    res_code: number;
    response: string;
    data: IAirport[];
  };
}
const searchAirport = async (body: {
  search_key: string;
}): Promise<IAirport[]> => {
  const url = "/flight/search-flight-airport";
  const { data } = await axiosInstance.post<ISearchAirportResponse>(
    url,
    generateRequestData(JSON.stringify(body))
  );
  if (data.main_data.res_code === 200) {
    return data.main_data.data;
  } else {
    return [];
  }
};
export default searchAirport;
