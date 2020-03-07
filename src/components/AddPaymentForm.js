import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { attachPaymentMethodToCustomer } from '../services/userManagement'
import { openNotificationWithIcon } from './Notifications'
import { Form, Button } from 'antd'
import styled from 'styled-components'
const AddPaymentForm = ({ getPaymentMethods, setAddCardModalVisible }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      })
      if (error) throw new Error(error)

      const attached = await attachPaymentMethodToCustomer(paymentMethod)

      if (!attached) throw new Error('Error adding Payment source')
      openNotificationWithIcon('success', 'Payment Source Added')
      setAddCardModalVisible(false)
      getPaymentMethods()
    } catch (error) {
      console.error(error)
      openNotificationWithIcon('error', 'Error Adding Payment Source')
    }
  }

  const StyledForm = styled(Form)`
//      padding: 24px;
//   background: #fbfbfb;
//   border: 1px solid #d9d9d9;
//   border-radius: 2px;
  `

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Item>
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4'
              }
            },
            invalid: {
              color: '#9e2146'
            }
          }
        }}
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType='submit' disabled={!stripe}>
                  Add Card
        </Button>
      </Form.Item>

    </StyledForm>
  )
}

export default AddPaymentForm
