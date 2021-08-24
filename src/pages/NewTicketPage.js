import Layout from "../components/Layout/Layout";
import classes from "./NewTicketPage.module.css"
import Branch from "../components/Branch";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MiniButton from "../components/UI/Form/MiniButton";
import Select from "react-select";
import BigButton from "../components/UI/Form/BigButton";
import {useState} from "react";
import {sendTicketData} from "../store/auth-actions";
import {distanceCalculator} from "../store/distance-calculator";

const NewTicketPage = (props) => {
    const history = useHistory();
    const [values, setValues] = useState("");
    const [error, setError] = useState(null);
    const center = useSelector(state => state.ui.center);
    const locationType = useSelector(state => state.ui.locationType);
    const userLocation = useSelector(state => state.ui.userLocation);
    const email = useSelector(state => state.auth.email);
    const name = useSelector(state => state.auth.name);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    const branches = useSelector(state => state.branches.branchList);
    let branch = branches.filter(item => {
            return item.code === +id
        }
    )["0"];

    branch = {
        ...branch,
        distance: distanceCalculator(branch, center, locationType, userLocation)
    }
    const dispatch = useDispatch();
    const options = [
        {label: 'Para Yatırma', value: 'Para Yatırma'},
        {label: 'Hesap Açma', value: 'Hesap Açma'},
        {label: 'Mevduat İşlemleri', value: 'Mevduat İşlemleri'},
        {label: 'Kredi İşlemleri', value: 'Kredi İşlemleri'},
        {label: 'Kurumsal İşlemler', value: 'Kurumsal İşlemler'},
    ];
    const navigationHandler = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${branch.coordinateX},${branch.coordinateY}`, '_blank', 'noopener,noreferrer')
    }

    const optionChangeHandler = (opt) => {
        if (opt.length > 2) {
            setError({
                message: "En fazla 2 işlem seçilebilir!"
            })
        } else {
            if (error) {
                setError(null);
            }
            setValues(opt);
        }
    }

    const backHandler = () => {
        // history.goBack();
        history.push("/harita");
    }

    const submitHandler = () => {
        dispatch(sendTicketData({
            email,
            ticket: {
                id: Math.ceil(Math.random() * 1000),
                no: Math.ceil(Math.random() * 100),
                actions: values,
                name,
                branchCode: id,
                date: new Date(),
                status: "Bekliyor",
                status_code: 0,
            },
            branchCode: id,
        }));
        history.replace("/harita");
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
                <BigButton className={classes.submit} text="Sıra Al" onClick={submitHandler}/>
                <BigButton className={classes.back} text="Geri" onClick={backHandler}/>
                <Select
                    className={classes.selector}
                    placeholder="Yapmak istediğiniz işlemleri seçiniz"
                    isMulti
                    options={options}
                    theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary25: "#ea4c59",
                            primary: '#4D5659',
                        },
                    })}
                    onChange={optionChangeHandler}
                    value={values}
                />
            </div>
        </Layout>
    );
}

export default NewTicketPage;