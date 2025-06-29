import { Button } from "@/components/ui/shadcn/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  className?: string;
}

export default function DeleteButton({
  onClick,
  text = "Delete",
  className = "",
}: DeleteButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`hover:text-destructive cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Trash2 className="h-4 w-4 mr-1" />
      <span className="pr-1">{text}</span>
    </Button>
  );
}
