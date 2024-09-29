import { Loader } from "lucide-react";

type SpinnerProps = {
  className?: string
};

export const Spinner = ({ className }: SpinnerProps): JSX.Element => (
  <Loader className={`animate-spin text-muted-foreground ${className}`} />
);
