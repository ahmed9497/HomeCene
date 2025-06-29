"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const [isVerify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    // if (!email) return toast.error("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    } else {
      setError("");
    }

    try {
      // const res = await signInWithEmailAndPassword(email, password);
      // console.log({res});
      // sessionStorage.setItem('user', 'true')
      // setEmail('');
      // setCode('');
      // router.push('/account/profile')
      if (!isVerify && email) {
        setLoading(true);
        const res = await fetch("/api/sendLoginCode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
          toast.success(data?.message, { theme: "light" });
          setVerify(true);
          return;
        } else {
          toast.error(data.error);
        }
      } else {
        if (!code) return toast.error("Code is required");

        setLoading(true);
        const response = await fetch("/api/verifyCode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("authToken", data.token);

          const { token } = data;

          const auth = getAuth();
          await signInWithCustomToken(auth, token);

          router.replace("/");
        } else {
          toast.error(data.error);
        }
      }
    } catch (e) {
      console.log("Err", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex ">
      <div className="basis-full sm:basis-1/2">
        <div className="h-full w-full bg-[url('/login-bg.jpeg')] bg-cover bg-end"></div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 sm:top-0 sm:translate-y-0 sm:relative sm:basis-1/2 sm:bg-gradient-to-t from-[#757F9A] to-[#D7DDE8] p-10 flex justify-center items-center  sm:shadow-xl sm:w-96">
        <div className="pb-10 pt-10 px-4 bg-white rounded-xl border border-white">
          <Link href={"/"} className="h-[80px] mb-5 flex justify-center">
            <img src={"/logo.png"} className=" h-full" />
          </Link>
          <h1 className=" text-2xl mb-2 text-primary">Sign In</h1>
          <p className="text-gray-900 mb-3">
            Enter your email and we'll send you a login code
          </p>
          <label className="text-gray-500">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={isVerify}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full p-3 mb-1 bg-gray-300 rounded outline-none text-primary placeholder-gray-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {isVerify && (
            <>
              <label className="text-gray-500">Code</label>
              <input
                type="code"
                placeholder="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-300 rounded outline-none text-primary placeholder-gray-500"
              />
            </>
          )}
          <button
            onClick={handleSignIn}
            className="w-full p-3 flex justify-center gap-x-2 items-center mt-2 bg-slate-600 rounded border text-white text-xl hover:text-white hover:bg-primary"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
