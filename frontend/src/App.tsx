import type { ReactNode } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import CallsPage from "./pages/CallsPage/CallsPage";
import Navigation from "./widgets/Navigation/Navigation";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./app/ProtectedRoute";
import BusinessesPage from "./pages/BusinessesPage/BusinessesPage";
import DialogueScriptsPage from "./pages/DialogueScriptsPage/DialogueScriptsPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import styles from "./App.module.css";

function ContentWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/") {
  return <>{children}</>;
}

  return <main className={styles.content}>{children}</main>;
}

function NavigationWrapper() {
    const location = useLocation();

 if (location.pathname === "/login" || location.pathname === "/") {
  return null;
}

  return <Navigation />;
}

function App() {
  return (
    <BrowserRouter>
      <NavigationWrapper />

       <ContentWrapper> 
      <Routes>
      <Route path="/" element={<LandingPage />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calls"
          element={
            <ProtectedRoute>
              <CallsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/businesses"
          element={
            <ProtectedRoute>
              <BusinessesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dialogue-scripts"
          element={
            <ProtectedRoute>
              <DialogueScriptsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
       </ContentWrapper>
    </BrowserRouter>
  );
}

export default App;
