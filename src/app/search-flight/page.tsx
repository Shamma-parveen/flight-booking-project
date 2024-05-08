"use client";
import { Container, Wrapper } from "@/styles/styles";
import {
  Autocomplete,
  Box,
  Button,
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
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styled from "@emotion/styled";
import TravellerPopper from "@/components/TravellerPopper";
import ProtectedRoute from "@/components/ProtectedRoute";

const preferredClasses: string[] = [
  "Economy",
  "Premimum Economy",
  "Business",
  "First",
];
const SearchFlightPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickTravellerField = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const closeTravellerPopper = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const travellerPopperId = open ? "traveller-popper" : undefined;
  return (
    <Wrapper>
      <Container>
        <Stack direction="column" gap={3}>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item xs={3}>
              <InputLabel htmlFor="flying-from">Flying From</InputLabel>
              <Autocomplete
                disablePortal
                id="flying-from"
                options={[]}
                // sx={{ width: 300 }}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
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
                disablePortal
                id="flying-to"
                options={[]}
                // sx={{ width: 300 }}
                fullWidth
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel htmlFor="departure-date">Departure Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container justifyContent="start" spacing={2}>
            <Grid item xs={4}>
              <InputLabel htmlFor="travellers">Traveller(s)</InputLabel>
              <OutlinedInput
                value=""
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
                    <TravellerPopper onDone={closeTravellerPopper} />
                  </Popper>
                </ClickAwayListener>
              )}
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="class">Preferred Class</InputLabel>
              <Select
                labelId="class"
                id="class"
                value={"Economy"}
                fullWidth
                // onChange={handleChange}
              >
                {preferredClasses.map((classValue) => {
                  return (
                    <MenuItem key={classValue} value={classValue}>
                      {classValue}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center">
            <Button variant="contained">Submit</Button>
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
