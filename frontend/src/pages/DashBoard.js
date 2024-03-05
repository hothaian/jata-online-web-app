import React from 'react'
import PieChart from '../components/Charts/PieChart'
import BarChart from '../components/Charts/BarChart'

import AllUserTable from '../components/Table/AllUserTable'
import SellPostTable from '../components/Table/SellPostTable'

function DashBoard() {
  return (
    <div>
      <h3>USER DASH BOARD</h3>
      <PieChart/>
      <BarChart/>
      <SellPostTable/>
      <AllUserTable/>

    </div>
  )
}

export default DashBoard
