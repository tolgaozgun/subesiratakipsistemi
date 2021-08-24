import classes from "./MapPage.module.css";
import MapView from "../components/Map/MapView";
import Marker from "../components/Map/Marker";
import React from "react";
import logo from "../assets/logo.png";
import NormalButton from "../components/UI/Form/NormalButton";
import {Slider, Typography} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import {createTheme} from '@material-ui/core/styles';
import BranchList from "../components/BranchList";
import {useHistory} from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {uiActions} from "../store/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth-slice";
import {distanceCalculator} from "../store/distance-calculator";
import MiniButton from "../components/UI/Form/MiniButton";


function densityText(value) {
    return `${value} dk`;
}

function distanceText(value) {
    return `${value}0 m`;
}

const MapPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const theme = createTheme({
        palette: {
            primary: {
                light: '#D90718',
                main: '#D90718',
                dark: '#A60512',
                contrastText: '#F2F2F2',
            },
        },
    });

    const name = useSelector(state => state.auth.name);
    const center = useSelector(state => state.ui.center);
    const branches = useSelector(state => state.branches.branchList);
    const locationType = useSelector(state => state.ui.locationType);
    const userLocation = useSelector(state => state.ui.userLocation);
    const distance = useSelector(state => state.ui.distance);
    const density = useSelector(state => state.ui.density);

    const logoutHandler = () => {
        dispatch(authActions.logout());
        history.push("/giris");
    }
    const handleDensityChange = (event, newValue) => {
        dispatch(uiActions.setDensity(newValue));
    };
    const handleDistanceChange = (event, newValue) => {
        dispatch(uiActions.setDistance(newValue * 100));
    }

    const markerClickHandler = (event, marker) => {

    }

    const handleLocationChange = (event, newType) => {
        if (newType != null) {
            if (newType === "device") {
                dispatch(uiActions.setCenter(userLocation));
            }
            dispatch(uiActions.setLocationType(newType));
        }
    }

    const myTicketsHandler = () => {
        history.push("/siralarim");
    }

    const availableBranches = branches.filter(branch => {
        return (distanceCalculator(branch, center, locationType, userLocation) <= distance) && ((branch.density / 60) <= density);
    }).map(branch => {
            return {...branch, distance: distanceCalculator(branch, center, locationType, userLocation)}
        }
    );


    return (
        <ThemeProvider theme={theme}>
            <div className={classes["left-bar"]}>
                <img className={classes.logo} src={logo} alt="logo"/>
                <div className={classes.username}><span>Merhaba, {name}</span></div>
                <NormalButton onClick={logoutHandler} text="Çıkış Yap" className={classes["logout-button"]}/>
                <div className={classes.density}>
                    <Typography
                        className={classes["slider-label"]}
                        id="density-slider" gutterBottom>
                        Maks. Yoğunluk
                    </Typography>
                    <div className={classes.slider}>
                        <Slider
                            value={density}
                            onChange={handleDensityChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="density-slider"
                            getAriaValueText={densityText}
                        />
                    </div>
                    <span className={classes["slider-value"]}>{density} dk</span>
                </div>
                <div className={classes.distance}>
                    <Typography
                        className={classes["slider-label"]}
                        id="distance-slider" gutterBottom>
                        Maks. Mesafe
                    </Typography>
                    <div className={classes.slider}>
                        <Slider
                            value={distance / 100}
                            onChange={handleDistanceChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="distance-slider"
                            getAriaValueText={distanceText}
                        />
                    </div>
                    <span className={classes["slider-value"]}>{distance} m</span>
                </div>
                <MiniButton text="Sıralarım" className={classes["my-tickets"]} onClick={myTicketsHandler} />
                <ToggleButtonGroup
                    className={classes["btn-toggle-group"]}
                    value={locationType}
                    exclusive
                    onChange={handleLocationChange}
                    aria-label="Merkez Konum">
                    <ToggleButton className={classes["btn-toggle"]} value="device" aria-label="device">
                        <p>Cihazımın Konumu</p>
                    </ToggleButton>
                    <ToggleButton className={classes["btn-toggle"]} value="map" aria-label="map">
                        <p>Harita Konumu</p>
                    </ToggleButton>
                </ToggleButtonGroup>
                <div className={classes.branches}>
                    <span className={classes.title}>Şubeler</span>
                    <BranchList branches={availableBranches} className={classes.list}/>
                </div>
            </div>
            <div className={classes.map}>
                <MapView center={{
                    lat: 41.019855715441714,
                    lng: 28.890222682206254
                }} zoom={13} distance={distance}>
                    {availableBranches.map(branch => {
                        return (
                            <Marker
                                key={branch.code}
                                lat={branch.coordinateX}
                                lng={branch.coordinateY}
                                onClick={markerClickHandler}
                            />)
                    })}
                </MapView>
            </div>

        </ThemeProvider>);
}


export default MapPage;