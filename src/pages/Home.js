import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import RestrictLoggedUser from "../components/RestrictLoggedUser";

function Home() {
  let navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <RestrictLoggedUser>
      <div className="h-screen w-full  flex justify-center items-center">
        <div className="flex gap-5">
          <Button onClick={() => handleRedirect("/login")}>Login</Button>
          <Button onClick={() => handleRedirect("/signup")}>SignUp</Button>
        </div>
      </div>
    </RestrictLoggedUser>
  );
}

export default Home;
