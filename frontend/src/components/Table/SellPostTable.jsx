import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Button,
  
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AddSellPost from "../AddSellPost";
import { MDBCol, MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";

const SellPostTable = () => {
  const { currentUser,sellPost } = useAuth();
  const [reload, setReload] = useState(false)
  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);
  const [sellpostIdFilter, setSellPostIdFilter] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const columns = [
    { id: "sellpost_id", name: "Sell Post ID" },
    { id: "seller_id", name: "Seller ID" },
    { id: "item_name", name: "Item Name" },
    { id: "description", name: "Description" },
    { id: "price", name: "Price" },
    { id: "quantity", name: "Quantity" },
    { id: "size", name: "Size" },
    { id: "gender", name: "Gender" },
    { id: "color", name: "Color" },
    { id: "brand", name: "Brand" },
    { id: "picUrl", name: "Post Image" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };

  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };



  useEffect(() => {
    const apiUrl = `http://localhost:8080/api/user/${currentUser.user_id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const user = response.data;

        const initialRows = user.sellPosts;
        rowchange(initialRows);
        setFilteredRows(initialRows);
        setReload(false)
      })
      .catch((error) => {
        console.error("Error fetching sell posts:", error.message);
      });
  }, [sellPost, reload]);

  const handleFilterSubmit = () => {
    // Apply the filters
    const filteredRows = rows.filter((row) =>
      String(row.sellpost_id)
        .toLowerCase()
        .includes(sellpostIdFilter.toLowerCase())
    );

    // Update the state with the filtered rows
    setFilteredRows(filteredRows);

    // Reset pagination to the first page
    pagechange(0);
  };
  
  const handleRefresh = () => {
    setReload(true);
  }

  const handleShowAll = () => {
    // Reset filter values
    setSellPostIdFilter("");

    // Reset filteredRows to display all rows
    setFilteredRows(rows);

    // Reset pagination to the first page
    pagechange(0);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <MDBContainer>
        <h1>SELL POST LIST</h1>
        <MDBRow className="mb-4" >
          <MDBCol lg="3">
            <TextField
              label="Input Sell Post ID"
              value={sellpostIdFilter}
              onChange={(e) => setSellPostIdFilter(e.target.value)}
              style={{ marginRight: "10px" }}
            />
          </MDBCol>
          <MDBCol lg="2">
            <Button
             endIcon={<SearchIcon />}
              variant="contained"
              color="primary"
              onClick={handleFilterSubmit}
              style={{ marginLeft: "5px" }}
            >
              Find Post
            </Button>
          </MDBCol>
          <MDBCol lg="2" className="ml-auto">
            <Button
              endIcon={<DoneAllIcon/>}
              variant="contained"
              color="primary"
              onClick={handleShowAll}
              style={{ marginRight: "10px" }}
            >
              Show All
            </Button>            
          </MDBCol>

          <MDBCol lg="2">            
          <Button
              endIcon={<RefreshIcon/>}
              variant="contained"
              color="primary"
              onClick={handleRefresh}
              style={{ marginRight: "10px" }}
            >
              Refresh
            </Button> 
          </MDBCol>
          <MDBCol lg="2">            
            <AddSellPost />
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Paper sx={{ width: "90%", marginLeft: "5%" }}>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    style={{ backgroundColor: "black", color: "white" }}
                    key={column.id}
                  >
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowperpage, page * rowperpage + rowperpage)
                .map((row, i) => (
                  <TableRow key={i}>
                    {columns.map((column, i) => {
                      let value = row[column.id];
                      return (
                        <TableCell key={i}>
                          {value != null && value !== "" ? (
                            column.id === "picUrl" ? (
                              <img
                                src={value}
                                alt="Post Image"
                                style={{ width: "50px", height: "50px" }}
                              />
                            ) : (
                              value
                            )
                          ) : (
                            <span style={{ color: "gray" }}>N/A</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowperpage}
          page={page}
          count={filteredRows.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default SellPostTable;
