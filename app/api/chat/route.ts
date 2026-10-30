import { createChatRoute } from "@frankdmosquera/site-chat/server";
import { chatSite } from "@/data/chatSite";

// The corner chat's questions: Jev first, then the AI, from her own words.
export const POST = createChatRoute({ sites: [chatSite], debug: process.env.NODE_ENV === "development" });
