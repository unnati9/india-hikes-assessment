"use client";
import { User } from "@/pages/api/register";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

type RegisterUser = User & {
  confirmPassword: string;
};

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  dateOfBirth: "",
  weight: "",
  height: "",
  phoneNumber: "",
  city: "",
  companyOrCollege: "",
  designation: "",
  referrerEmail: "",
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterUser>(initialData);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "height") {
      // Format height input as the user types
      const formattedValue = formatHeight(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formatHeight = (value: string): string => {
    // Need to enhance the logic
    // Remove non-numeric characters except for feet and inches symbols
    const numericValue = value.replace(/[^0-9'"]+/g, "");

    // Split into feet and inches
    const parts = numericValue.split("'");
    const feet = parts[0];
    const inches = parts[1] ? parts[1].replace(/"/g, "") : "";

    // Reformat the value
    let formatted = feet ? `${feet}'` : "";
    if (inches) {
      formatted += ` ${inches}"`;
    }

    return formatted.trim();
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleNextStep = () => {
    // Validate Step 1 inputs
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.gender ||
      !formData.dateOfBirth
    ) {
      setErrorMessage("Please fill out all required fields in Step 1.");
    } else {
      if (formData.password.length < 6) {
        setErrorMessage("Passwords should be atleast 6 character long.");
        setSuccessMessage("");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match");
        setSuccessMessage("");
        return;
      }
      setErrorMessage("");
      setStep(2);
    }
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        setSuccessMessage(
          "Successfully Registered! We have sent you an email. Please confirm your email and login as a “Registered Trekker”"
        );
        setStep(1);
        setFormData(initialData);
      } else {
        setSuccessMessage("");
        setErrorMessage(data.error);
        setStep(1);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[34rem] flex flex-col gap-2">
      {successMessage && (
        <p className="bg-green text-white p-2 rounded-xl">{successMessage}</p>
      )}
      <form onSubmit={handleSignUp} className="form border-yellow sign-up">
        {step === 1 && (
          <>
            <div className="flex gap-2 w-full justify-between ">
              <input
                onChange={handleChange}
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input w-full"
                value={formData.firstName}
              />
              <input
                onChange={handleChange}
                value={formData.lastName}
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input w-full"
              />
            </div>
            <div className="flex gap-2 w-full justify-between ">
              <select
                name="gender"
                id="gender"
                className="input w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                onChange={handleChange}
                value={formData.dateOfBirth}
                required
                type="date"
                name="dateOfBirth"
                id="date"
                className="input w-full"
              />
            </div>

            <input
              onChange={handleChange}
              required
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              className="input"
              value={formData.phoneNumber}
            />

            <input
              onChange={handleChange}
              required
              type="email"
              name="email"
              placeholder="Email Id"
              className="input"
              value={formData.email}
            />
            <div className="flex gap-2 w-full justify-between ">
              <input
                onChange={handleChange}
                required
                type="password"
                name="password"
                minLength={6}
                placeholder="Password"
                className="input w-full"
                value={formData.password}
              />
              <input
                onChange={handleChange}
                required
                type="password"
                name="confirmPassword"
                minLength={6}
                placeholder="Confirm Password"
                className="input w-full"
                value={formData.confirmPassword}
              />
            </div>

            <button
              type="button"
              className="bg-yellow py-2 rounded-xl text-black"
              onClick={handleNextStep}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-between flex-wrap sm:flex-nowrap">
              <button
                onClick={handlePreviousStep}
                className="bg-green text-white py-2 px-4 rounded-xl"
              >
                Previous
              </button>
            </div>
            <div className="flex gap-2 w-full justify-between flex-wrap sm:flex-nowrap">
              <input
                onChange={handleChange}
                required
                type="number"
                name="weight"
                placeholder="Weight (in kg)"
                className="input w-full"
                value={formData.weight}
              />
              {/* Need to work on height input */}
              <input
                onChange={handleChange}
                required
                type="text"
                name="height"
                placeholder="Height (feet)"
                className="input w-full"
                value={formData.height}
              />
            </div>

            <input
              onChange={handleChange}
              required
              type="text"
              name="city"
              placeholder="City"
              className="input"
            />

            <input
              onChange={handleChange}
              required
              type="text"
              name="companyOrCollege"
              placeholder="Company / College"
              className="input"
            />

            <input
              onChange={handleChange}
              type="designation"
              name="designation"
              placeholder="Designation"
              className="input"
            />

            <div className="flex flex-col text-sm">
              <p className="font-bold">Who referred you?</p>
              <p>Please enter their email id (we would like to thank them)</p>
            </div>
            <input
              onChange={handleChange}
              type="email"
              name="referrerEmail"
              placeholder="Referrer Email Id"
              className="input"
            />
            <button
              type="submit"
              className="bg-yellow py-2 rounded-xl text-black"
            >
              Create Account
            </button>
          </>
        )}

        <p className="text-xs text-center">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-semibold">
            Sign in here
          </Link>
        </p>
        {errorMessage && (
          <p className="text-center text-sm border-2 border-red-400 p-2">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
