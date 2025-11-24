import type { MetadataRoute } from "next";
import { THEME_COLORS } from "@/lib/utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Martijn van der Wijst Portfolio",
    short_name: "Martijn",
    description:
      "Portfolio van Martijn van der Wijst - Tech Lead UX met focus op design systems, accessibility en design tokens.",
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLORS.lightBackground,
    theme_color: THEME_COLORS.lightBackground,
    lang: "nl",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
