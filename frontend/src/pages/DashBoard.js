import React from "react";
import Grid from "@mui/material/Grid";
import OrderCategoryChart from "../components/Charts/OrderCategoryChart";
import CustomerSpendChart from "../components/Charts/CustomerSpendChart";
import AllUserTable from "../components/Table/AllUserTable";
import SellPostTable from "../components/Table/SellPostTable";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
} from "mdb-react-ui-kit";

const DashBoard = () => {
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer>
        <h1 className="text-center"> Sell Reports</h1>
        <MDBRow>
          <MDBCol lg="6">
            <MDBCard className="mb-4">
              <CustomerSpendChart />
            </MDBCard>
          </MDBCol>
          <MDBCol lg="6">
            <MDBCard className="mb-4">
              <OrderCategoryChart />
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <SellPostTable />
        </MDBRow>
        <MDBRow>
          <AllUserTable />
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default DashBoard;
