import React from "react";
import { useActiveSection } from "@/lib/useActiveSection";

interface NavLinkProps {
  href: string;
  sectionId: string;
  children: React.ReactNode;
}

export default function NavLink({ href, sectionId, children }: NavLinkProps) {
  const activeSection = useActiveSection();
  const isActive = activeSection === sectionId;

  return (
    <a 
      href={href}
      className={
        `relative text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring ` +
        `h-full flex items-center px-0 before:content-[''] before:absolute before:-left-2 before:bottom-0 before:h-2 before:w-[calc(100%+1rem)] before:transition-opacity before:duration-200 before:rounded-t-md ` +
        (isActive
          ? "text-foreground before:opacity-100 before:bg-primary"
          : "text-muted-foreground hover:text-foreground before:opacity-0 before:bg-transparent")
      }
      role="menuitem"
    >
      {children}
    </a>
  );
}
