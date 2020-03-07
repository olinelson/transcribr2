import React, { useEffect, useState } from 'react'
import { getUsage } from '../services/userManagement'
import { Progress, Statistic, Card } from 'antd'
import styled from 'styled-components'

export default function Usage () {
  const [usage, setUsage] = useState([])

  const getUserUsage = async () => {
    const usage = await getUsage()
    setUsage(usage)
  }

  console.log(usage)

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

      const estimatedCost = paidUsage > 0 ? Math.round(5 + paidUsage * 0.30).toFixed(2) : '0.00'

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
