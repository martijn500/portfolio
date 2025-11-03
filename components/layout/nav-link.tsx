import React from "react";
import { useActiveSection } from "@/lib/hooks/use-active-section";

interface NavLinkProps {
  href: string;
  sectionId: string;
  children: React.ReactNode;
  "data-section"?: string;
}

export default function NavLink({ href, sectionId, children, ...props }: NavLinkProps) {
  const activeSection = useActiveSection();
  const isActive = activeSection === sectionId;

  return (
    <a 
      href={href}
      className={
        `relative text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring ` +
        `h-full flex items-center px-0 ` +
        (isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground")
      }
      role="menuitem"
      {...props}
    >
      {children}
    </a>
  );
}
