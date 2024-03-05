import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../Charts/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const AllUserTable = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
       
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },

    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "role_id",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role_id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role_id === "admin"
                ? colors.greenAccent[600]
                : role_id === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role_id === 1 && <AdminPanelSettingsOutlinedIcon />}    
            {role_id === 2 && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {role_id === 1 && 'Admin'}    
            {role_id === 2 && 'User'}
            </Typography>
          </Box>
        );
      },
    },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   flex: 1,
    //   renderCell: ({ id }) => (
    //     <Button
    //       variant="contained"
    //       color="error"
    //       onClick={() => handleDeleteUser(id)}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,
      renderCell: ({ id }) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleEditUser(id)}
        >
          Edit
        </Button>
      ),
    },
  ];



  const handleDeleteUser = async (userId) => {
    try {
      // Send a request to delete the user by ID
      await axios.delete(`http://localhost:8080/user/${userId}`);

      // Update the user data by fetching the latest data
      const response = await axios.get("http://localhost:8080/user");
      setUserData(response.data);

      console.log("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = async (userId) => {
    // Do any processing you need with userId
    
    // Redirect to /edituser with userID as a parameter
   navigate(`/edit-user/${userId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        setUserData(formatData(response.data));

        if (response.data.length === 0) {
          console.log("Received an empty array from the server.");
        } else {
          console.log("Get the User Table Succeed !");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatData = (data) => {
    // Map through the data and format each row with only ID and Email fields
    return data.map((user) => ({
      id: user.user_id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      gender: user.gender,
      role_id:user.role_id,
    }));
  };

  
  return (
    <Box m="20px">
      <Header title="User Board" subtitle="Managing the user and their role" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={userData}
          columns={columns}
          selectionModel={selectedUsers}
          onSelectionModelChange={(newSelection) =>
            setSelectedUsers(newSelection.selectionModel)
          }
        />
      </Box>
    </Box>
  );
};

export default AllUserTable;
