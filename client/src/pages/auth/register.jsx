import CustomForm from "@/components/common/CustomForm";
import { registerFormController } from "@/config/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/redux/actions/auth.actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Oh Uhh! Something went wrong",
        description: "All fields are required. Please fill in all fields.",
        variant: "error",
      });
      return;
    }

    try {
      const response = await registerUser(dispatch, formData);
      if (response.success) {
        toast({
          title: "Success",
          description: "Registration successful. You can now log in.",
          variant: "success",
        });
        navigate("/auth/login");
      }
    } catch (err) {
      // Show toast error for specific cases
      if (err.message) {
        toast({
          title: "Oh Uhh! Something went wrong",
          description: "A user with this email or username already exists.",
          variant: "error",
          style: { border: "2px solid #f44336" },
        });
      } else {
        toast({
          title: "Error",
          description: err.message || "Registration failed. Please try again.",
          variant: "error",
          style: { border: "2px solid #f44336" },
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
            Create Your Account
          </h1>
          <p className="text-lg font-medium">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Join us
            </span>{" "}
            and start shopping with exclusive deals and offers!
          </p>
        </div>

        {/* Registration Form */}
        <div className="mt-8">
          <CustomForm
            formcontrollers={registerFormController}
            buttonText={"Create Account"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              className="font-semibold text-blue-600 hover:underline"
              to="/auth/login"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
