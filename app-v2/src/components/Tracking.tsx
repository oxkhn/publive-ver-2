// components/Tracking.tsx
"use client";
import { useEffect } from "react";
import useTracking from "../hooks/useTracking";
import { usePathname } from "next/navigation";

const Tracking = () => {
  const pathname = usePathname();
  const { trackEvent } = useTracking();

  useEffect(() => {
    if (pathname) {
      trackEvent({
        event: "page_view",
        page: pathname,
      });
    }
  }, [pathname, trackEvent]);

  return null;
};

export default Tracking;
