import React from 'react';
import { useApp } from '../../context/AppContext';
import { WeddingHeroCard } from './WeddingHeroCard';
import { MetricCards } from './MetricCards';
import { RSVPPreview } from './RSVPPreview';
import { PreparationTasks } from './PreparationTasks';
import { ActivityFeed } from './ActivityFeed';
import { Sparkles, Heart, Bell, Send, UserPlus, Share2 } from 'lucide-react';
import { Button } from '../common/Button';

export const CoupleDashboard: React.FC = () => {
  const {
    currentUser,
    wedding,
    setIsAddGuestModalOpen,
    setIsImportModalOpen,
    batchSendInvitations,
    setCurrentView,
  } = useApp();

  // Greeting based on time of day
  const getGreeting = () => {
    return 'Good evening, Emily 👋';
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span>Wedding Operations Console</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {getGreeting()}
          </h1>
          <p className="text-sm text-brand-muted">
            Your big day is getting closer. Here is the latest overview for {wedding.name}.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => setIsImportModalOpen(true)}
          >
            Import Guests
          </Button>

          <Button
            variant="soft-pink"
            size="sm"
            icon={<Send className="w-4 h-4" />}
            onClick={batchSendInvitations}
          >
            Broadcast Invites
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Heart className="w-4 h-4" />}
            onClick={() => setCurrentView('guest-list')}
          >
            Manage Guests
          </Button>
        </div>
      </div>

      {/* Hero Card */}
      <WeddingHeroCard />

      {/* 6 Key Metric Cards */}
      <MetricCards />

      {/* Analytics Preview (Donut + Velocity Chart + Groups) */}
      <RSVPPreview />

      {/* Two-column Bottom Section: Tasks & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <PreparationTasks />
        </div>
        <div className="lg:col-span-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};
