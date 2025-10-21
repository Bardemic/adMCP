import { oAuthDiscoveryMetadata } from "better-auth/plugins";
import { auth } from "@/lib/server/auth";

export const GET = oAuthDiscoveryMetadata(auth);


