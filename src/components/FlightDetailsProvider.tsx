"use client";
import { IAirport } from "@/services/searchAirport";
import { IFlight, ISearchFlightBody } from "@/services/searchFlight";
import React, { FC, useState } from "react";
export interface SearchFlightData {
  flyingFromAirport: IAirport;
  flyingToAirport: IAirport;
  departureDate: Date;
}
export interface FlightDetailsContextType {
  searchFlightData?: SearchFlightData;
  totalCartValue: number;
  bookNewFlight: () => void;
  addSearchFlightData: (data: SearchFlightData) => void;
  flightList: IFlight[];
  addFlightList: (list: IFlight[]) => void;
}
export const FlightDetailsContext = React.createContext(
  {} as FlightDetailsContextType
);
interface Props {
  children: React.ReactNode;
}
const FlightDetailsProvider: FC<Props> = ({ children }) => {
  const [flightList, setFlightList] = useState<IFlight[]>([]);
  const addFlightList = (list: IFlight[]) => {
    setFlightList(list);
  };
  const [searchFlightData, setSearchFlightData] = useState<SearchFlightData>();
  const addSearchFlightData = (data: SearchFlightData) => {
    setSearchFlightData(data);
  };
  const [totalCartValue, setTotalCartValue] = useState(0);
  const bookNewFlight = () => {
    setTotalCartValue((prev) => prev + 1);
  };
  return (
    <FlightDetailsContext.Provider
      value={{
        totalCartValue,
        bookNewFlight,
        searchFlightData,
        addSearchFlightData,
        flightList,
        addFlightList,
      }}
    >
      {children}
    </FlightDetailsContext.Provider>
  );
};

export default FlightDetailsProvider;
