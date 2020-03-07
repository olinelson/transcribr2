import React, { useEffect, useState } from 'react'
import { getUsage } from '../services/userManagement'
import { Progress, Statistic, Card } from 'antd'
import styled from 'styled-components'
import { useStateWithLocalStorageJSON } from '../utils'

export default function Usage () {
  const [usage, setUsage] = useStateWithLocalStorageJSON('usage', [])

  const getUserUsage = async () => {
    const usage = await getUsage()
    if (usage) setUsage(usage)
  }

  useEffect(() => {
    getUserUsage()
  }, [])

  const StyledCard = styled.div`
    display: grid ;
    grid-template-columns: 1fr 1fr 1fr;
    // margin:  .5rem 0 1rem 0;

  `

  return <StyledCard>

    {usage.map(u => {
      const totalUsage = u.total_usage

      const freeUsage = totalUsage > 180 ? 180 : totalUsage

      const paidUsage = totalUsage - 180 < 0 ? 0 : totalUsage - 180

      const estimatedCost = paidUsage > 0 ? 5 + (paidUsage * 0.03) : '0.00'

      return (
        <>
          <Statistic title='Free Minutes Used' value={freeUsage} suffix='/180' />
          <Statistic title='Paid Min Used' value={paidUsage} />
          <Statistic title='Est. Cost' value={estimatedCost} prefix='$' />
        </>
      )
    })}

         </StyledCard>
}
