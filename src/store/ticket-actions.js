import {uiActions} from "./ui-slice";
import {ticketsActions} from "./tickets-slice";


export const fetchTicketData = (props) => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/tickets.json?orderBy="branch"&equalTo="${props.branchCode}"`);
            if (!response.ok) {
                new Error("Reading ticket data failed!");
            }
            const data = await response.json();
            return data;
        }

        try {
            const ticketData = await fetchData();
            let tickets = [];
            Object.keys(ticketData).map((ticket) => tickets.push(ticketData[ticket]));
            dispatch(ticketsActions.setTickets({
                ticketList: tickets
            }))
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Başarılı!",
                message: "Sıra bilgisi alındı!"
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Sıra bilgisi alınamadı!"
            }));
            console.log(error);
        }
    };
};


export const fetchUserTickets = (props) => {
    return async dispatch => {


        const getUserRequest = async (email) => {
            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${email}"`, {
                method: "GET",
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }

        try {

            const user = await getUserRequest(props.email);
            console.log(user);
            const userId = Object.keys(user)[0];
            let userTickets = user[userId].tickets;
            //Object.keys(ticketData).map((ticket) => tickets.push(ticketData[ticket]));
            dispatch(ticketsActions.setTickets({
                ticketList: userTickets
            }))
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Başarılı!",
                message: "Sıra bilgisi alındı!"
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Sıra bilgisi alınamadı!"
            }));
            console.log(error);
        }
    };
};