import { useState } from "react";
import "./styles.css"; // Import CSS file

function Login() {
    const [userType, setUserType] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isValidating, setIsValidating] = useState(false); // New state for validation status

    // Email validation function using Regex
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Handling form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsValidating(true); // Start validation

        // Validate email format
        if (!validateEmail(email)) {
            setMessage("Invalid email format!");
            setIsValidating(false);
            return;
        }

        // Check if credentials match (dummy validation)
        if (email === "admin@example.com" && password === "1234") {
            setMessage("Login Successful!");
        } else {
            setMessage("Invalid Credentials!");
        }
        setIsValidating(false); // End validation
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setMessage(""); // Clear message when user types
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setMessage(""); // Clear message when user types
    };

    const isFormValid = validateEmail(email) && password.length > 0 && userType;

    return (
        <div className="container">
            {/* Government Logo & Title */}
            <div className="header">
                <img src="/emblem.png" alt="Emblem of India" className="emblem" />
                <h2>Government of India</h2>
                <h3>Ministry of Agriculture and Farmers Welfare</h3>
                <h4>Department of Agriculture and Farmers Welfare</h4>
                <img src="/soil_health_logo.png" alt="Soil Health Logo" className="soil-logo" />
            </div>

            <h2>Sign in</h2>

            <form onSubmit={handleSubmit}>
                {/* User Type Dropdown with Label */}
                <div className="input-container">
                    <label>Usertype <sup className="required">*</sup></label>
                    <select 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)} 
                    >
                        <option value="" disabled hidden>None</option>
                        <option value="central_user">Central User</option>
                        <option value="scheme_admin">Scheme Admin</option>
                        <option value="state_user">State User</option>
                        <option value="district_user">District User</option>
                        <option value="stl">STL</option>
                        <option value="supervisor">Supervisor</option>
                    </select>
                </div>

                {/* Username/Email Input with Label */}
                <div className="input-container">
                    <label>Username/Email <sup className="required">*</sup></label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={handleChangeEmail}
                        placeholder="Enter valid username" 
                        required 
                    />
                </div>

                {/* Password Input with Label */}
                <div className="input-container">
                    <label>Password <sup className="required">*</sup></label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handleChangePassword}
                        placeholder="Enter password" 
                        required 
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isValidating || !isFormValid}>
                    {isValidating ? "Validating..." : "Login"}
                </button>
            </form>

            {/* Display login message */}
            <p className={`message ${message === "Invalid Credentials!" || message === "Invalid email format!" ? 'error' : message === "Validating..." ? 'info' : 'success'}`}>
                {message || (isValidating && "Validating...")}
            </p>

            {/* User Registration Link */}
            <div className="registration-link">
                <p>
                    <a href="/register" className="register-link">User Registration</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
