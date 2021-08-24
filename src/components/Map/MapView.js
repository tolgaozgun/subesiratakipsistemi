import GoogleMapReact from "google-map-react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "../../store/ui-slice";

let circle;

const MapView = props => {
    const center = useSelector(state => state.ui.center);
    const userLocation = useSelector(state => state.ui.userLocation);
    const dispatch = useDispatch();


    let distance = props.distance;
    useEffect((state) => {
        if (circle) {
            let distance = props.distance;
            circle.setRadius(distance);
        }

    }, [props.distance])


    const moveHandler = (current) => {
        if (circle) {
            circle.setCenter(current);
        }
        dispatch(uiActions.setCenter({
            lng: current.lng,
            lat: current.lat
        }));
        if (userLocation === center) {
            dispatch(uiActions.setLocationType("device"));
        } else {
            dispatch(uiActions.setLocationType("map"));
        }
    }

    return (
        <div style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact
                pURLKeys={{key: "AIzaSyAy3JKa-RqweCl-jYaghBFQk0X20dlkgOI"}}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
                center={center}
                yesIWantToUseGoogleMapApiInternals={true}
                onBoundsChange={moveHandler}
                onGoogleApiLoaded={({map, maps}) => {
                    circle = new maps.Circle({
                        strokeColor: '#47ff00',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#47ff00',
                        fillOpacity: 0.3,
                        map,
                        center: props.center,
                        radius: distance,
                    });
                }}
            >
                {props.children}
            </GoogleMapReact>
        </div>
    );
}

export default MapView;
