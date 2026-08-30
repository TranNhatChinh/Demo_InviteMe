import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Input, TextArea } from '../common/Input';
import { Button } from '../common/Button';
import { Heart, Calendar, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';

export const EditWeddingModal: React.FC = () => {
  const { wedding, updateWedding, isEditWeddingModalOpen, setIsEditWeddingModalOpen } = useApp();

  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate);
  const [weddingTime, setWeddingTime] = useState(wedding.weddingTime);
  const [weddingStyle, setWeddingStyle] = useState(wedding.weddingStyle);
  const [theme, setTheme] = useState(wedding.theme);
  const [hashtag, setHashtag] = useState(wedding.hashtag);

  // Ceremony
  const [ceremonyName, setCeremonyName] = useState(wedding.ceremonyVenue.name);
  const [ceremonyAddress, setCeremonyAddress] = useState(wedding.ceremonyVenue.address);
  const [ceremonyTime, setCeremonyTime] = useState(wedding.ceremonyVenue.time);

  // Reception
  const [receptionName, setReceptionName] = useState(wedding.receptionVenue.name);
  const [receptionAddress, setReceptionAddress] = useState(wedding.receptionVenue.address);
  const [receptionTime, setReceptionTime] = useState(wedding.receptionVenue.time);

  useEffect(() => {
    if (isEditWeddingModalOpen) {
      setBrideName(wedding.brideName);
      setGroomName(wedding.groomName);
      setWeddingDate(wedding.weddingDate);
      setWeddingTime(wedding.weddingTime);
      setWeddingStyle(wedding.weddingStyle);
      setTheme(wedding.theme);
      setHashtag(wedding.hashtag);
      setCeremonyName(wedding.ceremonyVenue.name);
      setCeremonyAddress(wedding.ceremonyVenue.address);
      setCeremonyTime(wedding.ceremonyVenue.time);
      setReceptionName(wedding.receptionVenue.name);
      setReceptionAddress(wedding.receptionVenue.address);
      setReceptionTime(wedding.receptionVenue.time);
    }
  }, [isEditWeddingModalOpen, wedding]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWedding({
      brideName,
      groomName,
      name: `${brideName} & ${groomName} Wedding`,
      weddingDate,
      weddingTime,
      weddingStyle,
      theme,
      hashtag,
      ceremonyVenue: {
        ...wedding.ceremonyVenue,
        name: ceremonyName,
        address: ceremonyAddress,
        time: ceremonyTime,
      },
      receptionVenue: {
        ...wedding.receptionVenue,
        name: receptionName,
        address: receptionAddress,
        time: receptionTime,
      },
    });
    setIsEditWeddingModalOpen(false);
  };

  return (
    <Modal
      isOpen={isEditWeddingModalOpen}
      onClose={() => setIsEditWeddingModalOpen(false)}
      title="Edit Wedding Details"
      subtitle="Update couple profiles, date, schedule, and venue settings"
      maxWidth="2xl"
      footer={
        <>
          <Button variant="ghost" onClick={() => setIsEditWeddingModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Couple Names */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
            Couple Profiles
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Bride's Full Name"
              required
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
            />
            <Input
              label="Groom's Full Name"
              required
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
            />
          </div>
        </div>

        {/* Date & Aesthetic */}
        <div className="space-y-3 pt-2 border-t border-brand-border/60">
          <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-accent" />
            Schedule & Aesthetics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Wedding Date"
              type="date"
              required
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
            />
            <Input
              label="Reception Time"
              value={weddingTime}
              onChange={(e) => setWeddingTime(e.target.value)}
              placeholder="17:30"
            />
            <Input
              label="Wedding Hashtag"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              placeholder="#EmilyAndJames2026"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Wedding Style"
              value={weddingStyle}
              onChange={(e) => setWeddingStyle(e.target.value)}
              placeholder="e.g. Modern Romantic"
            />
            <Input
              label="Color Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="e.g. Blush Pink & Ivory"
            />
          </div>
        </div>

        {/* Ceremony Venue */}
        <div className="space-y-3 pt-2 border-t border-brand-border/60">
          <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            Ceremony Venue
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Ceremony Location Name"
              value={ceremonyName}
              onChange={(e) => setCeremonyName(e.target.value)}
            />
            <Input
              label="Ceremony Time Window"
              value={ceremonyTime}
              onChange={(e) => setCeremonyTime(e.target.value)}
              placeholder="14:00 - 15:30"
            />
          </div>
          <Input
            label="Ceremony Physical Address"
            value={ceremonyAddress}
            onChange={(e) => setCeremonyAddress(e.target.value)}
          />
        </div>

        {/* Reception Venue */}
        <div className="space-y-3 pt-2 border-t border-brand-border/60">
          <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            Reception Venue
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Reception Location Name"
              value={receptionName}
              onChange={(e) => setReceptionName(e.target.value)}
            />
            <Input
              label="Reception Time Window"
              value={receptionTime}
              onChange={(e) => setReceptionTime(e.target.value)}
              placeholder="18:00 - 22:00"
            />
          </div>
          <Input
            label="Reception Physical Address"
            value={receptionAddress}
            onChange={(e) => setReceptionAddress(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};
