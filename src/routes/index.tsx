import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/HomePage"
import AboutPage from "../pages/AboutPage"
import BlogPage from "../pages/BlogPage"
import BlogPostPage from "../pages/BlogPostPage"
import GuidePage from "../pages/GuidePage"
import AuthPage from "../pages/AuthPage"
import ServicesPage from "../pages/ServicesPage"
import TermsPage from "../pages/TermsPage"
import AdminPage from "../pages/AdminPage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/services"
        element={
          <MainLayout>
            <ServicesPage />
          </MainLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <MainLayout>
            <BlogPage />
          </MainLayout>
        }
      />
      <Route
        path="/blog/:id"
        element={
          <MainLayout>
            <BlogPostPage />
          </MainLayout>
        }
      />
      <Route
        path="/guide"
        element={
          <MainLayout>
            <GuidePage />
          </MainLayout>
        }
      />
      <Route
        path="/auth"
        element={
          <MainLayout>
            <AuthPage />
          </MainLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <MainLayout>
            <TermsPage />
          </MainLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <MainLayout>
            <AdminPage />
          </MainLayout>
        }
      />
    </Routes>
  )
}