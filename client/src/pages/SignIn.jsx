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

    if (!formData.email || !formData.password) {
      dispatch(signInFailure("Please fill all the fields!"));
      return;
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "An error occurred"));
        return;
      }

      if (data.token) {
        dispatch(signInSuccess(data));
        localStorage.setItem("access_token", data.token);
        console.log("Token saved:", data.token);
        navigate("/");
      } else {
        dispatch(signInFailure("Token not found in response"));
      }
    } catch (error) {
      dispatch(signInFailure(error.message || "An unexpected error occurred"));
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('./b11.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      <div className="relative z-10 flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10 ">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <img
              src="./b3.png"
              alt=""
              className="mr-10 py-1 mt-6 rounded-lg items-center justify-center"
              style={{ width: "450px", height: "600px", objectFit: "cover" }}
            />
          </Link>
          <p className="text-lg mt-5 text-center font-semibold"></p>
        </div>

        <div
          className="flex-1 bg-black/60 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
          /* style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} */
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold mb-6 text-white">
              Sign In
            </h1>
            <div>
              <Label value="Your Email" className="text-sm text-white" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                className="w-full mt-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" className="text-sm text-white" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                className="w-full mt-2"
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
            <span className="text-white">Don't have an account?</span>
            <Link to="/sign-up" className="text-teal-300 font-semibold">
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
