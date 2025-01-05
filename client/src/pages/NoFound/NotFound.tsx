import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h5 className="text-2xl font-bold">Page did not found 👀</h5>
      <Button onClick={() => navigate("/shop/home")}>Go back home</Button>
    </div>
  );
};

export default NotFound;
