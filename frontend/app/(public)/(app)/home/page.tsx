'use client';

import { WelcomeHeader } from './components/welcome-header';
import { VideoCarousel } from './components/video-carousel';
import { FeaturedNews } from './components/featured-news';
import { WarningWidget } from './components/warning-widget';
import { CalendarWidget } from './components/calendar-widget';
import { NewsListWidget } from './components/news-list-widget';
import { useIsMobile } from '@/hooks/use-mobile';

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 space-y-8">
      {/* Header Section */}
      <WelcomeHeader />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Warning & Calendar */}
        <div className="md:col-span-3 space-y-6">
          <WarningWidget />
          {!isMobile && <CalendarWidget />}
        </div>

        {/* Center Column: Featured News & Video Carousel */}
        <div className="md:col-span-6 space-y-8">
          {/* Featured News (Large Card) */}
          <section>
            <FeaturedNews
            />
          </section>

          {/* Video Carousel */}
          <section>
            <VideoCarousel />
          </section>
        </div>

        {/* Right Column: News List */}
        <div className="md:col-span-3 space-y-6">
          {/* Warning Widget */}
          <NewsListWidget />
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;