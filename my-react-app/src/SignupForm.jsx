import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

export default function SignupForm() {
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setSuccess("");

    console.log("Submitting:", data);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Backend Response:", result);

      if (result.success) {
        setSuccess("Signup successful! (Connected to backend)");
        reset();
      } else {
        alert("Signup failed from backend!");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Unable to reach backend server");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <h2>Signup Form</h2>

        {success && <p className="success">{success}</p>}

        {/* Name */}
        <label>Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" }
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {/* Role */}
        <label>Select Role</label>
        <select {...register("role", { required: "Role is required" })}>
          <option value="">-- Choose --</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
        </select>
        {errors.role && <p className="error">{errors.role.message}</p>}

        {/* Checkbox */}
        <label className="checkbox-row">
          <input
            type="checkbox"
            {...register("agree", {
              required: "You must agree to continue"
            })}
          />
          I agree to the terms & conditions
        </label>
        {errors.agree && <p className="error">{errors.agree.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
