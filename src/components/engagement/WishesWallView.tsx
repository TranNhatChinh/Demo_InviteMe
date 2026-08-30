import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LeaveWishModal } from './LeaveWishModal';
import { Button } from '../common/Button';
import { SearchInput } from '../common/Input';
import {
  MessageSquareHeart,
  Heart,
  Plus,
  Sparkles,
  Share2,
  ThumbsUp,
} from 'lucide-react';
import { clsx } from 'clsx';

export const WishesWallView: React.FC = () => {
  const { wishes, metrics, wedding } = useApp();
  const { t, formatNumber, translateRelationship, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredWishes = wishes.filter((w) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      w.guestName.toLowerCase().includes(q) ||
      w.message.toLowerCase().includes(q) ||
      w.relationship.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <MessageSquareHeart className="w-3.5 h-3.5 text-brand-accent" />
            <span>{language === 'vi' ? 'Sổ lưu bút số' : 'Digital Guestbook'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.wishes.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.wishes.subtitle}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          {t.wishes.leaveWishBtn}
        </Button>
      </div>

      {/* Filter & Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-3xl border border-brand-border shadow-card">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-lg text-brand-dark">
            {formatNumber(wishes.length)} {t.wishes.recordedWishes}
          </span>
          <span className="text-xs text-brand-muted">• {language === 'vi' ? 'Tất cả khách mời' : 'All guests'}</span>
        </div>

        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => setSearch('')}
            placeholder={language === 'vi' ? 'Tìm theo tên hoặc lời chúc...' : 'Search by name or message...'}
          />
        </div>
      </div>

      {/* Masonry / Grid of Wish Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWishes.map((item) => {
          const isLiked = likedIds[item.id];
          const likes = item.likesCount + (isLiked ? 1 : 0);

          return (
            <div
              key={item.id}
              className={clsx(
                'bg-white rounded-3xl p-6 border shadow-card hover:shadow-hover transition-all flex flex-col justify-between space-y-4 relative group',
                item.isFeatured ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-brand-border'
              )}
            >
              {item.isFeatured && (
                <span className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent text-white text-[9px] uppercase font-bold tracking-wider shadow-xs">
                  {t.wishes.featuredBlessing}
                </span>
              )}

              {/* Message */}
              <div className="space-y-3">
                <p className="font-serif italic text-sm sm:text-base text-brand-dark leading-relaxed font-normal">
                  "{item.message}"
                </p>
              </div>

              {/* Author & Actions */}
              <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={
                      item.guestAvatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'
                    }
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-brand-border shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-brand-dark truncate">{item.guestName}</p>
                    <p className="text-[11px] text-brand-muted truncate">{translateRelationship(item.relationship)}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleLike(item.id)}
                  className={clsx(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors shrink-0 border',
                    isLiked
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-brand-bg/60 text-brand-muted border-brand-border hover:bg-brand-soft/40'
                  )}
                >
                  <Heart className={clsx('w-3.5 h-3.5', isLiked && 'fill-rose-600 text-rose-600')} />
                  <span>{likes}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <LeaveWishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
