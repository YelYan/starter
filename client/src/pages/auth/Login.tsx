import React from "react";
import CommonForm from "@/components/common/Form";
import { loginformControls } from "@/config";

const Login = () => {
  function handleSubmit(data: Record<string, string>) {
    console.log(data);
  }
  return (
    <div>
      <CommonForm
        onSubmit={handleSubmit}
        formControls={loginformControls}
        buttonText="Login"
      />
    </div>
  );
};

export default Login;
