"use client";

import { HeroBanner } from '@/components/public/about/hero-banner';
import { StorySection } from '@/components/public/about/story-section';
import { ValuesSection } from '@/components/public/about/values-section';
import { TeamSection } from '@/components/public/about/team-section';
import { MissionStatement } from '@/components/public/about/mission-statement';

export default function AboutClient() {
  return (
    <div className="min-h-screen pt-0 pb-20 bg-white">
      {/* Hero avec image de fond */}
      <HeroBanner />
      
      <div className="container mx-auto px-4">
        {/* Story Section */}
        <StorySection />

        {/* Values Section */}
        <ValuesSection />

        {/* Team Section */}
        <TeamSection />

        {/* Mission Statement */}
        <MissionStatement />
      </div>
    </div>
  );
} 