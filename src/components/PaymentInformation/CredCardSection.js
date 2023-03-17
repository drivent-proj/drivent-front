import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import usePostPayment from '../../hooks/api/usePostPayment';
import dayjs from 'dayjs';

const PaymentForm = ({ ticket, setIsPaid }) => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    issuer: '',
    FormData: null,
  });
  const [auxDate, setAuxDate] = useState(undefined);
  const { processPaymentLoading, processPayment } = usePostPayment();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === 'expiry') {
      setAuxDate(value);
      const newValue = value.split('-');
      const year = newValue[0];
      const month = newValue[1];
      const newValueInsertion = month + year;
      setState((prev) => ({ ...prev, [name]: newValueInsertion }));
      return;
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async(evt) => {
    evt.preventDefault();

    const cardValid = checkCard();
    if (!cardValid) return;

    const cardData = {
      issuer: issuerName,
      number: Number(state.number),
      name: state.name,
      expirationDate: dayjs(auxDate).format(),
      cvv: Number(state.cvc),
    };

    const data = { ticketId: ticket.id, cardData };
    try {
      await processPayment(data);
      toast.success('Pagamento concluído!');
      setIsPaid(true);
    } catch (err) {
      toast.error('Não foi possível processar seu pagamento!');
    }
  };

  let issuerName;
  let isValidBool;

  const callbackFunction = ({ issuer }, isValid) => {
    isValidBool = isValid;
    if (isValid) {
      issuerName = issuer;
    }
  };

  function checkCard() {
    if (!isValidBool) {
      toast.error('Cartão inválido');
      clearState();
      return false;
    }

    if (state.number.length === 0) {
      toast.error('Cartão inválido');
      clearState();
      return false;
    }

    if (state.name.length < 4) {
      toast.error('Nome inválido');
      clearState();
      return false;
    }
    
    if (!auxDate) {
      toast.error('Data de expiração inválida');
      clearState();
      return false;
    }

    if ((dayjs(auxDate) < dayjs()) || !auxDate) {
      toast.error('Cartão expirado');
      clearState();
      return false;
    }

    if (state.cvc.length !== 3) {
      toast.error('CVV inválido');
      clearState();
      return false;
    }

    return true;
  }

  function clearState() {
    issuerName = undefined;
    isValidBool = false;
    setTimeout(() => {
      setState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
        issuer: '',
        FormData: null,
      });
      setAuxDate('');
    }, 2000);
  }

  return (
    <>
      <CardContainer>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          issuer={state.issuer}
          focused={state.focus}
          callback={callbackFunction}
        />
        <Form>
          <Input
            type="text"
            name="number"
            minLength={15}
            maxLength={16}
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <p>E.g: 49..., 51..., 36..., 37...</p>
          <Input
            type="name"
            name="name"
            minLength={4}
            maxLength={21}
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <div>
            <HalfInput
              type="month"
              name="expiry"
              placeholder="Valid Thru"
              value={auxDate}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
            <HalfInput
              type="CVV"
              name="cvc"
              placeholder="CVV"
              value={state.cvc}
              maxLength={3}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
            />
          </div>
          <input type="hidden" name="issuer" value={state.issuer} />
        </Form>
      </CardContainer>
      <SubmitButton onClick={handleSubmit} disabled={processPaymentLoading ? true : false}>FINALIZAR PAGAMENTO</SubmitButton>
    </>
  );
};

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Form = styled.form`
  margin-left: 25px;
  width: 100%;
  * {
    margin-bottom: 10px;
  }
  p {
    margin-top: -5px;
    color: #898989;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  input {
    border-radius: 5px;
    padding-left: 10px;
    height: 35px;
    border: 1px solid #898989;
    font-size: 16px;
  }
  input[type='month'] {
    color: #898989;
  }
`;

const Input = styled.input`
  width: 100%;
`;

const HalfInput = styled.input`
  width: 48%;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: none;
  background-color: #dddddd;
  -webkit-box-shadow: 0px -1px 12px 1px rgba(221, 221, 221, 1);
  -moz-box-shadow: 0px -1px 12px 1px rgba(221, 221, 221, 1);
  box-shadow: 0px -1px 12px 1px rgba(221, 221, 221, 1);
`;

export default PaymentForm;
