"use client";
import {
  AccordionProps,
  AccordionSummaryProps,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  Link,
  Radio,
  Stack,
  Typography,
  styled as muiStyled,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FlightIcon from "@mui/icons-material/Flight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FlightDetailsContext } from "@/components/FlightDetailsProvider";
import { useRouter } from "next/navigation";
import RoutePaths from "@/config/routePaths";
import { IFlight } from "@/services/searchFlight";
import formatFlyingTime from "@/utils/formatFlyingTime";
const Accordion = muiStyled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = muiStyled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  padding: 0,
  width: "100%",
  borderRadius: "4px 4px 0px 0px",
  overflow: "hidden",
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  // flexDirection: "row-reverse",
  // "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
  //   transform: "rotate(90deg)",
  // },
  "& .MuiAccordionSummary-content": {
    width: "100%",
    margin: 0,
  },
}));

const AccordionDetails = muiStyled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  margin: 0,
  // padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const Container = styled(Box)`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  max-width: 1000px;
  margin: auto;
`;
interface AirportDetailsProps {
  title: string;
  airportName: string;
  date: Date;
}
const AirportDetailView: React.FC<AirportDetailsProps> = ({
  airportName,
  date,
  title,
}) => {
  return (
    <Stack direction="row" justifyContent="start" gap={2}>
      <LocationOnIcon color="primary" />
      <Stack direction="column" gap={"4px"}>
        <Typography
          sx={{ color: "gray", fontWeight: "bold", fontSize: "14px" }}
        >
          {title}
        </Typography>
        <Typography maxWidth="300px" fontWeight="bold">
          {airportName}
        </Typography>
        <Typography variant="caption" fontSize="14px" fontWeight="500">
          {date.toDateString()}
        </Typography>
      </Stack>
    </Stack>
  );
};
const AccordionSummaryContainer = styled(Box)`
  width: 100%;
  display: flex;
`;
const AccordionSummaryHeaderDetailsContainer = styled(Box)`
  padding: 20px;
  flex: 1;
  background-color: rgb(25, 118, 210);
  color: white;
`;
const AccordionSummaryHeaderArrowContainer = styled(Box)`
  padding: 20px;
  background-color: rgb(19, 91, 164);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AccordionDetailsContainer = styled(Box)`
  padding: 10px 20px;
`;
interface BookingAccordionProps {
  onBook?: () => void;
  flight: IFlight;
  isExpanded?: boolean;
  onClick?: () => void;
}
const BookingAccordion: FC<BookingAccordionProps> = ({
  onBook,
  flight,
  isExpanded,
  onClick,
}) => {
  return (
    <Accordion onClick={onClick} expanded={isExpanded}>
      <AccordionSummary>
        <AccordionSummaryContainer>
          <AccordionSummaryHeaderDetailsContainer>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" gap={1} alignItems="center">
                <Avatar sx={{ backgroundColor: "white" }}>
                  <FlightIcon color="primary" />
                </Avatar>
                <Stack direction="column">
                  <Typography fontWeight="bold" fontSize="13px">
                    {flight.priceSymbol} {flight.totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" fontSize={"11px"}>
                    incl {flight.priceSymbol} {flight.totalTax.toFixed(2)} Tax
                  </Typography>
                </Stack>
              </Stack>
              <Divider orientation="vertical" />
              <Typography fontWeight="bold">{flight.airlineIata}</Typography>
              <Stack direction="column" gap={1}>
                <Typography fontWeight="bold" fontSize="13px">
                  Duration
                </Typography>
                <Typography variant="caption" fontSize={"11px"}>
                  {formatFlyingTime(flight.flyingTimeInMinutes)}
                </Typography>
              </Stack>
              <Stack direction="column" gap={1}>
                <Typography fontWeight="bold" fontSize="13px">
                  Stops
                </Typography>
                <Typography variant="caption" fontSize={"11px"}>
                  0
                </Typography>
              </Stack>
              <Stack direction="column" gap={1}>
                <Typography fontWeight="bold" fontSize="13px">
                  Information
                </Typography>
                <Stack direction="row" gap={"4px"}>
                  <Avatar
                    sx={{ backgroundColor: "white", width: 24, height: 24 }}
                  >
                    <InfoOutlinedIcon color="primary" />
                  </Avatar>
                  <Avatar
                    sx={{ backgroundColor: "white", width: 24, height: 24 }}
                  >
                    <WatchOutlinedIcon color="primary" />
                  </Avatar>
                  <Avatar
                    sx={{ backgroundColor: "white", width: 24, height: 24 }}
                  >
                    <VolunteerActivismOutlinedIcon color="primary" />
                  </Avatar>
                  <Avatar
                    sx={{ backgroundColor: "white", width: 24, height: 24 }}
                  >
                    <LocalAtmOutlinedIcon color="primary" />
                  </Avatar>
                </Stack>
              </Stack>
            </Stack>
            {/* <Divider orientation="vertical" /> */}
          </AccordionSummaryHeaderDetailsContainer>
          <AccordionSummaryHeaderArrowContainer>
            <KeyboardArrowDownIcon
              htmlColor="white"
              sx={{
                transform: `rotate(${isExpanded ? 180 : 0}deg)`,
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </AccordionSummaryHeaderArrowContainer>
        </AccordionSummaryContainer>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionDetailsContainer>
          <Stack
            direction="column"
            gap={1}
            justifyContent="space-between"
            sx={{ minHeight: "300px" }}
          >
            <Stack direction="column" gap={1}>
              <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                Choose Your Preferred Plan
              </Typography>
              <Divider />
              {flight.plans.map((plan) => {
                return (
                  <>
                    <Stack
                      key={plan.flightNumber.toString()}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ padding: "20px 0px" }}
                    >
                      <Stack direction="column">
                        <Typography fontWeight="bold" fontSize="14px">
                          {plan.airLineIata} {plan.flightNumber}{" "}
                          {plan.departureDate.toDateString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "gray", fontSize: "12px" }}
                        >
                          {plan.airLineName}
                        </Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography fontWeight="bold" fontSize="14px">
                          {plan.departureIata} - {plan.destinationIata}
                        </Typography>
                        <Typography fontWeight="bold" fontSize="14px">
                          {plan.departureTimeOfDay.hour}:
                          {plan.departureTimeOfDay.minute} -{" "}
                          {plan.arrivalTimeOfDay.hour}:
                          {plan.arrivalTimeOfDay.minute}
                        </Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography fontWeight="bold" fontSize="14px">
                          {formatFlyingTime(plan.flyingTimeInMinutes)}
                        </Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography fontWeight="bold" fontSize="14px">
                          {plan.bookingClassCode}/{plan.cabinClass}
                        </Typography>
                      </Stack>
                      <Stack direction="column">
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          sx={{ maxWidth: "100px" }}
                        >
                          Total time travel
                        </Typography>
                        <Typography
                          variant="caption"
                          fontSize="12px"
                          sx={{ maxWidth: "100px" }}
                        >
                          {formatFlyingTime(plan.flyingTimeInMinutes)}
                        </Typography>
                      </Stack>
                      <Divider orientation="vertical" />
                      <Radio />
                    </Stack>
                    <Divider />
                  </>
                );
              })}
            </Stack>
            <Stack direction="column" gap={1}>
              <Stack direction="row" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ minWidth: "250px" }}
                  onClick={onBook}
                >
                  Book Now
                </Button>
              </Stack>
              <Stack direction="row" justifyContent="center" gap={2}>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "underline" }}
                >
                  Upsell
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "underline" }}
                >
                  Rules
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetailsContainer>
      </AccordionDetails>
    </Accordion>
  );
};
const FlightlistPage = () => {
  const [selectedFlightId, setSelectedFlightId] = useState("");
  const handleSelectFlightId = (flightId: string) => {
    setSelectedFlightId((prevId) => {
      if (prevId === flightId) {
        return "";
      } else {
        return flightId;
      }
    });
  };
  const { bookNewFlight, flightList } = useContext(FlightDetailsContext);
  const router = useRouter();
  const { searchFlightData } = useContext(FlightDetailsContext);
  useEffect(() => {
    if (!searchFlightData) {
      router.replace(RoutePaths.searchFlight());
    }
  }, [searchFlightData]);
  if (!searchFlightData) {
    return <div>Loading..</div>;
  }
  return (
    <Container>
      <Stack direction="column" gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Typography fontWeight="bold">Flights</Typography>
            <Typography variant="caption">
              Select an option from the suggestions
            </Typography>
          </Stack>
          <Box>
            <FilterAltIcon color="primary" />
          </Box>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <AirportDetailView
            airportName={searchFlightData.flyingFromAirport.short_name}
            title="From Station"
            date={searchFlightData.departureDate}
          />
          <TrendingFlatIcon />
          <AirportDetailView
            airportName={searchFlightData.flyingToAirport.short_name}
            title="To Station"
            date={searchFlightData.departureDate}
          />
        </Stack>
        {flightList.length > 0 ? (
          flightList.map((flight) => (
            <BookingAccordion
              key={flight.id}
              flight={flight}
              onBook={bookNewFlight}
              isExpanded={flight.id === selectedFlightId}
              onClick={() => handleSelectFlightId(flight.id)}
            />
          ))
        ) : (
          <Typography textAlign="center">No Flights Available</Typography>
        )}
      </Stack>
    </Container>
  );
};
export default () => (
  <ProtectedRoute>
    <FlightlistPage />
  </ProtectedRoute>
);
