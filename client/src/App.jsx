import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import ProjectDashboard from "./pages/ProjectDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AssignProjectModal from "./components/AssignProjectModal";
import Dashboard from "./pages/Dashboard";
const AssignWrapper = () => {
  const { projectId } = useParams();
  return <AssignProjectModal projectId={projectId} />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  { path: "/assign", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin", "candidate"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ProjectDashboard /> },
      { path: ":projectId", element: <AssignWrapper /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
