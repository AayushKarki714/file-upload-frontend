import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import isInputValid from "../utils/isInputValid";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import cogoToast from "cogo-toast";
import RestrictLoggedUser from "../components/RestrictLoggedUser";

function Signup() {
  const { auth, handleAuth } = useAuth();
  const location = useLocation();
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = inputVal;

  const originPath = location.state?.from?.pathname || "/welcome";

  const { mutate } = useMutation(
    async (payload) => {
      const res = await axios.post("/signup", payload);
      return await res.data;
    },
    {
      onSuccess: (data) => {
        handleAuth(data, originPath);
        setInputVal({ name: "", email: "", password: "", confirmPassword: "" });
        cogoToast.success("SuccessFull");
      },
      onError: (error) => {
        cogoToast.error(error.response?.data?.message);
      },
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputVal({
      ...inputVal,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = inputVal;
    if (!isInputValid(name, email, password, confirmPassword)) {
      return alert("Missing Required Fields");
    }
    mutate({
      name,
      email,
      password,
      passwordConfirm: confirmPassword,
    });
  };

  if (auth) {
    return <Navigate to={originPath} />;
  }

  return (
    <RestrictLoggedUser>
      <div className="min-h-screen flex justify-center items-center">
        <form
          className="w-[400px] flex flex-col gap-4 p-4 border-[1px] rounded-md border-[#E6E6E633] bg-[#1A1B1C]"
          onSubmit={handleFormSubmit}
        >
          <FormInput
            id="signup-username"
            name="name"
            label="Username"
            value={name}
            handleChange={handleChange}
          />
          <FormInput
            id="signup-email"
            name="email"
            label="Email"
            type="email"
            value={email}
            handleChange={handleChange}
          />
          <FormInput
            id="signup-password"
            name="password"
            label="Password"
            type="password"
            value={password}
            handleChange={handleChange}
          />
          <FormInput
            id="signup-confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            handleChange={handleChange}
          />
          <Button type="submit" className=" mt-5">
            Submit
          </Button>
        </form>
      </div>
    </RestrictLoggedUser>
  );
}

export default Signup;
