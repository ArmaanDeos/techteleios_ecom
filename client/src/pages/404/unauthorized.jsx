import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <Alert
        variant="destructive"
        className="max-w-md bg-gray-800 border-gray-700 shadow-lg rounded-lg"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <div>
            <AlertTitle className="text-lg font-semibold">
              Access Denied
            </AlertTitle>
            <AlertDescription className="mt-1 text-gray-400">
              You are not authorized to access this page. 😔
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default Unauthorized;
