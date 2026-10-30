import { createChatBookingRoute } from "@frankdmosquera/site-chat/server";

// Booking in the chat: the AI reads each reply into fields; the chat checks them and books through Booking CRM.
export const POST = createChatBookingRoute({ debug: process.env.NODE_ENV === "development" });
