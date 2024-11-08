import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pull } from "../utils/axios";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await pull({
        method: "POST",
        url: "/login",
        data: {
          email,
          password,
        },
      });

      localStorage.setItem("access_token", response.data.access_token);
      console.log(response.data);

      nav("/home");
      Swal.fire({
        title: "Kamu Berhasil Login!",
        text: "You clicked the button!",
        icon: "success",
      });
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        title: `Error ${error.response.data.statusCode}!`,
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const { data } = await pull({
        method: "POST",
        url: "/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("username", data.username);
      Swal.fire({
        title: "Good job!",
        text: "Login Success!",
        icon: "success",
      });
      nav("/home");
    } catch (err) {
      console.log(err, "<<< err google login");
      Swal.fire({
        title: "Error!",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  }

  useEffect(() => {
    window.google.accounts?.id.initialize({
      client_id: "790980230336-2g0lnb7tcinggkmcdpr0vsgmj1vf1bj1.apps.googleusercontent.com",
      // client_id: import.meta.env.CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts?.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
    window.google.accounts.id.prompt();
  }, []);

  return (
    <div
      className="container min-h-screen bg-black-100"
      style={{ paddingTop: "6%", paddingBottom: "6%" }}
    >
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Login to Your Account
        </h2>
        <p className="text-gray-600 text-sm text-center">
          Please enter your email and password to log in.
        </p>

        <div>
          {/* Email Input */}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 block p-3 text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          {/* Password Input */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 block p-3 text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center mt-4 text-gray-600 text-sm">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:text-indigo-800"
          >
            Sign Up
          </Link>
        </div>
        {/* Button Group */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>

          <span className="text-black block text-center my-4">- OR -</span>

          <div
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            id="buttonDiv"
          >
            <img
              src="google-icon-url"
              alt="Google icon"
              className="w-5 h-5 mr-2"
            />{" "}
            {/* Replace `google-icon-url` with actual icon URL */}
            Continue with Google
          </div>
        </div>
      </form>
    </div>
  );
}
