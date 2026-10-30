import { unstable_cache } from "next/cache";
import { createVoiceRoute } from "@frankdmosquera/site-chat/server";
import { chatSite } from "@/data/chatSite";

// The chat's fixed lines spoken aloud, each made by Google once per voice and kept in Next's shared cache.
export const GET = createVoiceRoute({ sites: [chatSite], cacheSound: (make) => unstable_cache(make, ["chat-voice"]) });
