import React from 'react';
import { useApp } from '../../context/AppContext';
import { StoryTimeline } from './StoryTimeline';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Edit3,
  ExternalLink,
  Users,
  Camera,
  Layers,
} from 'lucide-react';
import { Button } from '../common/Button';

export const WeddingOverview: React.FC = () => {
  const { wedding, setIsEditWeddingModalOpen, metrics } = useApp();

  const formattedDate = new Date(wedding.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Heart className="w-3 h-3 text-brand-accent fill-brand-accent" />
            <span>Wedding Master Profile</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            Wedding Management
          </h1>
          <p className="text-sm text-brand-muted">
            Configure couple identities, ceremony schedule, venue addresses, and love story timeline.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Edit3 className="w-4 h-4" />}
          onClick={() => setIsEditWeddingModalOpen(true)}
        >
          Edit Wedding Details
        </Button>
      </div>

      {/* Main Grid: Basic Info & Couple Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Basic Information Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-brand-border/80 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-brand-dark">
                Basic Information
              </h3>
              <p className="text-xs text-brand-muted">
                Official event metadata shared across invitations and guests
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-soft text-brand-deep border border-brand-primary/30">
              {wedding.weddingStyle}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-bg/50 p-4 rounded-xl border border-brand-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                Event Title
              </span>
              <p className="font-serif text-lg font-bold text-brand-dark">
                {wedding.name}
              </p>
            </div>

            <div className="bg-brand-bg/50 p-4 rounded-xl border border-brand-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                Wedding Hashtag
              </span>
              <p className="font-mono text-sm font-semibold text-brand-deep">
                {wedding.hashtag}
              </p>
            </div>

            <div className="bg-brand-bg/50 p-4 rounded-xl border border-brand-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                Ceremony & Reception Date
              </span>
              <p className="text-sm font-semibold text-brand-dark flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-accent" />
                {formattedDate}
              </p>
            </div>

            <div className="bg-brand-bg/50 p-4 rounded-xl border border-brand-border/60 space-y-1">
              <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                Color Palette & Theme
              </span>
              <div className="flex items-center gap-2 pt-0.5">
                <div className="flex -space-x-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#EFA3B5] border-2 border-white shadow-xs" title="Primary Pink" />
                  <span className="w-4 h-4 rounded-full bg-[#F8DDE3] border-2 border-white shadow-xs" title="Soft Pink" />
                  <span className="w-4 h-4 rounded-full bg-[#FFF7F8] border-2 border-white shadow-xs" title="Blush Ivory" />
                  <span className="w-4 h-4 rounded-full bg-[#A94F68] border-2 border-white shadow-xs" title="Deep Rose" />
                </div>
                <span className="text-xs font-medium text-brand-dark">{wedding.theme}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-blush/40 to-brand-soft/30 border border-brand-primary/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-brand-deep flex items-center justify-center shadow-xs">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-dark">Guest Registry Capacity</p>
                <p className="text-[11px] text-brand-muted">{metrics.totalGuests} Guests Invited • {wedding.totalTables} Banquet Tables</p>
              </div>
            </div>
            <span className="font-serif text-lg font-bold text-brand-deep">
              {metrics.expectedHeadcount} Expected
            </span>
          </div>
        </div>

        {/* Couple Information (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-brand-border/80 shadow-card space-y-6">
          <div className="border-b border-brand-border/60 pb-4">
            <h3 className="font-serif text-xl font-bold text-brand-dark">
              Couple Information
            </h3>
            <p className="text-xs text-brand-muted">
              Bride and Groom profile details
            </p>
          </div>

          {/* Bride Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-brand-blush/60 to-white border border-brand-primary/30">
            <img
              src={wedding.brideAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={wedding.brideName}
              className="w-14 h-14 rounded-full object-cover border-2 border-brand-primary shadow-xs"
            />
            <div className="space-y-0.5 flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-accent">
                The Bride
              </span>
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                {wedding.brideName}
              </h4>
              <p className="text-xs text-brand-muted">emily.nguyen@inviteme.io</p>
            </div>
          </div>

          {/* Groom Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-brand-border">
            <img
              src={wedding.groomAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
              alt={wedding.groomName}
              className="w-14 h-14 rounded-full object-cover border-2 border-brand-dark/20 shadow-xs"
            />
            <div className="space-y-0.5 flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted">
                The Groom
              </span>
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                {wedding.groomName}
              </h4>
              <p className="text-xs text-brand-muted">james.tran@inviteme.io</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venues Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ceremony Venue */}
        <div className="bg-white rounded-2xl overflow-hidden border border-brand-border/80 shadow-card flex flex-col justify-between">
          <div className="relative h-48 w-full overflow-hidden bg-brand-dark">
            <img
              src={wedding.ceremonyVenue.imageUrl}
              alt={wedding.ceremonyVenue.name}
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-deep text-white">
                Ceremony
              </span>
              <h4 className="font-serif text-xl font-bold mt-1">
                {wedding.ceremonyVenue.name}
              </h4>
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-brand-dark">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>{wedding.ceremonyVenue.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-brand-dark">
              <Clock className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Time Window: {wedding.ceremonyVenue.time}</span>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed bg-brand-bg/60 p-3 rounded-lg border border-brand-border/50">
              {wedding.ceremonyVenue.notes}
            </p>
          </div>
        </div>

        {/* Reception Venue */}
        <div className="bg-white rounded-2xl overflow-hidden border border-brand-border/80 shadow-card flex flex-col justify-between">
          <div className="relative h-48 w-full overflow-hidden bg-brand-dark">
            <img
              src={wedding.receptionVenue.imageUrl}
              alt={wedding.receptionVenue.name}
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-primary text-white">
                Reception Banquet
              </span>
              <h4 className="font-serif text-xl font-bold mt-1">
                {wedding.receptionVenue.name}
              </h4>
            </div>
          </div>

          <div className="p-6 space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-brand-dark">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>{wedding.receptionVenue.address}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-brand-dark">
              <Clock className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Time Window: {wedding.receptionVenue.time}</span>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed bg-brand-bg/60 p-3 rounded-lg border border-brand-border/50">
              {wedding.receptionVenue.notes}
            </p>
          </div>
        </div>
      </div>

      {/* Love Story Timeline */}
      <StoryTimeline />
    </div>
  );
};
