import {uiActions} from "./ui-slice";
import {authActions} from "./auth-slice";
import {fetchBranchData} from "./branch-actions";

export const sendLoginData = (form) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Gönderiliyor",
            message: "Bağlantı kuruluyor.."
        }))

        const sendRequest = async () => {

            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhrb0VoHYRv8NgCSRQGC-UkE6oqmBCL4k ", {
                method: "POST",
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    returnSecureToken: true,
                }),
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }
        try {
            const loginData = await sendRequest();
            if (loginData.idToken) {
                dispatch(checkUserRole({
                    email: form.email,
                    role: form.role,
                    history: form.history,
                    token: loginData.idToken,
                    expiry: loginData.expiresIn * 1000 + new Date().getTime(),
                }));
            } else {
                const formError = loginData.error.message;
                let errorMessage = "Bir hata oluştu!";
                if (formError === "INVALID_EMAIL") {
                    errorMessage = "Hatalı email!"
                } else if (formError === "EMAIL_NOT_FOUND") {
                    errorMessage = "Email kayıtlı değil!"
                } else if (formError === "INVALID_PASSWORD") {
                    errorMessage = "Hatalı şifre!"
                }

                dispatch(uiActions.showNotification({
                    status: "error",
                    title: "Hata",
                    message: errorMessage
                }));
            }
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Giriş başarısız!"
            }));
        }

    }
};


export const sendRegisterData = (form) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Gönderiliyor",
            message: "Bağlantı kuruluyor.."
        }))

        const sendRequest = async () => {

            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhrb0VoHYRv8NgCSRQGC-UkE6oqmBCL4k ", {
                method: "POST",
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    returnSecureToken: true,
                }),
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }
        try {
            const loginData = await sendRequest();
            if (loginData.idToken) {
                dispatch(uiActions.showNotification({
                    status: "success",
                    title: "Başarılı",
                    message: "Başarıyla kaydoldunuz!"
                }));
                dispatch(
                    setUserRole({
                        email: form.email,
                        role: form.role,
                        history: form.history,
                        branchCode: form.branchCode,
                        name: form.name,
                    }));
                form.history.push("/");
                return true;
            } else {
                let errorMessage = "Bir hata oluştu!";
                let loginError = loginData.error.message;
                if (loginError === "EMAIL_EXISTS") {
                    errorMessage = "Bu email adresi zaten kayıtlı!"
                } else if (loginError === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                    errorMessage = "Hatalı deneme limitine ulaştınız, lütfen daha sonra tekrar deneyin."
                } else if (loginError === "OPERATION_NOT_ALLOWED") {
                    errorMessage = "Email kayıtları şu an kapalı.";
                } else if (loginError === "WEAK_PASSWORD") {
                    errorMessage = "Şifreniz 6 karakterden kısa olamaz";
                } else if (loginError === "INVALID_EMAIL") {
                    errorMessage = "Hatalı eposta adresi";
                }

                dispatch(uiActions.showNotification({
                    status: "error",
                    title: "Hata",
                    message: errorMessage
                }));
            }
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Kayıt başarısız!"
            }));
        }
        return false;

    }
};


export const sendTicketData = (form) => {

    return async (dispatch) => {

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

        const getBranchRequest = async (code) => {
            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/branches.json?orderBy="code"&equalTo=${code}`, {
                method: "GET",
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }

        const sendUserRequest = async (id, tickets, email) => {
            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/users/${id}.json`, {
                method: "PATCH",
                body: JSON.stringify({
                    email,
                    tickets: [
                        ...tickets,
                        form.ticket
                    ],
                }),
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }

        const sendBranchRequest = async (id, tickets, density) => {
            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/branches/${id}.json`, {
                method: "PATCH",
                body: JSON.stringify({
                    tickets: [
                        ...tickets,
                        form.ticket
                    ],
                    density: density + 600,
                }),
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }

        const sendTicketRequest = async (ticket) => {
            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/tickets.json`, {
                method: "POST",
                body: JSON.stringify({
                    id: ticket.id,
                    no: ticket.no,
                    actions: ticket.actions,
                    date: ticket.date,
                    status: ticket.status,
                    status_code: ticket.status_code,
                    name: ticket.name,
                    branch: ticket.branchCode
                }),
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }


        try {
            // Add ticket to user
            const user = await getUserRequest(form.email);
            const userId = Object.keys(user)[0];
            let userTickets = user[userId].tickets;
            if (!userTickets) {
                userTickets = [];
            }
            await sendUserRequest(userId, userTickets, form.email, 0);

            // Add ticket to branch.
            const branch = await getBranchRequest(form.branchCode);
            const branchId = Object.keys(branch)[0];
            let branchTickets = branch[branchId].tickets;
            const branchDensity = branch[branchId].density;
            if (!branchTickets) {
                branchTickets = [];
            }
            await sendBranchRequest(branchId, branchTickets, branchDensity);

            await sendTicketRequest(form.ticket);

            await dispatch(fetchBranchData());
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Başarılı!",
                message: "Sıra işlemi başarılı!"
            }));


        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Bağlantı başarısız!"
            }));
            console.log(error);
        }

    }
};


export const setUserRole = (form) => {
    return async (dispatch) => {

        const sendRequest = async () => {
            const response = await fetch("https://subetakipsistemi-default-rtdb.firebaseio.com/users.json", {
                method: "POST",
                body: JSON.stringify({
                    email: form.email,
                    role: form.role,
                    branchCode: form.branchCode,
                    name: form.name,
                }),
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }
        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Bağlantı başarısız!"
            }));
            console.log(error);
        }

    }
};


export const checkUserRole = (form) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Gönderiliyor",
            message: "Bağlantı kuruluyor.."
        }))

        const sendRequest = async () => {

            const response = await fetch(`https://subetakipsistemi-default-rtdb.firebaseio.com/users.json?orderBy="email"&equalTo="${form.email}"`, {
                method: "GET",
            });
            if (!response.ok) {
                new Error("Sending data failed!")
            }
            const data = await response.json();
            return data;
        }
        try {
            const requestData = await sendRequest();
            if (form.role !== requestData[Object.keys(requestData)[0]].role) {
                dispatch(uiActions.showNotification({
                    status: "error",
                    title: "Hata",
                    message: "Hatalı hesap türü!"
                }));
                return;
            } else {
                let code = requestData[Object.keys(requestData)[0]].branchCode;
                if (!code) {
                    code = -1;
                }
                dispatch(authActions.login({
                    email: form.email,
                    token: form.token,
                    expiry: form.expiry,
                    name: requestData[Object.keys(requestData)[0]].name,
                    authType: requestData[Object.keys(requestData)[0]].role,
                    id: code,
                }));
                dispatch(uiActions.showNotification({
                    status: "success",
                    title: "Başarılı",
                    message: "Giriş başarılı!"
                }));
                setTimeout(() => {
                    dispatch(uiActions.clearNotification())
                }, 3000);
                form.history.push("/");
            }
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Giriş başarısız!"
            }));
            console.log(error);
        }

    }
};