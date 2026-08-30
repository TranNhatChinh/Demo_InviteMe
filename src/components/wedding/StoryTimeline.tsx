import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoryMilestone } from '../../types';
import { Calendar, Plus, Edit2, Trash2, MapPin, Heart, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Input, TextArea } from '../common/Input';

export const StoryTimeline: React.FC = () => {
  const { wedding, addStoryMilestone, updateStoryMilestone, deleteStoryMilestone } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<StoryMilestone | null>(null);

  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleOpenAdd = () => {
    setEditingMilestone(null);
    setYear(new Date().getFullYear().toString());
    setTitle('');
    setDescription('');
    setLocation('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: StoryMilestone) => {
    setEditingMilestone(m);
    setYear(m.year);
    setTitle(m.title);
    setDescription(m.description);
    setLocation(m.location || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !year.trim()) return;

    if (editingMilestone) {
      updateStoryMilestone(editingMilestone.id, {
        year,
        title,
        description,
        location,
      });
    } else {
      addStoryMilestone({
        year,
        title,
        description,
        location,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border/80 shadow-card space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Heart className="w-3 h-3 text-brand-accent fill-brand-accent" />
            <span>Our Journey</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-dark tracking-tight">
            Wedding Story Timeline
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted">
            The milestones that brought Emily and James together
          </p>
        </div>

        <Button
          variant="soft-pink"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={handleOpenAdd}
        >
          Add Milestone
        </Button>
      </div>

      {/* Timeline entries */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-brand-primary before:via-brand-soft before:to-brand-primary/20">
        {wedding.storyTimeline.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-1 w-5 h-5 rounded-full bg-white border-2 border-brand-primary flex items-center justify-center shadow-xs group-hover:scale-125 group-hover:bg-brand-primary transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-deep group-hover:bg-white" />
            </div>

            {/* Content card */}
            <div className="bg-brand-bg/40 rounded-xl p-5 border border-brand-border/70 hover:border-brand-primary/40 hover:bg-white transition-all shadow-subtle space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif font-bold text-xl sm:text-2xl text-brand-deep">
                      {item.year}
                    </span>
                    <span className="text-brand-border">•</span>
                    <span className="font-serif font-bold text-base sm:text-lg text-brand-dark">
                      {item.title}
                    </span>
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {/* Edit & Delete actions */}
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
                    title="Edit milestone"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {wedding.storyTimeline.length > 1 && (
                    <button
                      onClick={() => deleteStoryMilestone(item.id)}
                      className="p-1.5 text-brand-muted hover:text-brand-error hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-dark/80 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Milestone Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMilestone ? 'Edit Love Story Milestone' : 'Add Love Story Milestone'}
        subtitle="Chronicle the defining moments leading to your wedding day"
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Milestone
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Year / Date"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2018 or Oct 2021"
            />
            <div className="col-span-2">
              <Input
                label="Milestone Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. First Met, Proposed..."
              />
            </div>
          </div>

          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Kyoto, Japan or Saigon"
            icon={<MapPin className="w-3.5 h-3.5" />}
          />

          <TextArea
            label="Memory / Story Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the atmosphere, feelings, and memories of this special day..."
            rows={3}
          />
        </form>
      </Modal>
    </div>
  );
};
