import React from "react";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  sectionId: string;
  children: React.ReactNode;
  "data-section"?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function NavLink({ href, sectionId, children, className, ...props }: NavLinkProps) {
  const activeSection = useActiveSection();
  const isActive = activeSection === sectionId;

  return (
    <a 
      href={href}
      className={cn(
  "relative flex h-full items-center rounded-full px-3 text-sm transition-colors",

        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      role="menuitem"
      {...props}
    >
      {children}
    </a>
  );
}
