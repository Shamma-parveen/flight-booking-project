import styled from "@emotion/styled";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
const Container = styled(Box)`
  margin-top: 10px;
  width: 300px;
  border: 1px solid #ddd;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
interface CounterProps {
  count: number;
  title: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}
const TravellerCounter: React.FC<CounterProps> = ({
  count,
  title,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography>{title}</Typography>
      <Stack direction="row" alignItems="center" gap={2}>
        <Button variant="contained" size="small" onClick={onDecrement}>
          -
        </Button>
        <Typography>{count}</Typography>
        <Button variant="contained" size="small" onClick={onIncrement}>
          +
        </Button>
      </Stack>
    </Stack>
  );
};
interface Props {
  onDone?: () => void;
  totalAdults: number;
  totalChilds: number;
  totalInfants: number;
  onAdultIncrement?: () => void;
  onAdultDecrement?: () => void;
  onChildIncrement?: () => void;
  onChildDecrement?: () => void;
  onInfantIncrement?: () => void;
  onInfantDecrement?: () => void;
}
const TravellerPopper: React.FC<Props> = ({
  onDone,
  totalAdults,
  totalChilds,
  totalInfants,
  onAdultIncrement,
  onAdultDecrement,
  onChildDecrement,
  onChildIncrement,
  onInfantDecrement,
  onInfantIncrement,
}) => {
  return (
    <Container>
      <Typography fontWeight="bold">Travellers</Typography>
      <TravellerCounter
        title="Adults"
        count={totalAdults}
        onIncrement={onAdultIncrement}
        onDecrement={onAdultDecrement}
      />
      <Divider />
      <TravellerCounter
        title="Children(3-12yrs)"
        count={totalChilds}
        onIncrement={onChildIncrement}
        onDecrement={onChildDecrement}
      />
      <Divider />
      <TravellerCounter
        title="Infant(0-2yrs)"
        count={totalInfants}
        onIncrement={onInfantIncrement}
        onDecrement={onInfantDecrement}
      />
      <Divider />
      <Button fullWidth variant="contained" onClick={onDone}>
        Done
      </Button>
    </Container>
  );
};

export default TravellerPopper;
