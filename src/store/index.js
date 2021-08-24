import {configureStore} from "@reduxjs/toolkit";
import branchesSlice from "./branch-slice";
import uiSlice from "./ui-slice";
import authSlice from "./auth-slice";
import ticketsSlice from "./tickets-slice";

const store = configureStore({
    reducer: {branches: branchesSlice.reducer, ui: uiSlice.reducer, auth: authSlice.reducer, tickets: ticketsSlice.reducer}
});

export default store;