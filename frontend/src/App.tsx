import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import CallsPage from "./pages/CallsPage/CallsPage";
import Navigation from "./widgets/Navigation/Navigation";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./app/ProtectedRoute";
import BusinessesPage from "./pages/BusinessesPage/BusinessesPage";
import DialogueScriptsPage from "./pages/DialogueScriptsPage/DialogueScriptsPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";

function NavigationWrapper() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  return <Navigation />;
}

function App() {
  return (
    <BrowserRouter>
      <NavigationWrapper />
      <Routes>
        <Route
          path="/"
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
    </BrowserRouter>
  );
}

export default App;
