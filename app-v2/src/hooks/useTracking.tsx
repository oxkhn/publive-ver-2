// hooks/useTracking.ts

import { usePostTracking } from "@/api/tracking/usePostTracking";
import { useCallback } from "react";

interface TrackEventPayload {
  event: "page_view" | "interaction" | "login" | "logout";
  page?: string;
  timestamp?: string;
}

const useTracking = () => {
  const _getPostTracking = usePostTracking();

  const trackEvent = useCallback(async (payload: TrackEventPayload) => {
    try {
      const body = {
        event: payload.event,
        page: payload.page || null,
        timestamp: payload.timestamp || new Date().toISOString(),
      };

      const res = await _getPostTracking.mutateAsync(body);
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  }, []);

  return { trackEvent };
};

export default useTracking;
