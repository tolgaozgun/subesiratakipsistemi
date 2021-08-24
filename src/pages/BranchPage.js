import Layout from "../components/Layout/Layout";
import Ticket from "../components/Ticket";
import classes from "./BranchPage.module.css";
import {fetchTicketData} from "../store/ticket-actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";


const BranchPage = () => {

    const dispatch = useDispatch();
    const branchCode = useSelector(state => state.auth.id);
    const branches = useSelector(state => state.branches.branchList);
    const tickets = useSelector(state => state.tickets.ticketList);


    const branch = branches.filter(branch => {
        return branch.code === branchCode
    });
    let queueLength = 0;
    let queueTime = 0;
    if (branch.length > 0 && branch.tickets) {
        queueLength = branch.tickets.length;
        queueTime = branch.density;
    }
    let ticketDOM;

    if (tickets) {
        ticketDOM =
            Object.keys(tickets).map((ticket) => {
                return <Ticket admin={true} key={ticket.id} ticket={tickets[ticket]}/>
            })
    } else {
        ticketDOM = <p>Sırada müşteri bulunamadı.</p>
    }

    useEffect(() => {
        dispatch(fetchTicketData({
            branchCode: branchCode,
        }));
    }, [dispatch])


    return (
        <Layout>
            <div className={classes.info}>
                <span className={classes["queue-length"]}>Sıradaki Müşteri Sayısı:</span>
                <span className={`${classes["span-value"]} ${classes["queue-length"]}`}>{queueLength}</span>
                <span className={classes["queue-time"]}>Tahmini Bekleme Süresi:</span>
                <span className={`${classes["span-value"]} ${classes["queue-time"]}`}>{queueTime} dk</span>
            </div>
            <div className={classes["ticket-list"]}>
                {ticketDOM}
            </div>
        </Layout>
    );

}

export default BranchPage;