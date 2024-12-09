import { useState,navigate } from "react";
import "./Login.css"; // Link to CSS

const LoginForm = () => {
  // State for both login and sign-up form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [error, setErrors] = useState({});

  // validation states
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  // State for toggling between login and signup
  const [isLogin, setIsLogin] = useState(true); // true = login, false = sign-up

  // Toggle function between login and sign-up
  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between the two forms
  };

  // Password visibility toggle
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Name validation
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
    const isValid = nameRegex.test(name) && name.trim().length > 2;
    setIsNameValid(isValid);
    setNameError(isValid ? "" : "Name must contain only letters and spaces and be at least 3 characters long.");
    return isValid;
  };

  // Email validation (using a regex)
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    setEmailError(isValid ? "" : "Invalid email format");
    return isValid;
  };

  // Password validation for login and signup

  const validatePassword = (password) => {
    const minLength = 8;
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumber = /\d/.test(password);
    // const hasSpecialChar = /[\W_]/.test(password);

    const isValid =
      password.length >= minLength ;
      // hasUpperCase &&
      // hasLowerCase &&
      // hasNumber &&
      // hasSpecialChar;

    setIsPasswordValid(isValid);
    setPasswordError(
      isValid
        ? ""
        : "Password must be at least 8 characters, contain upper/lowercase, a number, and a special character"
    );
    return isValid;
  };

  // confirm password validation

  const validateConfirmPassword = (confirmPassword) => {
    const isValid = confirmPassword === password;
    setIsConfirmPasswordValid(isValid);
    setConfirmPasswordError(
      isValid
      ? ''
      :'password does not match'
    );
    return isValid;
  };

  // Handle input changes for real-time validation

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value); // Validate after every letter typed
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  // Handle form submission

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const newErrors = {};

  //   if (!validateName(name)) {
  //     newErrors.name = "Name must contain only letters and spaces";
  //   }

  //   if (!validateEmail(email)) {
  //     newErrors.email = "Invalid email format";
  //   }

  //   if (!validatePassword(password)) {
  //     newErrors.password =
  //       "Password must be at least 8 characters, contain upper/lowercase, a number, and a special character";
  //   }

  //   if (!validateConfirmPassword(confirmPassword)) {
  //     newErrors.confirmPassword = "Passwords does not match";
  //   }

  //   setErrors(newErrors);

  //   if (validateEmail(email) && validatePassword(password)) {
  //     console.log("Login form submitted:", { email, password });
  //   }

  //   if (
  //     validateName(name) &&
  //     validateEmail(email) &&
  //     validatePassword(password) &&
  //     validateConfirmPassword(confirmPassword)
  //   ) {
  //     console.log("Signup form submitted :", { name, email, password });
  //   }

  //   if ( isEmailValid && isPasswordValid) {
  //     if (isLogin) {
  //       console.log("Login form submitted:", { email, password });
  //     } else {
  //       // For signup form
  //       if (password !== confirmPassword &&(isNameValid && isEmailValid && isPasswordValid)) {
  //         setConfirmPasswordError("Passwords do not match");
  //       } else {
  //         console.log("Signup form submitted:", { name, email, password });
  //       }
  //     }
  //   }
  // };



   // Handle form submission
   const handleSubmit = (event) => {
     event.preventDefault();

     // Perform validation checks before submission
     const isNameValid = validateName(name);
     const isEmailValid = validateEmail(email);
     const isPasswordValid = validatePassword(password);
     const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

     // If all fields are valid, proceed with form submission
     if (isLogin && isEmailValid && isPasswordValid) {
       console.log("Login form submitted:", { email, password });
     } else if (
       isNameValid &&
       isEmailValid &&
       isPasswordValid &&
       isConfirmPasswordValid
     ) {
       console.log("Signup form submitted:", { name, email, password });
     }
      
   };



  return (
    <div className="login_page">
      <h1>SOS SHOPPING CART</h1>

      <div className="login-container">
        {/* Conditional rendering based on isLogin */}
        {isLogin ? (
          <>
            {/* Login Form */}
            <h2>Login Form</h2>
            <form
              onSubmit={handleSubmit}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSubmit(event);
                }
              }}
            >
              <div className="input-group">
                <label>Email</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    className={
                      emailError ? "error" : isEmailValid ? "valid" : ""
                    }
                    placeholder="Enter your email"
                  />
                  <img
                    src="src/assets/email.png"
                    alt="email icon"
                    className="icon"
                  />
                </div>

                {emailError && <p className="error-message">{setEmailError}</p>}
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className={
                      passwordError ? "error" : isPasswordValid ? "valid" : ""
                    }
                    placeholder="Enter your password"
                  />
                  <img
                    onClick={togglePasswordVisibility}
                    src={
                      passwordVisible
                        ? "src/assets/password.png"
                        : "src/assets/password.invisible.png"
                    }
                    alt="password icon"
                    className="icon"
                  />
                </div>
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>

              <button type="submit">Login</button>
            </form>
            <p onClick={toggleForm} className="toggle">
              Don't have an account? Sign Up
            </p>
          </>
        ) : (
          <>
            {/* Sign-up Form */}
            <h2>Sign-up Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={nameError ? "error" : isNameValid ? "valid" : ""}
                  placeholder="Enter your name"
                />
                {/* {nameError && <p className="error-message">{nameError}</p>} */}
              </div>

              <div className="input-group">
                <label>Email</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    className={
                      emailError ? "error" : isEmailValid ? "valid" : ""
                    }
                    placeholder="Enter your email"
                  />
                  <img
                    src="src/assets/email.png"
                    alt="email icon"
                    className="icon"
                  />
                </div>
                {emailError && <p className="error-message">{emailError}</p>}
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    name="key"
                    onChange={handlePasswordChange}
                    className={
                      passwordError ? "error" : isPasswordValid ? "valid" : ""
                    }
                    placeholder="Enter your password"
                  />
                  <img
                    onClick={togglePasswordVisibility}
                    src={
                      passwordVisible
                        ? "src/assets/password.png"
                        : "src/assets/password.invisible.png"
                    }
                    alt="password icon"
                    className="icon"
                  />
                </div>
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={confirmPassword}
                    name="key"
                    onChange={handleConfirmPasswordChange}
                    className={
                      confirmPasswordError
                        ? "error"
                        : isConfirmPasswordValid
                        ? "valid"
                        : ""
                    }
                    placeholder="Confirm your password"
                  />
                  {error.confirmPassword && (
                    <p className="error-message">{error.confirmPassword}</p>
                  )}

                  <img
                    onClick={togglePasswordVisibility}
                    src={
                      passwordVisible
                        ? "src/assets/password.png"
                        : "src/assets/password.invisible.png"
                    }
                    alt="password icon"
                    className="icon"
                  />
                </div>
              </div>

              <button type="submit">Sign Up</button>
            </form>
            <p onClick={toggleForm} className="toggle">
              Already have an account? Login
            </p>
          </>
        )}
      </div>

      {/* <p className="quote">
        "Freshness Delivered, Quality You Can Trust <br />
        Your Neighborhood Grocery Store."
      </p> */}
    </div>
  );
};

export default LoginForm;
