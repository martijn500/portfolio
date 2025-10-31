import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border-transparent bg-foreground/10 text-foreground rounded-full px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0"
)

function Badge({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants(), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
