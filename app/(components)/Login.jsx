"use client";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConnectDB from "../(db)/db";
import { toast } from "react-toastify";

function LoginForm() {
  const [hide, setHide] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleButtonClick = () => {
    setHide(!hide);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      toast.info("All Fields Are Required");
    } else {
      try {
        const response = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });
        if (!response.ok) {
          toast.error("Invalid Credentials");
        } else {
          toast.success("Login Successfully");
          router.push("details");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <form
          onSubmit={handleLogin}
          className="w-[400px] h-[500px] bg-transparent shadow-xl border-2 mt-20 justify-center items-center gap-10 flex flex-col "
        >
          <h1 className="text-center text-3xl font-bold text-white">LOGIN </h1>
          <div className="input1 ml-4">
            <p className="text-xl font-semibold text-white mb-2">Username</p>
            <input
              type="text"
              name="username"
              id="username"
              className="border-2 px-2 border-white text-white rounded-md w-[350px] h-[40px] bg-transparent"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input2 ml-4">
            <p className="text-xl font-semibold text-white mb-2">Password</p>

            <input
              type={hide ? "password" : "text"}
              name="password"
              id="pass"
              value={password}
              className="border-2 px-2 border-white text-white rounded-md w-[350px] h-[40px] bg-transparent"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="w-[200px] py-2 border-2 font-bold bg-green-400 text-white rounded-lg">
            Login
          </button>
        </form>
        <button
          className="relative top-[110px] right-10 text-gray-500"
          onClick={handleButtonClick}
        >
          {" "}
          {hide ? <FaEye /> : <FaRegEyeSlash />}
        </button>
      </section>
    </>
  );
}

export default LoginForm;
