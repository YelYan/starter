import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import Logo from "/favicon.svg";
import CommonForm from "@/components/common/Form";
import { loginformControls } from "@/config";
import { loginUser } from "@/store/authslice/authSlice";
import { useAppDispatch } from "@/store/hook";
import { ReqLoginFormT } from "@/types/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  function handleSubmit(data: ReqLoginFormT) {
    console.log(data);
    dispatch(loginUser(data))
      .unwrap()
      .then((result) => {
        console.log(result, "result");
        if (result.success) {
          toast({
            title: "Login Success",
            description: `${result.message}✅`,
          });
          navigate("/shop/home");
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Login Failed!",
          description: error,
          variant: "destructive",
          action: (
            <ToastAction className="bg-white text-black" altText="Try again">
              Try again
            </ToastAction>
          ),
        });
      });
  }
  return (
    <div className="max-w-md mx-auto space-y-8">
      <img src={Logo} alt="logo" className="w-8 h-8 mx-auto" />
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
