import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    center: {
        lat: 41.019855715441714,
        lng: 28.890222682206254
    },
    userLocation: {
        lat: 41.019855715441714,
        lng: 28.890222682206254
    },
    locationType: "device",
    distance: 10000,
    density: 100
}

const uiSlice = createSlice({
        name: 'ui',
        initialState,
        reducers: {
            setCenter(state, action) {
                state.center = {
                    lat: action.payload.lat,
                    lng: action.payload.lng
                };
            },
            setUserLocation(state, action) {
                state.userLocation = {
                    lat: action.payload.lat,
                    lng: action.payload.lng
                };
            },
            setLocationType(state, action) {
                state.locationType = action.payload;
            },
            setDistance(state, action) {
                state.distance = action.payload;
            },
            setDensity(state, action) {
                state.density = action.payload;
            },
            showNotification(state, action) {
                state.notification = {
                    status: action.payload.status,
                    title: action.payload.title,
                    message: action.payload.message
                }
            },
            clearNotification(state) {
                state.notification = null;
            }

        }
    }
)


export const uiActions = uiSlice.actions;
export default uiSlice;