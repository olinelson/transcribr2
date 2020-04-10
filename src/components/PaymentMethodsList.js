import React, { useEffect, useState } from 'react'
import { getUserPaymentMethods, deletePaymentMethod } from '../services/userManagement'
import { CreditCardOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { List, Modal, Popconfirm, Popover, Button } from 'antd'

import styled, { keyframes } from 'styled-components'

import { Elements } from '@stripe/react-stripe-js'

import AddPaymentForm from './AddPaymentForm'
import { openNotificationWithIcon } from './Notifications'
import { useStorageState } from 'react-storage-hooks'
import { isBrowser } from '../services/auth'

import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from '../config'

const flash = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: .7;
  }
`

const StyledListItemContainer = styled.div`
    display: grid
  `

const StyledListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  `

export default function PaymentMethodsList () {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
  const [cards, setCards] = useStorageState(isBrowser() ? localStorage : null, 'cards', [])
  const [loading, setLoading] = useState(false)
  const [addCardModalVisible, setAddCardModalVisible] = useState(false)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('')

  const StyledListItem = styled(List.Item)`
    display: grid;
grid-template-columns: auto 1fr auto;
align-items: start;
 background: ${props =>
      props._id === selectedPaymentMethodId
        ? '#E6F7FF'
        : 'none'};
  border-bottom: ${props =>
      props._id === selectedPaymentMethodId
        ? '2px solid #1890FF;'
        : 'none'};
  animation: ${flash} 0.5s alternate infinite linear;
  animation: ${props => (props._id !== selectedPaymentMethodId ? 'none' : null)};
  `

  const getPaymentMethods = async () => {
    if (cards.length === 0) setLoading(true)
    const paymentMethods = await getUserPaymentMethods()
    if (paymentMethods) {
      setCards(paymentMethods.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPaymentMethods()
  }, [])

  const deletePaymentMethodHandler = async (paymentMethodId) => {
    setSelectedPaymentMethodId(paymentMethodId)
    const deleted = await deletePaymentMethod(paymentMethodId)
    if (!deleted) {
      openNotificationWithIcon('error', 'Coudn\'t delete payment method.')
      return
    }

    openNotificationWithIcon('success', 'Payment method deleted')
    getPaymentMethods()
  }

  return <>
    <List
      header={
        <StyledListHeader>
          <h4>My Payment Methods</h4>
          <PlusOutlined onClick={() => setAddCardModalVisible(true)} />

        </StyledListHeader>
      }
      locale={{ emptyText: 'no cards added yet...' }}
      bordered
      dataSource={cards}
      loading={loading}
      renderItem={c => (

        <StyledListItem _id={c.id}>
          <CreditCardOutlined style={{ fontSize: '3.75rem', margin: '0 .5rem' }} />

          <StyledListItemContainer>
            <h4 style={{ margin: 0 }}>{c.card.brand}</h4>
            <small>xxxx xxxx xxxx {c.card.last4}</small>
            <small>Expires: {c.card.exp_month}/{c.card.exp_year}</small>

          </StyledListItemContainer>

          {cards.length <= 1
            ? <Popover content='To delete a card, first add a new one.' trigger='hover'>
              <Button type='link' icon={<DeleteOutlined />} disabled />
            </Popover>
            : <Popconfirm
              title='Are you sure delete this card?'
              onConfirm={() => deletePaymentMethodHandler(c.id)}
              okText='Yes'
              cancelText='No'
              >
              <DeleteOutlined />
              </Popconfirm>}

        </StyledListItem>
      )}
    />

    <Modal
      title='Add Card'
      visible={addCardModalVisible}
      footer={null}
      //   onOk={this.handleOk}
      onCancel={() => setAddCardModalVisible(false)}
    >
      <Elements stripe={stripePromise}>
        <AddPaymentForm getPaymentMethods={getPaymentMethods} setAddCardModalVisible={setAddCardModalVisible} />
      </Elements>
    </Modal>

  </>
}
