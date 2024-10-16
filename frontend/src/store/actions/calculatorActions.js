import axiosApi from "../../axiosApi";
import {
    CALCULATE_LOAN_FAILURE,
    CALCULATE_LOAN_SUCCESS, RESET_CALCULATOR_DATA, SEND_EMAIL_FAILURE,
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SET_CALCULATOR_DATA
} from "../actionTypes";


export const setCalculatorData = (data) => {
    return {
        type: SET_CALCULATOR_DATA,
        payload: data
    };
};
export const calculateLoan = () => async (dispatch, getState) => {
    const { cost, initialPayment, term, interestRate, loanType } = getState().calculator;

    try {
        const response = await axiosApi.post('/calculate', {
            type: loanType,
            cost,
            initialPayment,
            term,
            interestRate
        });

        const { monthlyPayment, totalPayment, requiredIncome } = response.data.data;

        dispatch({
            type: CALCULATE_LOAN_SUCCESS,
            payload: {
                monthlyPayment: Math.round(monthlyPayment),
                totalPayment: Math.round(totalPayment),
                requiredIncome: Math.round(requiredIncome)
            }
        });
    } catch (error) {
        console.error('Error while calculating loan:', error);
        dispatch({
            type: CALCULATE_LOAN_FAILURE,
            payload: error.message
        });
    }
};

export const sendEmail = (email) => async (dispatch, getState) => {
    dispatch({ type: SEND_EMAIL_REQUEST });

    const { monthlyPayment, totalPayment, requiredIncome } = getState().calculator;

    try {
        await axiosApi.post('/calculate/send', {
            email,
            monthlyPayment,
            totalPayment,
            requiredIncome
        });

        dispatch({
            type: SEND_EMAIL_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: SEND_EMAIL_FAILURE,
            payload: error.message
        });
    }
};

export const resetCalculatorData = () => {
    return {
        type: RESET_CALCULATOR_DATA,
    };
};
