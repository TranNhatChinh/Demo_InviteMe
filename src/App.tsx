import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPassword } from './components/auth/ForgotPassword';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterPage onNavigateToLogin={() => setAuthView('login')} />;
    }
    if (authView === 'forgot') {
      return <ForgotPassword onNavigateToLogin={() => setAuthView('login')} />;
    }
    return (
      <LoginPage
        onNavigateToRegister={() => setAuthView('register')}
        onNavigateToForgot={() => setAuthView('forgot')}
      />
    );
  }

  return <AppLayout />;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
