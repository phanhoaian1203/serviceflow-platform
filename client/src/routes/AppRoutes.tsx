import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';
import { PublicLayout } from '../layouts/PublicLayout.tsx';
import { AuthLayout } from '../layouts/AuthLayout.tsx';
import { DashboardLayout } from '../layouts/DashboardLayout.tsx';
import { LandingPage } from '../pages/LandingPage.tsx';
import { LoginPage } from '../pages/LoginPage.tsx';
import { RegisterPage } from '../pages/RegisterPage.tsx';
import { DashboardPage } from '../pages/DashboardPage.tsx';
import { NotFoundPage } from '../pages/NotFoundPage.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      </Route>

      {/* Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
