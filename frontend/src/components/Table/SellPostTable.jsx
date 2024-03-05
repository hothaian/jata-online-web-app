import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const SellPostTable = () => {
    const columns = [
        { id: 'sellpost_id', name: 'Sell Post ID' },
        { id: 'seller_id', name: 'Seller ID' },
        { id: 'item_name', name: 'Item Name' },
        { id: 'description', name: 'Description' },
        { id: 'price', name: 'Price' },
        { id: 'quantity', name: 'Quantity' },
        { id: 'size', name: 'Size' },
        { id: 'gender', name: 'Gender' },
        { id: 'color', name: 'Color' },
        { id: 'brand', name: 'Brand' },
        { id: 'picUrl', name: 'Post Image' },
    ];

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }

    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    const [sellerIdFilter, setSellerIdFilter] = useState('');
    const [sellpostIdFilter, setSellPostIdFilter] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/api/sellposts")
            .then(response => {
                rowchange(response.data);
            })
            .catch(error => {
                console.error("Error fetching sell posts:", error.message);
            });

    }, [])

    const handleFilterSubmit = () => {
        // Optionally, you can add additional logic here before applying the filter
        // For simplicity, we're directly setting the filter values in this example
        // You can add validation or modify the behavior based on your requirements

        // Apply the filters
        const filteredRows = rows.filter(row => 
            String(row.seller_id).toLowerCase().includes(sellerIdFilter.toLowerCase()) &&
            String(row.sellpost_id).toLowerCase().includes(sellpostIdFilter.toLowerCase())
        );
        
        // Update the state with the filtered rows
        setFilteredRows(filteredRows);
    }

    const [filteredRows, setFilteredRows] = useState([]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>SELL POST LIST</h1>

            {/* Input box for seller_id filter */}
            <TextField
                label="Filter by Seller ID"
                value={sellerIdFilter}
                onChange={(e) => setSellerIdFilter(e.target.value)}
                style={{ marginBottom: '10px', marginRight: '10px' }}
            />

            {/* Input box for sellpost_id filter */}
            <TextField
                label="Filter by Sell Post ID"
                value={sellpostIdFilter}
                onChange={(e) => setSellPostIdFilter(e.target.value)}
                style={{ marginBottom: '10px', marginRight: '10px' }}
            />

            {/* Filter button */}
            <Button variant="contained" color="primary" onClick={handleFilterSubmit} style={{ marginBottom: '10px' }}>
                Filter
            </Button>

            <Paper sx={{ width: '90%', marginLeft: '5%' }}>
                <TableContainer sx={{maxHeight:450}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row, i) => (
                                    <TableRow key={i}>
                                        {columns.map((column, i) => {
                                            if (column.id === 'picUrl') {
                                                return (
                                                    <TableCell key={i}>
                                                        <img src={row[column.id]} alt="Post Image" style={{ width: '50px', height: '50px' }} />
                                                    </TableCell>
                                                );
                                            } else {
                                                let value = row[column.id];
                                                return (
                                                    <TableCell key={value}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
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
}

export default SellPostTable;