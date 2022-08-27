import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import isInputValid from "../utils/isInputValid";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import cogoToast from "cogo-toast";
import RestrictLoggedUser from "../components/RestrictLoggedUser";

function Login() {
  const navigate = useNavigate();
  const { auth, handleAuth } = useAuth();
  const location = useLocation();

  const originPath = location.state?.from?.pathname || "/welcome";

  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputVal;

  const { mutate } = useMutation(
    async (payload) => {
      const res = await axios.post("/login", payload);
      return await res.data;
    },
    {
      onSuccess: (data) => {
        handleAuth(data, originPath);
        setInputVal({ email: "", password: "" });
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
    const { email, password } = inputVal;
    if (!isInputValid(email, password)) {
      return alert("Missing Required Fields");
    }
    mutate({
      email,
      password,
    });
  };

  return (
    <RestrictLoggedUser>
      <div className="min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleFormSubmit}
          className="w-[400px] flex flex-col gap-4 p-4 border-[1px] rounded-md border-[#E6E6E633] bg-[#1A1B1C]"
        >
          <FormInput
            id="login-email"
            name="email"
            label="Email"
            type="email"
            value={email}
            handleChange={handleChange}
          />
          <FormInput
            id="login-password"
            name="password"
            label="Password"
            type="password"
            value={password}
            handleChange={handleChange}
          />
          <Button
            onClick={() =>
              navigate("/signup", { state: { from: { pathname: originPath } } })
            }
          >
            SignUp?
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </RestrictLoggedUser>
  );
}

export default Login;
