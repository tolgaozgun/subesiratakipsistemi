import Layout from "../components/Layout/Layout";
import classes from "./ConfirmTicketPage.module.css"
import Branch from "../components/Branch";
import {useHistory, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import MiniButton from "../components/UI/Form/MiniButton";
import BigButton from "../components/UI/Form/BigButton";

const ConfirmTicketPage = () => {
    const history = useHistory();
//    const [values, setValues] = useState("");
//    const [error, setError] = useState(null);
    const error = null;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const branchId = queryParams.get("sube");
    const branches = useSelector(state => state.branches.branchList);
    const branch = branches.filter(item => {
            return item.code === +branchId
        }
    )["0"];

    const navigationHandler = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${branch.coordinateX},${branch.coordinateY}`, '_blank', 'noopener,noreferrer')
    }

    const backHandler = () => {
        // history.goBack();
        history.push("/harita");
    }

    if (!branch) {
        return (
            <Layout>
                <div className={classes.main}>
                    <p>Şube Bulunamadı</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={classes.main}>
                <Branch buttons={0} className={classes.branch} item={branch}/>
                {error && <p className={classes.error}>{error.message}</p>}
                <MiniButton className={classes.navigation} text="YOL TARİFİ" onClick={navigationHandler}/>
                <BigButton className={classes.back} text="Ana Sayfa" onClick={backHandler}/>
            </div>
        </Layout>
    );
}

export default ConfirmTicketPage;