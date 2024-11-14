import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic form validation
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill all the fields!"));
      return;
    }
  
    try {
      dispatch(signInStart());
  
      // Sending the POST request to the sign-in endpoint
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Ensure response is in JSON format
      const data = await res.json();
  
      // Handle errors from the response
      if (!res.ok) {
        // This will handle any non-OK status codes (e.g., 400 or 500)
        dispatch(signInFailure(data.message || "An error occurred"));
        return;
      }
  
      // Successful login
      if (data.token) {
        dispatch(signInSuccess(data));  // Dispatch the success action
        localStorage.setItem("access_token", data.token);  // Store the token
        console.log("Token saved:", data.token);
        navigate("/");  // Redirect after successful sign-in
      } else {
        // In case the response doesn't include a token (shouldn't happen in theory)
        dispatch(signInFailure("Token not found in response"));
      }
  
    } catch (error) {
      // Catch any other errors (network, etc.)
      dispatch(signInFailure(error.message || "An unexpected error occurred"));
    }
  };
  

  return (
    <div className="min-h-screen bg-yellow-300">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
        <div className="flex-1">
        <Link to="/" className="font-bold dark:text-white text-4xl">
            <img
              src="./b3.png"
              alt=""
              className="mr-10 py-1 rounded-lg items-center justify-center"
              style={{ width: "450px", height: "600px", objectFit: "cover" }}
            />
          </Link>
          <p className="text-lg mt-5 text-center font-semibold">
            
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold mb-6 text-red-800">
              Sign In to Your Banana Account
            </h1>
            <div>
              <Label value="Your Email" className="text-sm" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                className="w-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" className="text-sm" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                className="w-full"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone={"tealToLime"}
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading..</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-red-800 font-semibold">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
