import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { registerUser } from "~/api/auth-api";
import { roles } from "~/constants";

const Register = () => {
    // State for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);  // For loading state
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // For error message
    const navigate = useNavigate();
    
    // Navigate to login page
    const handleLogin = async () => {
        navigate("/");
    };

    // Handle the registration logic
    const handleRegister = async () => {
        // Form validation
        if (!username || !email || !password || !role) {
            setErrorMessage("All fields are required.");
            return;
        }

        setLoading(true); // Show loading state while registering
        setErrorMessage(null); // Reset previous error messages

        try {
            await registerUser({ username, email, password, role });
            console.log("Registration successful! ✅");
            alert("Registration successful! Please log in.");
            navigate("/log-in");  // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage("Registration failed. Please try again."); // Display error message
        } finally {
            setLoading(false); // Hide loading state after request completion
        }
    };

    return (
        <main className="auth">
            <section className="size-full glassmorphism flex-center px-6">
                <div className="sign-in-card">
                    <header className="header">
                        <section className="mt-2.5 wrapper-md">
                            <form className="product-form">
                                <div>
                                    {/* Username Input */}
                                    <input
                                        type="text"
                                        value={username}
                                        id="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                        className="form-input placeholder:Text-gray-100"
                                    />

                                    {/* Email Input */}
                                    <input
                                        type="email"
                                        value={email}
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="E-mail"
                                        className="form-input placeholder:Text-gray-100"
                                    />

                                    {/* Password Input */}
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="form-input placeholder:Text-gray-100"
                                    />

                                    {/* Role Dropdown */}
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="form-input placeholder:Text-gray-100"
                                    >
                                        <option value="" disabled>Select Role</option>
                                        {roles.map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>

                                    {/* Error Message Display */}
                                    {errorMessage && (
                                        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
                                    )}

                                    {/* Register Button */}
                                    <ButtonComponent
                                        type="button"
                                        className="button-class !bg-primary-100 !h-11 !w-full md:w-[240px]"
                                        onClick={handleRegister}
                                        disabled={loading} // Disable button when loading
                                    >
                                        <span className="p-16-semibold text-white">
                                            {loading ? 'Registering...' : 'REGISTER'}
                                        </span>
                                    </ButtonComponent>

                                    {/* Sign In Button */}
                                    <ButtonComponent
                                        type="button"
                                        className="button-class !bg-gray-200 !h-11 !w-full md:w-[240px] "
                                        onClick={handleLogin}
                                    >
                                        <span className="p-16-semibold text-primary-100">SIGN IN</span>
                                    </ButtonComponent>
                                </div>
                            </form>
                        </section>
                    </header>
                </div>
            </section>
        </main>
    );
};

export default Register;
