import { oAuthProtectedResourceMetadata } from "better-auth/plugins";
import { auth } from "@/lib/server/auth";

export const GET = oAuthProtectedResourceMetadata(auth);


