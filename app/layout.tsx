import "./globals.css";

import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
title: "Martijn van der Wijst – Tech Lead UX & Design Systems",
description: "UX specialist / Tech Lead UX – design systems, tokens, accessibility.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html suppressHydrationWarning>
<body className="min-h-screen">{children}</body>
</html>
);
}