import React, { useRef } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthProvider";
import Button from "../components/Button";

const BASE_URL = "http://localhost:5000/images/";

function Welcome() {
  const { auth, setAuth, handleLogout } = useAuth();
  const fileRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    mutate(formData);
  };

  const { mutate } = useMutation(
    async (values) => {
      const res = await axios.patch("/updateMe", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return await res.data;
    },
    {
      onSuccess: ({ data }) => {
        const newData = {
          ...auth,
          user: {
            ...auth.user,
            photo: data.user?.photo,
          },
        };
        localStorage.setItem("token", JSON.stringify(newData));
        setAuth(newData);
      },
      onError: () => {
        console.log("Error");
      },
    }
  );

  return (
    <ProtectedRoute>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4 p-12 border-[1px] rounded-md border-[#E6E6E633] bg-[#1A1B1C]">
          <div
            onClick={() => fileRef.current.click()}
            className="w-[100px] h-[100px] border-[1px] border-[#E6E6E633] bg-[#1A1B1C] rounded-full overflow-hidden "
          >
            <img
              className="w-full h-full object-cover"
              src={`${BASE_URL}/${auth?.user?.photo}`}
              alt="Profile"
              title="Your Profile Picture"
              width={100}
              height={100}
            />
          </div>
          <h3 className=" text-2xl">{auth?.user?.name}</h3>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-0 h-0"
          />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Welcome;
