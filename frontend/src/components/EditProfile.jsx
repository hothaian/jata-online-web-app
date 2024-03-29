/**
 * Author: An Ho
 */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from "./ImageHandle/ImageUploader";

const EditProfile = () => {
  const navigate = useNavigate();
 
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const { userLoggedIn, currentUser, setLoading } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: email,
    username: "",
    role_id: null,

    gender: "",
    date_of_birth: null,
    profile_pictureUrl: "",
    addresses: {
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });

  useEffect(() => {

   
    const fetchData = async () => {
      try {
        if (userLoggedIn && currentUser && currentUser.user_id) {
          const response = await fetch(
            `http://localhost:8080/api/user/${currentUser.user_id}`
          );
          if (response.ok) {
            const data = await response.json();
            
     
            const firstAddress = data.addresses && data.addresses.length > 0
            ? data.addresses[0]
            : {};

            setFormData({
              first_name: data.first_name || "",
              last_name: data.last_name || "",
              name: data.name || "",
              email: data.email || "",
              username: data.username || "",
              role_id: data.role_id || null,
              gender: data.gender || "",
              date_of_birth: data.date_of_birth || null,
              profile_pictureUrl: data.profile_pictureUrl || "",
              addresses: {
                street_address: firstAddress.street_address || "",
                city: firstAddress.city || "",
                state: firstAddress.state || "",
                zip_code: firstAddress.zip_code || "",
                country: firstAddress.country || "",
              },
            });
            
         
            

         
          } else {
            console.error("Error fetching user data:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    // Check if currentUser exists before logging the email
    if (currentUser && currentUser.email) {
      fetchData();
      console.log("🚀 ~ Initial~ formData:", formData)
      setFormData({ ...formData, email: currentUser.email });
    } else {
      console.log("Problem with get currentUser.email");
    }
  }, []);



  const handleUploadComplete = (downloadURL) => {
    // Update the picUrl in formData with the downloaded image URL
    console.log(downloadURL);
    setFormData((prevData) => ({
      ...prevData,
      profile_pictureUrl: downloadURL,
    }));
    console.log("🚀 ~ Uploaded Image~ formData:", formData)
    console.log("🚀 ~ EditProfile ~ formData:", formData.profile_pictureUrl)
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date_of_birth: date,
    });
  };
  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      addresses: {
        ...formData.addresses,
        [id]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("🚀 ~ handleSubmit ~ currentUser.user_id:", currentUser.user_id)
      const apiResponse = await fetch(`http://localhost:8080/api/user/${currentUser.user_id}`, {
        method: "PUT",
       
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      console.error("Error registering user:", error.message);
      setError(error.message);
    }
  };

  return (
    <section
      className="vh-110 bg-image"
      style={{
        backgroundImage:
          "url('https://hdwallpaperim.com/wp-content/uploads/2017/08/24/115307-minimalism-colorful.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-10">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Edit Profile
                  </h2>

                  <form onSubmit={handleSubmit} className="row g-3">
                    {/* Basic Information Section */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          {console.log("formData.email:", formData.email)}
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            disabled
                          />
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="username"
                            className="form-control form-control-lg"
                            value={formData.username}
                            onChange={handleChange}
                          />
                          <label className="form-label" htmlFor="username">
                            Username
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-row mb-4">
                          <div className="col">
                            <input
                              type="text"
                              id="first_name"
                              className="form-control form-control-lg"
                              value={formData.first_name}
                              onChange={handleChange}
                            />
                            <label className="form-label" htmlFor="first_name">
                              First Name
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          id="last_name"
                          className="form-control form-control-lg"
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="last_name">
                          Last Name
                        </label>
                      </div>
                    </div>
                    {/* Gender Select */}
                    <div className="row">
                      {/* Gender Select */}
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <select
                            id="gender"
                            className="form-control form-control-lg"
                            value={formData.gender}
                            onChange={handleChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <label className="form-label" htmlFor="gender">
                            Gender
                          </label>
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <DatePicker
                            id="date_of_birth"
                            selected={formData.date_of_birth}
                            onChange={handleDateChange}
                            className="form-control form-control-lg"
                            dateFormat="yyyy-MM-dd"
                            showTimeInput={false}
                            placeholderText="Select Date of Birth"
                          />
                          <label className="form-label" htmlFor="date_of_birth">
                            Date of Birth
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* Address Section */}
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="street_address"
                            className="form-control form-control-lg"
                            value={formData.addresses.street_address}
                            onChange={handleAddressChange}
                          />
                          <label
                            className="form-label"
                            htmlFor="street_address"
                          >
                            Street Address
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="city"
                            className="form-control form-control-lg"
                            value={formData.addresses.city}
                            onChange={handleAddressChange}
                          />
                          <label className="form-label" htmlFor="city">
                            City
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="state"
                            className="form-control form-control-lg"
                            value={formData.addresses.state}
                            onChange={handleAddressChange}
                          />
                          <label className="form-label" htmlFor="state">
                            State
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="zip_code"
                            className="form-control form-control-lg"
                            value={formData.addresses.zip_code}
                            onChange={handleAddressChange}
                          />
                          <label className="form-label" htmlFor="zip_code">
                            ZIP Code
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="country"
                            className="form-control form-control-lg"
                            value={formData.addresses.country}
                            onChange={handleAddressChange}
                          />
                          <label className="form-label" htmlFor="country">
                            Country
                          </label>
                        </div>
                      </div>

                      {/* Role Select */}
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <select
                            id="role_id"
                            className="form-control form-control-lg"
                            value={formData.role_id}
                            onChange={handleChange}
                          >
                            <option value="">Select Role</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                          </select>
                          <label className="form-label" htmlFor="role_id">
                            Role
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example3g"
                      >
                        I agree to all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>
                    <ImageUploader onUploadComplete={handleUploadComplete} />
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Save
                      </button>
                    </div>

                    {error && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {error}
                      </div>
                    )}


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
