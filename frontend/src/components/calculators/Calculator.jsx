import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Form, Row, Col, Modal, Spinner, Container } from 'react-bootstrap';
import { calculateLoan, sendEmail, setCalculatorData } from "../../store/actions/calculatorActions";
import './../styles/Calculator.css';

function Calculator({ interestRate, loanType }) {
  const dispatch = useDispatch();
  const calculator = useSelector(state => state.calculator);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCalculatorData({ [name]: Number(value) }));
  };

  const handleCalculate = () => {
    dispatch(setCalculatorData({ interestRate, loanType }));
    dispatch(calculateLoan());
  };

  const handleSendEmail = () => {
    dispatch(sendEmail(email));
  };

  return (
      <Container className="calculator-wrapper my-5">
        <Card className="p-4 shadow-lg calculator-card">
          <Card.Body>
            <h2 className="text-center mb-4 loan-type-title">
              Процентная ставка {loanType} <strong className="interest-rate">{interestRate}%</strong>
            </h2>

            <Form className="calculator-form">
              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formCost">
                    <Form.Label>Сумма кредита</Form.Label>
                    <Form.Control
                        type="range"
                        min="0"
                        max="10000000"
                        name="cost"
                        value={calculator.cost}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="cost"
                        value={calculator.cost}
                        onChange={handleChange}
                        className="mt-2"
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="formTerm">
                    <Form.Label>Срок кредита (лет)</Form.Label>
                    <Form.Control
                        type="range"
                        min="1"
                        max="30"
                        name="term"
                        value={calculator.term}
                        onChange={handleChange}
                    />
                    <Form.Control
                        type="number"
                        name="term"
                        value={calculator.term}
                        className="mt-2"
                        onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formInitialPayment" className="mb-3">
                <Form.Label>Первоначальный взнос</Form.Label>
                <Form.Control
                    type="number"
                    name="initialPayment"
                    value={calculator.initialPayment || ''}
                    placeholder="0"
                    onChange={handleChange}
                />
              </Form.Group>
            </Form>

            <div className="info-value-block text-center my-4">
              <div className="info-value">Ежемесячный платеж: {calculator.monthlyPayment?.toLocaleString() || '0'} ₽</div>
              <div className="info-value">Общая сумма выплат: {calculator.totalPayment?.toLocaleString() || '0'} ₽</div>
              <div className="info-value">Необходимый доход: {calculator.requiredIncome?.toLocaleString() || '0'} ₽</div>
            </div>

            <div className="d-flex justify-content-between">
              <Button variant="success" className="shadow" onClick={handleCalculate} disabled={!calculator.cost || !calculator.initialPayment || !calculator.term}>
                Рассчитать
              </Button>
              <Button variant="warning" className="shadow" onClick={() => setShowModal(true)}>
                Отправить на почту
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Email Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Отправить результаты на почту</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Отмена
            </Button>
            <Button variant="primary" onClick={handleSendEmail}>
              {calculator.emailSending ? <Spinner animation="border" size="sm" /> : 'Отправить'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
}

export default Calculator;
