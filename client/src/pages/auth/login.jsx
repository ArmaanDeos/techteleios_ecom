import CustomForm from "@/components/common/CustomForm";
import { loginFormController } from "@/config/config"; // Ensure this is correctly defined
import { useToast } from "@/hooks/use-toast";

import { loginUser } from "@/redux/actions/auth.actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Oh Uhh! Something went wrong",
        description: "All fields are required. Please fill in all fields.",
        variant: "error",
      });
      return;
    }

    try {
      const res = await loginUser(dispatch, formData);
      console.log(res);

      if (res?.success) {
        toast({
          title: "Success",
          description: "Login successful. You can now continue shopping.",
          variant: "success",
        });
      } else {
        toast({
          title: "Login Failed",
          description: res.error.message, // Use the message from loginUser
          variant: "error",
        });
      }
    } catch (err) {
      if (err.message) {
        toast({
          title: "Oh Uhh! Something went wrong",
          description: "Invalid email or password. Please try again.",
          variant: "error",
          style: { background: "#f44336", color: "#fff" },
        });
      } else {
        toast({
          title: "Oh Uhh! Something went wrong",
          description: err.message || "An error occurred. Please try again.",
          variant: "error",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
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
