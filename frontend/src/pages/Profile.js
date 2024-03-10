import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,

} from "mdb-react-ui-kit";

import avartar from "../images/avartar.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashBoard from "./DashBoard";

export default function Profile() {
  const initialAddress = {
    address_id: null,
    user_id: null,
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    createdAt: "",
    updatedAt: "",
  };

  const initialUser = {
    user_id: null,
    username: "",
    email: "",
    role_id: null,
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    profile_pictureUrl: "",
    createdAt: "",
    updatedAt: "",
    addresses: [initialAddress],
  };

  const [user, setUser] = useState(initialUser);
  const { currentUser, userLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userLoggedIn && currentUser && currentUser.user_id) {
          const response = await fetch(
            `http://localhost:8080/api/user/${currentUser.user_id}`
          );
          if (response.ok) {
            const data = await response.json();

            const mappedUser = {
              user_id: data.user_id,
              username: data.username,
              email: data.email,
              role_id: data.role_id,
              first_name: data.first_name,
              last_name: data.last_name,
              gender: data.gender,
              date_of_birth: data.date_of_birth,
              profile_pictureUrl: data.profile_pictureUrl,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,

              // Map Addresses
              addresses: data.addresses
                ? data.addresses.map((address) => ({
                    address_id: address.address_id,
                    user_id: address.user_id,
                    street_address: address.street_address,
                    city: address.city,
                    state: address.state,
                    zip_code: address.zip_code,
                    country: address.country,
                    createdAt: address.createdAt,
                    updatedAt: address.updatedAt,
                  }))
                : [],
            };

            setUser(mappedUser);
            console.log("🚀 ~ Profile ~ user:", user);
          } else {
            console.error("Error fetching user data:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (!loading && !userLoggedIn) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [userLoggedIn, loading]);

  const handleEditProfile = () => {
    // Navigate to the EditProfile page when the button is clicked
    navigate("/edit-profile"); // Replace with the actual route path for EditProfile
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={
                    user.profile_pictureUrl ? user.profile_pictureUrl : 'https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png'
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />

                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={handleEditProfile} outline className="ms-1">
                    Edit Profile
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.first_name} {user.last_name}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.gender}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.role_id === 1
                        ? "Admin"
                        : user.role_id === 2
                        ? "User"
                        : "Unknown Role"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user.addresses.length > 0 && (
                        <div>
                          {/* First line: Street Address */}
                          <p>{user.addresses[0].street_address}</p>
                          {/* Second line: City, State, Country */}
                          <p>
                            {user.addresses[0].city}, {user.addresses[0].state},{" "}
                            {user.addresses[0].country}
                          </p>
                        </div>
                      )}
                    </MDBCardText>{" "}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <DashBoard />
    </section>
  );
}
