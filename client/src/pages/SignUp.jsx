import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-300">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 mr-10 mt-20">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <img
              src="./b1.png"
              alt="Navoda"
              className="mr-10 py-1 rounded-lg items-center justify-center"
              style={{ width: "450px", height: "450px", objectFit: "cover" }}
            />
          </Link>
          <p className="text-lg mt-5 text-center font-semibold">
            
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold mb-6 text-red-800">
              Create New Account
            </h1>
            <div>
              <Label value="Your Username" className="text-sm" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="w-full"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-red-800 font-semibold">
              Sign In
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
