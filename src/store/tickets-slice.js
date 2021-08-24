import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ticketList: []
};

const ticketsSlice = createSlice({
        name: 'tickets',
        initialState,
        reducers: {
            setTickets(state, action) {
                state.ticketList = action.payload.ticketList;
            },
        }
    }
)


export const ticketsActions = ticketsSlice.actions;
export default ticketsSlice;