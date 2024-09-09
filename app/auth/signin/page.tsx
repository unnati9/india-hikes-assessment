"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

import usersData from '../../usersData.json';

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        
        // Check if the user exists in usersData.json
        const user = usersData.find((user) => user.email === email && user.password === password);

        if (user) {
            // Successful login
            setErrorMessage("");
            alert("Login successful!");
            // Redirect or proceed to the dashboard
        } else {
            // Invalid credentials
            setErrorMessage("Invalid email or password");
        }

    }
    return (
        <div className="w-full max-w-[28rem] form-wrapper flex justify-center items-center content-center">
            <form onSubmit={handleSignIn} className="form border-yellow sign-in">
                <input required type="email" name="email" placeholder="Email Id" className="input focus:outline-green" />
                <input required type="password" name="password" placeholder="Password" className="input focus:outline-green" />
                <div className="text-xs flex items-center">
                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me" className="pl-2">Remember Me</label>
                </div>

                <button type="submit" className="bg-green py-2 rounded-xl text-white">Sign In</button>
                <Link href="/auth/reset-credentitals" className="text-xs text-center font-semibold">Forgot Password?</Link>
                <p className="text-xs text-center">Don&apos;t have an account? <Link href="/auth/register"  className="font-semibold">Sign up here</Link></p>
                {errorMessage && <p className="text-center text-sm border-2 border-red-400 p-2">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default SignIn;