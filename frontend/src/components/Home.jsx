import React, { useState } from "react";
import Calculator from "./calculators/Calculator";
import { Button, Card, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Home.css';
import {resetCalculatorData} from "../store/actions/calculatorActions";
import {useDispatch} from "react-redux";

function Home() {
    const dispatch = useDispatch();
    const [activeCalculator, setActiveCalculator] = useState("mortgage");
    const handleLoanTypeSwitch = (loanType) => {
        dispatch(resetCalculatorData());  // Сброс данных калькулятора
        setActiveCalculator(loanType);    // Переключение типа кредита
    };
    const renderCalculator = () => {
        switch (activeCalculator) {
            case "mortgage":
                return <Calculator interestRate={9.6} loanType="на ипотеку" />;
            case "car":
                return <Calculator interestRate={3.5} loanType="на автокредит" />;
            case "consumer":
                return <Calculator interestRate={14.5} loanType="на потребительский кредит" />;
            default:
                return <Calculator interestRate={9.6} loanType="на ипотеку" />;
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Тип кредита расчета</h2>
            <div className="d-flex justify-content-center mb-4">
                <Button
                    className={`custom-button me-2 ${activeCalculator === "consumer" ? "active" : ""}`}
                    onClick={() => handleLoanTypeSwitch("consumer")}
                >
                    Потребительский кредит
                </Button>
                <Button
                    className={`custom-button me-2 ${activeCalculator === "car" ? "active" : ""}`}
                    onClick={() => handleLoanTypeSwitch("car")}
                >
                    Автокредитование
                </Button>
                <Button
                    className={`custom-button ${activeCalculator === "mortgage" ? "active" : ""}`}
                    onClick={() => handleLoanTypeSwitch("mortgage")}
                >
                    Ипотека
                </Button>
            </div>
            <Card className="calculator-display shadow">
                <Card.Body>
                    {renderCalculator()}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Home;
