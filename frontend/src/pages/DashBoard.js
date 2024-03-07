import React from 'react'
import OrderCategoryChart from '../components/Charts/OrderCategoryChart'
import BarChart from '../components/Charts/BarChart'

import AllUserTable from '../components/Table/AllUserTable'
import SellPostTable from '../components/Table/SellPostTable'

function DashBoard() {
  return (
    <div>
      <h3>USER DASH BOARD</h3>
      <OrderCategoryChart/>
      <BarChart/>
      <SellPostTable/>
      <AllUserTable/>

    </div>
  )
}

export default DashBoard
