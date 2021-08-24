import {branchesActions} from "./branch-slice";
import {uiActions} from "./ui-slice";

export const fetchBranchData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch("https://subetakipsistemi-default-rtdb.firebaseio.com/branches.json");
            if (!response.ok) {
                new Error("Reading branch data failed!");
            }
            const data = await response.json();
            return data;
        }

        try {
            const branchData = await fetchData();
            dispatch(branchesActions.setBranches({
                branchList: branchData
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Hata!",
                message: "Şube bilgisi alınamadı!"
            }));
        }
    };
};