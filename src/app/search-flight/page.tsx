"use client";
import { Container, Wrapper } from "@/styles/styles";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popper,
  Select,
  Stack,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "@emotion/styled";
import TravellerPopper from "@/components/TravellerPopper";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMutation, useQuery } from "react-query";
import searchAirport, { IAirport } from "@/services/searchAirport";
import dayjs from "dayjs";
import searchFlight, { ISearchFlightBody } from "@/services/searchFlight";
import Alert from "@/utils/Alert";

const preferredClasses: string[] = [
  "Economy",
  "Premimum Economy",
  "Business",
  "First",
];
const SearchFlightPage = () => {
  const { mutate: searchFlightMutate, isLoading: searchFlightLoading } =
    useMutation(searchFlight);
  const [classType, setClassType] = useState(preferredClasses[0]);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [totalAdults, setTotalAdults] = useState(1);
  const [totalChilds, setTotalChilds] = useState(0);
  const [totalInfants, setTotalInfants] = useState(0);
  const addAdult = () => {
    setTotalAdults((prev) => prev + 1);
  };
  const removeAdult = () => {
    setTotalAdults((prev) => {
      const result = prev - 1;
      return result > 1 ? result : 1;
    });
  };
  const addChild = () => {
    setTotalChilds((prev) => prev + 1);
  };
  const removeChild = () => {
    setTotalChilds((prev) => {
      const result = prev - 1;
      return result > 0 ? result : 0;
    });
  };
  const addInfant = () => {
    setTotalInfants((prev) => prev + 1);
  };
  const removeInfant = () => {
    setTotalInfants((prev) => {
      const result = prev - 1;
      return result > 0 ? result : 0;
    });
  };

  const handleClickTravellerField = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const closeTravellerPopper = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const travellerPopperId = open ? "traveller-popper" : undefined;
  //fuctionality states
  const [selectedFlyingFromAirport, setSelectedFlyingFromAirport] =
    useState<IAirport>();
  const [flyingFromSearchKey, setFlyingFromSearchKey] = useState("");
  const handleFlyingFromSearchKey = debounce((newSearchKey: string) => {
    setFlyingFromSearchKey(newSearchKey);
  }, 500);
  const { data: rawFlyingFromAirports } = useQuery({
    queryKey: ["flyingFromSearchAirport", flyingFromSearchKey],
    queryFn: () => searchAirport({ search_key: flyingFromSearchKey }),
    enabled: Boolean(flyingFromSearchKey),
  });
  const flyingFromAirportList = rawFlyingFromAirports || [];
  const [selectedFlyingToAirport, setSelectedFlyingToAirport] =
    useState<IAirport>();
  const [flyingToSearchKey, setFlyingToSearchKey] = useState("");
  const handleFlyingToSearchKey = debounce((newSearchKey: string) => {
    setFlyingToSearchKey(newSearchKey);
  }, 500);
  const { data: rawFlyingToAirports } = useQuery({
    queryKey: ["flyingToSearchAirport", flyingToSearchKey],
    queryFn: () => searchAirport({ search_key: flyingToSearchKey }),
    enabled: Boolean(flyingToSearchKey),
  });
  const flyingToAirportList = rawFlyingToAirports || [];
  console.log("selectedFlyingFromAirport: ", selectedFlyingFromAirport);
  console.log("selectedFlyingToAirport: ", selectedFlyingToAirport);
  console.log("departureDate: ", departureDate);
  console.log("classType: ", classType);
  const handleSubmit = () => {
    if (!selectedFlyingFromAirport || !selectedFlyingToAirport) {
      Alert.error("Please fill all the fields before submit");
      return;
    }
    const searchFlightBody: ISearchFlightBody = {
      user_id: 0,
      from_airport: selectedFlyingFromAirport.iata,
      to_airport: selectedFlyingToAirport.iata,
      year: departureDate.getFullYear().toString(),
      month: (departureDate.getMonth() + 1).toString(),
      day: departureDate.getDate().toString(),
      adults: totalAdults.toString(),
      childs: totalChilds.toString(),
      infants: totalInfants.toString(),
      class_type: classType,
      max_result: 100,
      round_day: "",
      round_month: "",
      round_year: "",
      travel_type: "oneway",
    };
    searchFlightMutate(searchFlightBody);
  };
  return (
    <Wrapper>
      <Container>
        <Stack direction="column" gap={3}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={3}>
              <InputLabel htmlFor="flying-from">Flying From</InputLabel>
              <Autocomplete
                filterOptions={(x) => x}
                disablePortal
                id="flying-from"
                options={flyingFromAirportList}
                getOptionLabel={(option) => option.airport_name}
                // sx={{ width: 300 }}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
                onInputChange={(event, newValue) => {
                  handleFlyingFromSearchKey(newValue);
                }}
                onChange={(event, newAirport) => {
                  setSelectedFlyingFromAirport(newAirport);
                }}
                disableClearable
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SyncAltIcon />
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="flying-to">Flying To</InputLabel>
              <Autocomplete
                filterOptions={(x) => x}
                disablePortal
                id="flying-to"
                options={flyingToAirportList}
                getOptionLabel={(option) => option.airport_name}
                onInputChange={(event, newValue) => {
                  handleFlyingToSearchKey(newValue);
                }}
                onChange={(event, newAirPort) => {
                  newAirPort && setSelectedFlyingToAirport(newAirPort);
                }}
                // sx={{ width: 300 }}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
                disableClearable
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="departure-date">Departure Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  value={dayjs(departureDate)}
                  onChange={(newDate) => {
                    if (newDate) {
                      setDepartureDate(newDate.toDate());
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container justifyContent="start" spacing={2}>
            <Grid item xs={4}>
              <InputLabel htmlFor="travellers">Traveller(s)</InputLabel>
              <OutlinedInput
                value={`${totalAdults} Adult${
                  totalAdults > 1 ? "s" : ""
                },${totalChilds} Child${
                  totalChilds > 1 ? "s" : ""
                }, ${totalInfants} Infant${totalInfants > 1 ? "s" : ""}`}
                fullWidth
                id="travellers"
                onClick={handleClickTravellerField}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {open && (
                <ClickAwayListener onClickAway={closeTravellerPopper}>
                  <Popper
                    id={travellerPopperId}
                    open={open}
                    anchorEl={anchorEl}
                  >
                    <TravellerPopper
                      onDone={closeTravellerPopper}
                      totalAdults={totalAdults}
                      totalChilds={totalChilds}
                      totalInfants={totalInfants}
                      onAdultIncrement={addAdult}
                      onAdultDecrement={removeAdult}
                      onChildIncrement={addChild}
                      onChildDecrement={removeChild}
                      onInfantIncrement={addInfant}
                      onInfantDecrement={removeInfant}
                    />
                  </Popper>
                </ClickAwayListener>
              )}
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="class">Preferred Class</InputLabel>
              <Select
                labelId="class"
                id="class"
                value={classType}
                fullWidth
                // onChange={handleChange}
              >
                {preferredClasses.map((classValue) => {
                  return (
                    <MenuItem
                      key={classValue}
                      value={classValue}
                      onClick={() => setClassType(classValue)}
                    >
                      {classValue}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" onClick={handleSubmit}>
            <Button variant="contained" disabled={searchFlightLoading}>
              <Stack direction="row" alignItems="center" gap={1}>
                {searchFlightLoading && (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                )}
                Submit
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default () => (
  <ProtectedRoute>
    <SearchFlightPage />
  </ProtectedRoute>
);
