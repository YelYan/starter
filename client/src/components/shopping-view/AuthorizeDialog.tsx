import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/store/hook";

type AuthorizeDialogT = {
  actionButton: React.ReactNode;
};

const AuthorizeDialog = ({ actionButton }: AuthorizeDialogT) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const checkAuthenticated = isAuthenticated && user;

  if (checkAuthenticated) return <>{actionButton}</>;

  return (
    <Dialog>
      <DialogTrigger asChild>{actionButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login or Register</DialogTitle>
          <DialogDescription aria-label="about login and register">
            Please login or register to add cart or checkout
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="primary" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
          <Button variant="outline" onClick={() => navigate("/auth/register")}>
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorizeDialog;
