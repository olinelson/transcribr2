import React, { useEffect, useState } from 'react'
import { getUsage } from '../services/userManagement'
import { Statistic } from 'antd'
import styled from 'styled-components'

const StyledCard = styled.div`
    display: grid ;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    grid-gap: 1rem;


  `

export default function Usage () {
  // const [usage, setUsage] = useStorageState(isBrowser() ? localStorage : null, 'usage', [])
  const [usage, setUsage] = useState([])

  const getUserUsage = async () => {
    const usage = await getUsage()
    if (usage) setUsage(usage)
  }

  useEffect(() => {
    getUserUsage()
  }, [])

  if (!usage.length) {
    return (
      <StyledCard>
        <Statistic title='Cost Per Minute' value={0.03} prefix='$' />
        <Statistic title='Free Minutes Used' value={0} suffix='/180' />
        <Statistic title='Paid Min Used' value={0} />
        <Statistic title='Est. Cost' value={0} prefix='$' />

      </StyledCard>
    )
  }

  return <>

    {usage.map(u => {
      const totalUsage = u.total_usage

      const freeUsage = totalUsage > 180 ? 180 : totalUsage

      const paidUsage = totalUsage - 180 < 0 ? 0 : totalUsage - 180

      const estimatedCost = paidUsage > 0 ? 5 + (paidUsage * 0.03) : '0.00'

      return (
        <div key={u.id}>
          <h1>Usage This Month</h1>
          <StyledCard>
            <Statistic title='Cost Per Minute' value={0.03} prefix='$' />
            <Statistic title='Free Minutes Used' value={freeUsage} suffix='/180' />
            <Statistic title='Paid Min Used' value={paidUsage} />
            <Statistic title='Est. Cost' value={estimatedCost} prefix='$' />
          </StyledCard>
        </div>
      )
    })}

  </>
}
