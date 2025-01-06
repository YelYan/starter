import { useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/Form";
import { loginformControls } from "@/config";

const Login = () => {
  const navigate = useNavigate();
  function handleSubmit(data: Record<string, string>) {
    console.log(data);
  }
  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-center text-2xl font-medium">
        <span className="text-blue-500">Login</span> to Your Account
      </h1>
      <CommonForm
        onSubmit={handleSubmit}
        formControls={loginformControls}
        buttonText="Login"
      />
      <p className="text-center">
        Doesn't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer underline"
          onClick={() => navigate("/auth/register")}
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
