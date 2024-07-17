import React, { useState } from "react";
import "../App.css"

function calculateMortgage(cost, initialPayment, term) {
  const annualRate = 3.5;
  const loanAmount = cost - initialPayment;
  const monthlyRate = annualRate / 12 / 100;
  const totalRate = Math.pow(1 + monthlyRate, term * 12);
  const monthlyPayment =
    (loanAmount * monthlyRate * totalRate) / (totalRate - 1);

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(monthlyPayment * term * 12),
  };
}

function Calc2() {
  const [cost, setCost] = useState(0);
  const [initialPayment, setInitialPayment] = useState(0);
  const [term, setTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const MAX_COST = 10000000;

  const handleCalculate = () => {
    const { monthlyPayment, totalPayment } = calculateMortgage(
      cost,
      initialPayment,
      term
    );
    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    console.log(`Рассчитанный ежемесячный платёж: ${monthlyPayment}
        и Общая сумма ипотеки ${totalPayment}`);
  };

  return (
    <div className="Calc">
      <div className="data-section-input">
        <div className="kredit">
          <h3 className="title">
            Сумма ипотеки
          </h3>
        </div>
        <div className="div2">
            <input className="mortgage-amount"
              type="range"
              min="0"
              max={MAX_COST}
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              step="1000"
            />
            <div className="value-cost">
              <p className="value-from-cost">0 ₽</p>
              <p className="value-to-cost">{MAX_COST} ₽</p>
            </div>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
        </div>
        <div className="kredit">
          <h3 className="title">
            Срок кредита 
          </h3>
        </div>
        <div className="div2">
          <input
            type="range"
            min="1"
            max="30"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            step="1"
          />
          <div className="value-cost">
             <p className="value-from-cost">0 Лет</p>
            <p className="value-to-cost">30 Лет</p>
          </div>
          <input
            type="number"
            min="1"
            max="30"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
          />
          <div>
        </div>
        </div>
      </div>
      <div className="data-section-output">
        <div className="kredit">
          <div className="kredit head-output">
          <h3 className="title">
            Первоначальный взнос 
          </h3>
          <h3>3,5%</h3>
        </div>
        <div className="div2">
          <input
            type="number"
            value={initialPayment}
            onChange={(e) => setInitialPayment(Number(e.target.value))}
          />
        </div>
        <div className="info-value-block">
          <div className="info-value grey">
              Ежемесячный платеж <br /> {monthlyPayment} ₽
          </div>
          <div className="info-value blue">
              Переплата <br /> {totalPayment} ₽
          </div>
        </div>
          <button className="styleButton" onClick={handleCalculate}>
          Рассчитать
        </button>
        </div>
      </div>
    </div>
  );
}

export default Calc2;
