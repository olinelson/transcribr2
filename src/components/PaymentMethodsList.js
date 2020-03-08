import React, { useEffect, useState } from 'react'
import { getUserPaymentMethods, deletePaymentMethod } from '../services/userManagement'
import { List, Icon, Modal, Popconfirm, Popover, Button } from 'antd'

import styled from 'styled-components'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AddPaymentForm from './AddPaymentForm'
import { openNotificationWithIcon } from './Notifications'
import { useStorageState } from 'react-storage-hooks'

const stripePromise = loadStripe('pk_live_cXMZDMoPxJaKGOa5MEXk09PU007Ke5wshF')
// const stripePromise = loadStripe('pk_test_9MNFVyvIUuMqQgdozJBdDxjO005OlKPNVa')

export default function PaymentMethodsList () {
  const [cards, setCards] = useStorageState(window ? localStorage : null, 'cards', [])
  const [loading, setLoading] = useState(true)
  const [addCardModalVisible, setAddCardModalVisible] = useState(false)

  const getPaymentMethods = async () => {
    const paymentMethods = await getUserPaymentMethods()
    if (paymentMethods) {
      setCards(paymentMethods.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getPaymentMethods()
  }, [])

  const StyledListItem = styled(List.Item)`
    display: grid;
grid-template-columns: auto 1fr auto;
align-items: start;

  `
  const StyledListItemContainer = styled.div`
    display: grid
  `

  const StyledListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  `

  const deletePaymentMethodHandler = async (paymentMethodId) => {
    const deleted = await deletePaymentMethod(paymentMethodId)
    if (!deleted) {
      openNotificationWithIcon('error', 'Coudn\'t delete payment method.')
      return
    }

    openNotificationWithIcon('success', 'Payment method deleted')
    getPaymentMethods()
  }

  return (
    <>
      <List
        header={
          <StyledListHeader>
            <h4>My Payment Methods</h4>
            <Icon type='plus' onClick={() => setAddCardModalVisible(true)} />

          </StyledListHeader>
        }
        locale={{ emptyText: 'no cards added yet...' }}
        bordered
        dataSource={cards}
        loading={loading}
        renderItem={c => (

          <StyledListItem>
            <Icon style={{ fontSize: '3.75rem', margin: '0 .5rem' }} type='credit-card' />

            <StyledListItemContainer>
              <h4 style={{ margin: 0 }}>{c.card.brand}</h4>
              <small>xxxx xxxx xxxx {c.card.last4}</small>
              <small>Expires: {c.card.exp_month}/{c.card.exp_year}</small>

            </StyledListItemContainer>

            {cards.length <= 1
              ? <Popover content='To delete a card, first add a new one.' trigger='hover'>
                <Button type='link' icon='delete' disabled />
              </Popover>
              : <Popconfirm
                title='Are you sure delete this card?'
                onConfirm={() => deletePaymentMethodHandler(c.id)}
                okText='Yes'
                cancelText='No'
                >
                <Icon type='delete' />
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
  )
}
