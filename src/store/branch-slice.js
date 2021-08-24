import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    branchList: []
};

const branchesSlice = createSlice({
        name: 'branches',
        initialState,
        reducers: {
            setBranches(state, action) {
                state.branchList = action.payload.branchList;
            },
        }
    }
)


export const branchesActions = branchesSlice.actions;
export default branchesSlice;