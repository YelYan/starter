import React from "react";
import CommonForm from "@/components/common/Form";
import { registerformControls } from "@/config";

const Register = () => {
  function handleSubmit(data: Record<string, string>) {
    console.log(data);
  }
  return (
    <div>
      <CommonForm
        onSubmit={handleSubmit}
        formControls={registerformControls}
        buttonText="Register"
      />
    </div>
  );
};

export default Register;
