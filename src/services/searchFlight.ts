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
export interface IFilghtPlan {
  airLineIata: string;
  airLineName: string;
  flightNumber: number;
  departureDate: Date;
  arrivalTimeOfDay: { hour: number; minute: number };
  departureTimeOfDay: { hour: number; minute: number };
  departureIata: string;
  destinationIata: string;
  flyingTimeInMinutes: number;
  bookingClassCode: string;
  cabinClass: string;
}
export interface IFlight {
  id: string;
  plans: IFilghtPlan[];
  priceSymbol: string;
  totalPrice: number;
  totalTax: number;
  airlineIata: string;
  flyingTimeInMinutes: number;
}
export interface ISearchFlightResponse {
  main_data: {
    res_code: number;
    response: string;
    data: {
      userPrefferedCurrencySymbol: string;
      flightSearchList: {
        availableFareList: {
          fareId: string;
          validatingAirline: { iata: string };
          passengerTypeFareList: {
            priceList: {
              value: number;
              type: "TOTAL_TAX" | "AGENCY_PURCHASE_PRICE" | "AGENCY_MARGIN";
            }[];
          }[];
          legList: {
            itineraryList: {
              flyingTimeInMinutes: number;
              segmentList: {
                arrivalTimeOfDay: { hour: number; minute: number };
                bookingClassCode: string;
                cabinClass: string;
                departure: { iata: string };
                departureDate: { year: number; month: number; day: number };
                departureTimeOfDay: { hour: number; minute: number };
                destination: { iata: string };
                flightNumber: number;
                operatingAirline: { iata: string; name: string };
                segment_time: number;
              }[];
            }[];
          }[];
        }[];
      };
    };
  };
}
const searchFlight = async (body: ISearchFlightBody): Promise<IFlight[]> => {
  const url = "/flight/new-flight-search";
  const { data } = await axiosInstance.post<ISearchFlightResponse>(
    url,
    generateRequestData(JSON.stringify(body))
  );
  //   console.log("flightList:main data", data.main_data.data);
  if (data.main_data.res_code === 200) {
    const flights: IFlight[] =
      data.main_data.data.flightSearchList.availableFareList.map((fare) => {
        const priceOfTax = fare.passengerTypeFareList[0].priceList.find(
          (price) => price.type === "TOTAL_TAX"
        );
        // console.log("flightList: fare ", fare);
        const segments = fare.legList[0].itineraryList[0].segmentList;
        return {
          priceSymbol: data.main_data.data.userPrefferedCurrencySymbol,
          airlineIata: fare.validatingAirline.iata,
          id: fare.fareId,
          flyingTimeInMinutes:
            fare.legList[0].itineraryList[0].flyingTimeInMinutes,
          totalPrice: fare.passengerTypeFareList[0].priceList.reduce(
            (prev, next) => prev + next.value,
            0
          ),
          totalTax: priceOfTax ? priceOfTax.value : 0,
          //   plans: [],
          plans: segments.map((segment) => {
            const flightPlan: IFilghtPlan = {
              airLineIata: segment.operatingAirline.iata,
              airLineName: segment.operatingAirline.name,
              arrivalTimeOfDay: segment.arrivalTimeOfDay,
              bookingClassCode: segment.bookingClassCode,
              cabinClass: segment.cabinClass,
              flightNumber: segment.flightNumber,
              flyingTimeInMinutes: segment.segment_time,
              departureTimeOfDay: segment.departureTimeOfDay,
              departureIata: segment.departure.iata,
              destinationIata: segment.destination.iata,
              departureDate: new Date(
                segment.departureDate.year,
                segment.departureDate.month - 1,
                segment.departureDate.day
              ),
            };
            return flightPlan;
          }),
        };
      });
    // console.log("flightList:2 ", flights);
    return flights;
  } else {
    throw new Error("Search Flight Failed");
  }
};
export default searchFlight;
