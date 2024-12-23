import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import CreateProjectModal from "../components/CreateProjectModal";
const ProjectDashboard = () => {
  const { user, url } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);


  // Sample data - replace with actual API calls
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "React Dashboard",
      description: "Create a responsive dashboard",
      status: "OPEN",
      deadline: "2024-12-31",
    },
    {
      id: 2,
      title: "API Integration",
      description: "Implement REST API",
      status: "ASSIGNED",
      deadline: "2024-12-25",
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      projectId: 1,
      candidateName: "John Doe",
      status: "IN_PROGRESS",
      score: null,
    },
    {
      id: 2,
      projectId: 2,
      candidateName: "Jane Smith",
      status: "SUBMITTED",
      score: 85,
    },
  ]);

  const ProjectsTable = () => (
    <div className="bg-white rounded-lg shadow">
      {user.role === "admin" ? (
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4">{project.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      project.status === "OPEN"
                        ? "bg-green-100 text-green-800"
                        : project.status === "ASSIGNED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">{project.deadline}</td>
                <td className="px-6 py-4">
                  {user.role === "admin" ? (
                    <>
                      <button
                        onClick={() => setShowAssignModal(true)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => setShowScoreModal(true)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Score
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setViewDetailsModal(true)}
                      className="text-green-600 hover:text-green-900"
                    >
                      View details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AssignmentsTable = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Assignments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Candidate
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Project
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4">{assignment.candidateName}</td>
                <td className="px-6 py-4">
                  {projects.find((p) => p.id === assignment.projectId)?.title}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      assignment.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-800"
                        : assignment.status === "SUBMITTED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {assignment.score ? `${assignment.score}/100` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Management System
          </h1>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "projects"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-4 py-2 rounded-md ${
                activeTab === "assignments"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Assignments
            </button>
          </nav>
        </div>

        {activeTab === "projects" ? <ProjectsTable /> : <AssignmentsTable />}

        {showCreateModal && (
          <CreateProjectModal setShowCreateModal={setShowCreateModal} />
        )}
      </div>
    </div>
  );
};
export default ProjectDashboard;
