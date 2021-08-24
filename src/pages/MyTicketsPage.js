import Layout from "../components/Layout/Layout";
import Ticket from "../components/Ticket";
import classes from "./BranchPage.module.css";
import {fetchTicketData, fetchUserTickets} from "../store/ticket-actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";


const BranchPage = () => {

    const dispatch = useDispatch();
    const tickets = useSelector(state => state.tickets.ticketList);
    const email = useSelector(state => state.auth.email);


    let ticketDOM;

    if (tickets) {
        ticketDOM =
            Object.keys(tickets).map((ticket) => {
                return <Ticket admin={false} key={ticket.id} ticket={tickets[ticket]}/>
            })
    } else {
        ticketDOM = <p>Mevcut sıra bulunamadı.</p>
    }

    useEffect(() => {
        dispatch(fetchUserTickets({
            email,
        }));
    }, [dispatch])


    return (
        <Layout>
            <div className={classes["ticket-list"]}>
                {ticketDOM}
            </div>
        </Layout>
    );

}

export default BranchPage;