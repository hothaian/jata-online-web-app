import React from 'react';
import Grid from '@mui/material/Grid';
import OrderCategoryChart from '../components/Charts/OrderCategoryChart';
import BarChart from '../components/Charts/BarChart';
import AllUserTable from '../components/Table/AllUserTable';
import SellPostTable from '../components/Table/SellPostTable';

function DashBoard() {
  return (
    <div>
      {/* Centering the h3 horizontally */}
      <Grid container justifyContent="center">
        <Grid item>
          <h1> Sell Reports</h1>
        </Grid>
      </Grid>

      {/* Using MUI Grid for layout */}
      <Grid container spacing={3}>
        {/* First column - Order Category Chart */}
        <Grid item xs={12} sm={6}>
          <OrderCategoryChart />
        </Grid>
        
        {/* Second column - Bar Chart */}
        <Grid item xs={12} sm={6}>
          <BarChart />
        </Grid>
      </Grid>

      {/* Full-width layout for Sell Post Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SellPostTable />
        </Grid>
      </Grid>

      {/* Full-width layout for All User Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AllUserTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default DashBoard;
