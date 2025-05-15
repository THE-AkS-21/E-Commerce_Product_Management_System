import React, { useState } from 'react'
import { useNavigate } from "react-router";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useAuth } from "~/auth/useAuth";
import {LoadingScreen} from "../../../components";

const LogIn = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setErrorMessage("Please enter both username and password.");
            return;
        }

        setLoading(true); // Start loading

        try {
            await login(username, password);
            console.log("Login Successful! ✅");
            setShowSplash(true); // Show LoadingScreen
            setTimeout(() => {
                setShowSplash(false);
                navigate("/dashboard");
            }, 2000); // 2 sec splash before dashboard
        } catch (error) {
            // Handle login error (e.g., invalid credentials)
            console.error("Login failed:", error);
            setErrorMessage("Invalid username or password. Please try again.");
        } finally {
            setLoading(false); // Stop loading after login attempt
        }
    };

    const handleRegister = async () => {
        navigate("/register");
    };

    if (showSplash) {
        return <LoadingScreen onComplete={() => {}} />;
    }

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

                                    {/* Password Input */}
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="form-input placeholder:Text-gray-100"
                                    />

                                    {/* Error Message Display */}
                                    {errorMessage && (
                                        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
                                    )}

                                    {/* Sign In Button */}
                                    <ButtonComponent
                                        type="button"
                                        className="button-class !bg-primary-100 !h-11 !w-full md:w-[240px]"
                                        onClick={handleLogin}
                                        disabled={loading} // Disable when loading
                                    >
                                        <span className="p-16-semibold text-white">
                                            {loading ? 'Logging in...' : 'SIGN IN'}
                                        </span>
                                    </ButtonComponent>

                                    {/* Register Button */}
                                    <ButtonComponent
                                        type="button"
                                        className="button-class !bg-primary-100 !h-11 !w-full md:w-[240px]"
                                        onClick={handleRegister}
                                    >
                                        <span className="p-16-semibold text-white">REGISTER</span>
                                    </ButtonComponent>
                                </div>
                            </form>
                        </section>
                    </header>
                </div>
            </section>
        </main>
    )
}

export default LogIn;
