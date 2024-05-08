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
import React from "react";
import styled from "@emotion/styled";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FlightIcon from "@mui/icons-material/Flight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ProtectedRoute from "@/components/ProtectedRoute";
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
  max-width: 850px;
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
const BookingAccordion = () => {
  return (
    <Accordion>
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
                    $ 81.91
                  </Typography>
                  <Typography variant="caption" fontSize={"11px"}>
                    incl $ 13.68 Tax
                  </Typography>
                </Stack>
              </Stack>
              <Divider orientation="vertical" />
              <Typography fontWeight="bold">UK</Typography>
              <Stack direction="column" gap={1}>
                <Typography fontWeight="bold" fontSize="13px">
                  Duration
                </Typography>
                <Typography variant="caption" fontSize={"11px"}>
                  2 hours 10 min
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
            <KeyboardArrowUpIcon htmlColor="white" />
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ padding: "20px 0px" }}
              >
                <Stack direction="column">
                  <Typography fontWeight="bold" fontSize="14px">
                    UK 708 Wed 8th May
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "gray", fontSize: "12px" }}
                  >
                    Vistara
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography fontWeight="bold" fontSize="14px">
                    CCU - DEL
                  </Typography>
                  <Typography fontWeight="bold" fontSize="14px">
                    20:30 - 22:40
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography fontWeight="bold" fontSize="14px">
                    2 hours 10 mins
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography fontWeight="bold" fontSize="14px">
                    V/ECONOMY
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography
                    variant="caption"
                    fontSize="12px"
                    sx={{ maxWidth: "100px" }}
                  >
                    Total time travel 2 hours 10 mins
                  </Typography>
                </Stack>
                <Divider orientation="vertical" />
                <Radio />
              </Stack>
              <Divider />
            </Stack>
            <Stack direction="column" gap={1}>
              <Stack direction="row" justifyContent="center">
                <Button variant="contained" sx={{ minWidth: "250px" }}>
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
            airportName="Netaji Subhash Chandra Bose International Airport (CCU), India"
            title="From Station"
            date={new Date()}
          />
          <TrendingFlatIcon />
          <AirportDetailView
            airportName="Netaji Subhash Chandra Bose International Airport (CCU), India"
            title="To Station"
            date={new Date()}
          />
        </Stack>
        <BookingAccordion />
        <BookingAccordion />
        <BookingAccordion />
      </Stack>
    </Container>
  );
};
export default () => (
  <ProtectedRoute>
    <FlightlistPage />
  </ProtectedRoute>
);
