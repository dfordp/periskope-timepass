import { FiMessageCircle } from "react-icons/fi";
import { Button } from "./ui/button";

export function FloatingButton() {
  return (
    <div className="absolute bottom-6 right-6">
      <Button
        className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
      >
        <FiMessageCircle className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}