import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import CommonForm from "@/components/common/Form";
import { registerformControls } from "@/config";
import { registerUser } from "@/store/authslice/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ReqRegisterFormT } from "@/types/auth";
import Logo from "/favicon.svg";

const Register = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const { toast } = useToast();

  function handleSubmit(data: ReqRegisterFormT) {
    console.log(data);
    dispath(registerUser(data))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast({
            title: "Register Success",
            description: "You have successfully registered✅",
          });
          navigate("/auth/login");
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Register Failed",
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
    <div className="max-w-md mx-auto space-y-3">
      <img src={Logo} alt="logo" className="w-8 h-8 mx-auto" />
      <h1 className="text-center text-2xl font-medium">
        <span className="text-blue-500">Create</span> Your New Account
      </h1>
      <CommonForm
        onSubmit={handleSubmit}
        formControls={registerformControls}
        buttonText="Register"
        isLoading={isLoading}
      />
      <p className="text-center">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer underline"
          onClick={() => navigate("/auth/login")}
        >
          Login Here
        </span>
      </p>
    </div>
  );
};

export default Register;
