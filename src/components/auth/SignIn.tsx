import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
function SignIn({ setLogin }: { setLogin: (login: boolean) => void }) {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [message, setMessage] = useState("");

  const onSubmit = async (submittedData: any) => {
    setMessage("");
    const { email, password } = submittedData;
    console.log(submittedData);
    console.log(SERVER_URL);
    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.status);
      if (response.status === 200) {
        const data = await response.json();
        console.log("response", data);

        if (submittedData["remember-me"]) {
          console.log("remember me!");
          // localStorage.setItem("token", data.token);
        }
        sessionStorage.setItem("token", data.accessToken);
        navigate("/");
      } else {
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-content">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2 form-control">
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-md"
                    {...register("email", { required: true })}
                  />
                  {errors["email"] && (
                    <span className="text-error">This field is required</span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-content"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-md"
                    {...register("password", { required: true })}
                  />
                  {errors["password"] && (
                    <span className="text-danger">This field is required</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded"
                    {...register("remember-me")}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 "
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a href="#" className="link font-semibold link-primary">
                    Forgot password?
                  </a>
                </div>
              </div>
              {message && <p className="text-error">{message}</p>}
              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6 ">
              <button
                onClick={() => setLogin(false)}
                className="btn btn-outline btn-primary w-full"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
