import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { CheckCircle2, Circle, Plus, Sparkles, CheckSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '../common/Button';

export const PreparationTasks: React.FC = () => {
  const { tasks, toggleTask, addTask, metrics } = useApp();
  const { t, language } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), 'logistics');
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  const translateTaskTitle = (title: string) => {
    if (language !== 'vi') return title;
    const lower = title.toLowerCase();
    if (lower.includes('create wedding page') || lower.includes('tạo trang')) return 'Tạo trang thiệp cưới';
    if (lower.includes('upload couple photos') || lower.includes('ảnh cưới')) return 'Đăng tải hình ảnh cặp đôi';
    if (lower.includes('import guest list') || lower.includes('nhập danh sách')) return 'Nhập danh sách khách mời';
    if (lower.includes('send invitations') || lower.includes('gửi thiệp')) return 'Gửi thiệp mời điện tử';
    if (lower.includes('follow up pending') || lower.includes('nhắc nhở')) return 'Theo dõi khách chưa phản hồi RSVP';
    if (lower.includes('complete seating') || lower.includes('sắp xếp bàn')) return 'Hoàn thiện sơ đồ bàn tiệc';
    if (lower.includes('prepare check-in') || lower.includes('lễ tân')) return 'Chuẩn bị nhân sự lễ tân check-in';
    return title;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-card flex flex-col justify-between text-left">
      {/* Header */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-brand-deep" />
              <span>{t.dashboard.weddingPreparation}</span>
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi' ? 'Theo dõi các đầu việc quan trọng trước hôn lễ' : 'Track essential milestone tasks before wedding'}
            </p>
          </div>
          <span className="font-serif text-xl font-bold text-brand-deep bg-brand-soft/60 px-3 py-1 rounded-xl border border-brand-primary/20">
            {metrics.tasksProgressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 bg-brand-bg rounded-full overflow-hidden p-0.5 border border-brand-border/60">
            <div
              className="h-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-deep rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${metrics.tasksProgressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-brand-muted">
            <span>
              {language === 'vi'
                ? `Đã hoàn thành ${tasks.filter((t) => t.completed).length} / ${tasks.length} nhiệm vụ`
                : `${tasks.filter((t) => t.completed).length} of ${tasks.length} tasks completed`}
            </span>
            <span>
              {language === 'vi'
                ? `Còn ${tasks.filter((t) => !t.completed).length} việc`
                : `${tasks.filter((t) => !t.completed).length} remaining`}
            </span>
          </div>
        </div>
      </div>

      {/* Task items list */}
      <div className="space-y-2 flex-1 my-2 overflow-y-auto max-h-64 pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={clsx(
              'flex items-center justify-between p-3 rounded-xl border transition-all duration-150 cursor-pointer select-none group',
              task.completed
                ? 'bg-brand-bg/40 border-brand-border/60 text-brand-muted'
                : 'bg-white border-brand-border hover:border-brand-primary/40 hover:bg-brand-bg/30 text-brand-dark shadow-subtle'
            )}
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-md border-2 border-brand-border group-hover:border-brand-primary flex items-center justify-center shrink-0 transition-colors bg-white">
                  <Circle className="w-2.5 h-2.5 text-transparent group-hover:text-brand-primary/40 fill-current" />
                </div>
              )}
              <span
                className={clsx(
                  'text-xs sm:text-sm font-medium transition-all',
                  task.completed && 'line-through text-brand-muted/70'
                )}
              >
                {translateTaskTitle(task.title)}
              </span>
            </div>

            <span className="text-[10px] uppercase font-semibold text-brand-muted/70 tracking-wider">
              {task.category}
            </span>
          </div>
        ))}
      </div>

      {/* Add Task input or CTA */}
      <div className="pt-3 border-t border-brand-border/60">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-brand-deep hover:bg-brand-soft/40 rounded-xl transition-colors border border-dashed border-brand-primary/40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Thêm nhiệm vụ chuẩn bị mới' : 'Add Custom Preparation Task'}</span>
          </button>
        ) : (
          <form onSubmit={handleCreateTask} className="flex items-center gap-2">
            <input
              type="text"
              autoFocus
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder={language === 'vi' ? 'Ví dụ: Đặt hoa tươi bàn tiệc' : 'e.g. Order floral centerpieces'}
              className="flex-1 bg-white border border-brand-border text-xs rounded-lg px-3 py-2 text-brand-dark focus:outline-none focus:border-brand-primary"
            />
            <Button type="submit" size="sm" variant="primary">
              {t.common.add}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setNewTaskTitle('');
              }}
            >
              {t.common.cancel}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
