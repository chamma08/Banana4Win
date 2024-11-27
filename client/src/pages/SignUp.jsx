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
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('b4.jpg')`,
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative flex p-5 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-8 text-white">
        <div className="flex-1 mr-10 mt-10">
          <Link to="/" className="font-bold text-4xl">
            <img
              src="./b1.png"
              alt=""
              className="py-1 rounded-lg items-center justify-center shadow-lg"
              /* style={{ width: "450px", height: "450px", objectFit: "cover" }} */
            />
          </Link>
        </div>

        <div className="flex-1 bg-black/60 p-6 rounded-lg shadow-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-center font-bold mb-6">
              Create New Account
            </h1>
            <div>
              <Label value="Your Username" className="text-sm text-white" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="w-full mt-2"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" className="text-sm text-white" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                className="w-full mt"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" className="text-sm text-white" />
              <TextInput
                type="password"
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-teal-300 font-semibold">
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
