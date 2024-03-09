/**
 * Author: An Ho
 */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setUserLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    password: "",

    username: "",
    role_id: null,

    gender: "",
    date_of_birth: null,
    profile_pictureUrl: "",
    address: {
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
    },
  });

  const [error, setError] = useState(null);

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
      address: {
        ...formData.address,
        [id]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      const apiResponse = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const user = await doCreateUserWithEmailAndPassword(email, password);

      if (apiResponse.ok) {
        console.log("User registered successfully!");
        setCurrentUser({ uid: user.uid, displayName: name, email });
        setUserLoggedIn(true);
        navigate("/");
      } else {
        console.error(
          "Error registering user:",
          apiResponse.status,
          apiResponse.statusText
        );
        setError("Failed to register user. Please try again.");
      }
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
            <div className="col-12 col-md-9 col-lg-7 col-xl-12">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    {/* Basic Information Section */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            value={formData.email}
                            onChange={handleChange}
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
                    <div className="col-md-6">
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
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
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
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
                            value={formData.address.street_address}
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
                            value={formData.address.city}
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
                            value={formData.address.state}
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
                            value={formData.address.zip_code}
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
                            value={formData.address.country}
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

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    {error && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {error}
                      </div>
                    )}

                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account?
                      <Link to="/login" className="text-body">
                        {" "}
                        Log In
                      </Link>
                    </p>
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

export default SignUp;
