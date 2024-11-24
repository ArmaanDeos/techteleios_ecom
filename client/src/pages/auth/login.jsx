import CustomForm from "@/components/common/CustomForm";
import { loginFormController } from "@/config/config"; // Ensure this is correctly defined
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/001/227/154/large_2x/miniature-shopping-cart-in-front-of-laptop-free-photo.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-lg border border-gray-200">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome Back!
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Sign in to access your account and continue shopping with{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              exclusive deals
            </span>
            .
          </p>
        </div>

        {/* Login Form */}
        <div className="mt-8">
          <CustomForm
            formcontrollers={loginFormController}
            buttonText={"Login"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account yet?{" "}
            <Link
              className="font-semibold text-blue-600 hover:underline"
              to="/auth/register"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
