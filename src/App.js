import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import NewTicketPage from "./pages/NewTicketPage";
import BranchPage from "./pages/BranchPage";
import NotFoundPage from "./pages/NotFoundPage";
import ConfirmTicketPage from "./pages/ConfirmTicketPage";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "./store/ui-slice";
import MyTicketsPage from "./pages/MyTicketsPage";
import Notification from "./components/UI/Notification";
import {Fragment, useEffect} from "react";
import RegisterPage from "./pages/RegisterPage";
import {authActions} from "./store/auth-slice";
import {fetchBranchData} from "./store/branch-actions";


function App() {
    const dispatch = useDispatch();
    // const authType = useSelector(state => state.auth.authType)
    const authToken = useSelector(state => state.auth.token);
    const authType = useSelector(state => state.auth.authType);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(uiActions.setUserLocation({
                lng: position.coords.longitude,
                lat: position.coords.latitude
            }))
        });
    }

    useEffect(() => {
        dispatch(authActions.checkSession());
        dispatch(fetchBranchData());
    }, [dispatch]);

    let pages = "";

    if (authToken && authToken.trim().length > 0) {
        if(authType === "BRANCH"){
            pages =
                <Switch>
                    <Route path="/sube">
                        <BranchPage/>
                    </Route>
                    <Route path="/onay">
                        <ConfirmTicketPage/>
                    </Route>
                    <Route path="/" exact>
                        <Redirect to="/sube"/>
                    </Route>
                    <Route path="/giris">
                        <Redirect to="/sube"/>
                    </Route>
                    <Route path="/kaydol">
                        <Redirect to="/sube"/>
                    </Route>
                    <Route path="/harita">
                        <Redirect to="/sube"/>
                    </Route>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
        }else{
            pages =
                <Switch>
                    <Route path="/harita">
                        <MapPage/>
                    </Route>
                    <Route path="/sira">
                        <NewTicketPage/>
                    </Route>
                    <Route path="/siralarim">
                        <MyTicketsPage/>
                    </Route>
                    <Route path="/" exact>
                        <Redirect to="/harita"/>
                    </Route>
                    <Route path="/giris">
                        <Redirect to="/harita"/>
                    </Route>
                    <Route path="/kaydol">
                        <Redirect to="/harita"/>
                    </Route>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>

        }
    } else {
        pages =
            <Switch>
                <Route path="/giris">
                    <LoginPage/>
                </Route>
                <Route path="/" exact>
                    <Redirect to="/giris"/>
                </Route>
                <Route path="/kaydol">
                    <RegisterPage/>
                </Route>
                <Route path="*">
                    <NotFoundPage/>
                </Route>
            </Switch>
    }

    /*if (authType === "BRANCH") {
        authenticatedPages =
            <Fragment>
                <Route path="/sube">
                    <BranchPage/>
                </Route>
            </Fragment>
    }

    if (authType === "USER") {
        authenticatedPages =
            <Fragment>
                <Route path="/harita">
                    <MapPage/>
                </Route>
                <Route path="/sira">
                    <NewTicketPage/>
                </Route>
                <Route path="/siralarim">
                    <MyTicketsPage/>
                </Route>
                <Route path="/onay">
                    <ConfirmTicketPage/>
                </Route>
            </Fragment>
    }*/


    return (
        <Fragment>
            <Notification/>
            {pages}
        </Fragment>
    )
}

export default App;
