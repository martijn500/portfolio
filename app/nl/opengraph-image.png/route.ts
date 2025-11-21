import { i18n } from "@/lib/i18n";
import { contentType, createImageResponse, size } from "@/lib/opengraph-renderer";

const t = i18n.nl;

export { contentType, size };

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  return createImageResponse(t, origin);
}
