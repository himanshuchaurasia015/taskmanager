import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const CreateProjectModal = ({ setShowCreateModal }) => {
  const [description, setdescription] = useState("");
  const [name, setName] = useState("");
  const [end_date, setEndDate] = useState("");
  const { url, user } = useAuth();

  const createProjectHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${url}/projects`,
        {
          project_name: name,
          description: description,
          end_date: end_date,
          created_by: user.id,
        },
        { withCredentials: true }
      );
      if (res.status === 201) {
        alert("Project created successfully");
        setShowCreateModal(false);
      }
    } catch (error) {
      alert(error.response?.data?.msg || "Failed to create project");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={createProjectHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="w-full border rounded p-2"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <input
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
