import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import styled from 'styled-components';

const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [auxDate, setAuxDate] = useState();

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

  return (
    <>
      <CardContainer>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <Form id="creditCardForm">
          <Input
            type='text'
            name='number'
            maxLength={16}
            placeholder='Card Number'
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <p>E.g: 49..., 51..., 36..., 37...</p>
          <Input
            type='name'
            name='name'
            maxLength={21}
            placeholder='Name'
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div>
            <HalfInput
              type='month'
              name='expiry'
              placeholder='Valid Thru'
              value={auxDate}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <HalfInput
              type='CVV'
              name= 'cvc'
              placeholder='CVV'
              value={state.cvc}
              maxLength={3}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </Form>
      </CardContainer>
      <SubmitButton type='submit' form='creditCardForm'>FINALIZAR PAGAMENTO</SubmitButton>
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
  input[type=month] {
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
  background-color: #DDDDDD;
  -webkit-box-shadow: 0px -1px 12px 1px rgba(221,221,221,1);
  -moz-box-shadow: 0px -1px 12px 1px rgba(221,221,221,1);
  box-shadow: 0px -1px 12px 1px rgba(221,221,221,1);
`;

export default PaymentForm;
