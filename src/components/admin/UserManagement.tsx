import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { AdminUser } from '../../types';
import { UserDetailDrawer } from './UserDetailDrawer';
import { SearchInput } from '../common/Input';
import { Button } from '../common/Button';
import { Users, Shield, Ban, CheckCircle2, MoreVertical, Eye, Trash2, Filter } from 'lucide-react';
import { clsx } from 'clsx';

export const UserManagement: React.FC = () => {
  const { adminUsers, updateAdminUserStatus } = useApp();
  const { t, formatNumber, language } = useLanguage();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = useMemo(() => {
    return adminUsers.filter((u) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (roleFilter !== 'All' && u.role !== roleFilter) {
        return false;
      }
      return true;
    });
  }, [adminUsers, search, roleFilter]);

  const roleTabs = [
    { key: 'All', label: t.common.all },
    { key: 'Couple', label: language === 'vi' ? 'Cặp đôi' : 'Couple' },
    { key: 'Reception Staff', label: language === 'vi' ? 'Nhân viên lễ tân' : 'Reception Staff' },
    { key: 'Admin', label: 'Admin' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Users className="w-3.5 h-3.5 text-slate-600" />
            <span>{language === 'vi' ? 'Danh bạ tài khoản & Phân quyền' : 'Identity & Access Directory'}</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.admin.usersTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.admin.usersSub}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {roleTabs.map((r) => (
            <button
              key={r.key}
              onClick={() => setRoleFilter(r.key)}
              className={clsx(
                'px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border select-none',
                roleFilter === r.key
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => setSearch('')}
            placeholder={language === 'vi' ? 'Tìm theo tên hoặc email...' : 'Search by name or email...'}
          />
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
                <th className="py-3.5 px-4">{language === 'vi' ? 'Người dùng' : 'User'}</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">{language === 'vi' ? 'Vai trò' : 'Role'}</th>
                <th className="py-3.5 px-4">{language === 'vi' ? 'Gói dịch vụ' : 'Plan'}</th>
                <th className="py-3.5 px-4">{t.common.status}</th>
                <th className="py-3.5 px-4">{language === 'vi' ? 'Ngày tạo' : 'Created Date'}</th>
                <th className="py-3.5 px-4 text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-semibold text-slate-900">{user.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {user.email}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded text-[10px] font-bold border',
                        user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : user.role === 'Reception Staff'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      )}
                    >
                      {user.role === 'Reception Staff' && language === 'vi' ? 'Lễ tân' : user.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-brand-deep">
                    {user.plan}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border',
                        user.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      )}
                    >
                      {user.status === 'Active' ? (language === 'vi' ? 'Hoạt động' : 'Active') : (language === 'vi' ? 'Đã khóa' : 'Suspended')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {user.createdAt}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      {t.common.view}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};
