import AuthTokenData from "@/utils/AuthTokenData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token?: string;
  isInitilized: boolean;
}
const initialState: AuthState = {
  token: undefined,
  isInitilized: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      AuthTokenData.set(action.payload.token);
      state.isInitilized = true;
    },
    logout: (state) => {
      state.token = undefined;
      AuthTokenData.remove();
      state.isInitilized = true;
    },
  },
});
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const authSelectors = {
  isAuthenticated: (state: { auth: AuthState }) => {
    return Boolean(state.auth.token);
  },
  isInitilized: (state: { auth: AuthState }) => {
    return Boolean(state.auth.isInitilized);
  },
};
export default authSlice;
