// components/Tracking.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useTracking from '../hooks/useTracking';

const Tracking = () => {
  const router = useRouter();
  const { trackEvent } = useTracking();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackEvent({
        event: 'page_view',
        page: url,
      });
    };

    // Gửi sự kiện khi tải trang đầu tiên
    handleRouteChange(router.pathname);

    // Gửi sự kiện khi thay đổi route
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, trackEvent]);

  return null;
};

export default Tracking;
