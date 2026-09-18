import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Check empty fields
   if (!formData.name.trim()) {
     toast.error("Please enter your name");
     return;
   }

   if (!formData.email.trim()) {
     toast.error("Please enter your email");
     return;
   }

   if (!formData.password) {
     toast.error("Please enter your password");
     return;
   }

   // Check password length
   if (formData.password.length < 8) {
     toast.error("Password must be at least 8 characters");
     return;
   }

   setLoading(true);

   try {
     const response = await fetch("http://localhost:3000/api/users/register", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       credentials: "include",
       body: JSON.stringify(formData),
     });

     const data = await response.json();

     if (!response.ok) {
       throw new Error(data.message || "Registration failed");
     }

     toast.success("Account created successfully!");

     navigate("/");
   } catch (error) {
     toast.error(error.message);
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="border border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden">
          {/* Header */}
          <div className="px-7 pt-7 pb-5 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join Staybnb and discover amazing places to stay.
            </p>
          </div>

          <div className="px-7 py-6">
            {/* Error */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 mb-1.5"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 mb-1.5"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800 mb-1.5"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    minLength={8}
                    required
                    className="w-full h-12 px-4 pr-16 rounded-lg border border-gray-300 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-gray-500">
                  Password must be at least 6 characters.
                </p>
              </div>

              {/* Terms */}
              <p className="text-xs leading-5 text-gray-500">
                By signing up, you agree to our{" "}
                <span className="underline cursor-pointer">
                  Terms of Service
                </span>
                ,{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>{" "}
                and Cookie Policy.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-lg bg-[#FF385C] text-white font-semibold text-sm transition hover:bg-[#E61E4D] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />

              <span className="text-xs text-gray-500">OR</span>

              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="relative w-full h-12 rounded-lg border border-gray-800 bg-white text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              <span className="absolute left-4 font-bold text-base">G</span>
              Continue with Google
            </button>

            {/* Login */}
            <div className="text-center mt-6 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-900 underline hover:text-[#FF385C]"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="text-center mt-5">
          <span className="text-sm font-semibold text-[#FF385C]">Staybnb</span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
