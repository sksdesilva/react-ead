import React, { useState } from "react";


function Login() {
  // const [hotelRegNo, setHotelRegNo] = useState("");
  // const [password, setPassword] = useState("");
  // const [hotelRegNoError, setHotelRegNoError] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  // const handleHotelRegNoChange = (event) => {
  //   setHotelRegNo(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Validate the form
  //   let isValid = true;

  //   if (hotelRegNo.trim() === "") {
  //     setHotelRegNoError("Hotel Registration No. is required.");
  //     isValid = false;
  //   } else {
  //     setHotelRegNoError("");
  //   }

  //   if (password.trim() === "") {
  //     setPasswordError("Password is required.");
  //     isValid = false;
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (isValid) {
  //     try {
  //       // Hash the password before sending it
  //       const hashedPassword = await bcrypt.hash(password, 10);

  //       const Login = {
  //         hotelRegNo,
  //         password: hashedPassword, // Use the hashed password
  //       };

  //       axios.post(`http://localhost:8000/Hotel/profile/login`, Login)
  //         .then((response) => {
  //           const hotelRegNum = response.data.Login.hotelRegNo; // extract the hotelRegNo from the response
  //           window.location.href = `/partner-portal/hotel/dashboard/${hotelRegNum}`; // navigate to the hotel dashboard page
  //         })
  //         .catch((error) => {
  //           alert(error.response.data.msg);
  //         });
  //     } catch (error) {
  //       console.error("Error hashing the password", error);
  //     }
  //   }
  // };

  return (
    <form className="login-form">
  <img src="https://www.freeiconspng.com/thumbs/retail-store-icon/retail-shop-icon-3.png" className="img-hol" alt="hotelimg"></img>
  <h1 className="login-form__title">Store Login</h1>
  
  <div className="login-form__group">
    <label htmlFor="hotelRegNo" className="login-form__label">
      Hotel Registration No.
    </label>
    <input
      type="text"
      id="hotelRegNo"
      className="login-form__input"
      placeholder="Hotel Registration Number"
    />
  </div>
  
  <div className="login-form__group">
    <label htmlFor="password" className="login-form__label">
      Password
    </label>
    <input
      type="password"
      id="password"
      className="login-form__input"
      placeholder="Password"
    />
  </div>
  
  <button type="submit" className="login-form__button">
    Login
  </button>
</form>
  );
}

export default Login;
