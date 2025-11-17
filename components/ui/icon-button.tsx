import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type IconButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

export default function IconButton({ className, asChild = false, ...props }: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      {...(props as any)}
      className={cn(
        "rounded-md opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none bg-transparent p-2",
        className
      )}
    />
  );
}

export { IconButton };
