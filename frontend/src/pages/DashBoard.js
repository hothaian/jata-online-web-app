import React from 'react'
import PieChart from '../components/Charts/PieChart'
import BarChart from '../components/Charts/BarChart'
import Table from '../components/Charts/Table'

function DashBoard() {
  return (
    <div>
      <h3>USER DASH BOARD</h3>
      <PieChart/>
      <BarChart/>
      <Table/>
    </div>
  )
}

export default DashBoard
