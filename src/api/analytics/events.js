import api from "@/api/base/client";

const getSessionId = () => {
  let sessionId = localStorage.getItem("sway_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sway_session_id", sessionId);
  }

  return sessionId;
};

export const trackEvent = async (eventType, payload = {}) => {
  try {
    await api.post("/catalog/events/", {
      event_type: eventType,
      page_url: window.location.href,
      session_id: getSessionId(),
      ...payload,
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("[track_event_error]", error);
    }
  }
};
