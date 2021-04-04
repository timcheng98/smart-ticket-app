import React, { useState } from 'react';
import { Button } from 'antd';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripPayment = ({ seatObj, onSuccess, loading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const onChangeCardElement = (evt) => {
    setCompleted(evt.complete)
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      if (onSuccess) {
        onSuccess(paymentMethod)
      }
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={styles.cardForm}>
        <h4 style={{ marginTop: '0px', color: '#1990FF', fontWeight: 'bold' }}>
          $ {seatObj.total_price} <br />
          Area: {seatObj.selectedArea} <br />
          No. of Tickets: {seatObj.totalSelectedTicket}
        </h4>
        <div style={{ marginTop: '10px' }}>
          <div style={{ color: 'grey' }}>
          Please insert credit card information
          </div>
          <div style={styles.cardContainer}>
            <CardElement
            onChange={(e) => onChangeCardElement(e)}
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                      color: "#aab7c4"
                    }
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a"
                  }
                }
              }}
            />
          </div>
          <Button
            htmlType="submit"
            size="large"
            loading={loading}
            disabled={!stripe || !completed}
            shape='round'
            style={{
              marginTop: 20,
              width: '100%',
              background: 'linear-gradient(90deg,#0e131d,#060a10 90.65%)',
              color: '#fff',
              height: 50,
              fontWeight: 'bold',
            }}
          >
            付款
          </Button>
          </div>
      </form>
    </div>
  );
};


const styles = {
        cardContainer: {
        border: '1px solid #999999',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '5px',
    marginBottom: '10px',
  },
  cardForm: {
        maxWidth: '400px',
    margin: 'auto',
    // textAlign: 'center',
  }
};


export default StripPayment;