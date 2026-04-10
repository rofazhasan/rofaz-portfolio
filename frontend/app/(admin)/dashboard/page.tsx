"use client";

import React from "react";
import useSWR from "swr";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { api } from "../../../lib/api";

// SWR Fetcher using our Axios config
const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function DashboardPage() {
  const { data: projects, error, isLoading } = useSWR("/projects", fetcher);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      // In a real app we'd trigger an SWR revalidation
      alert("Project deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio repository.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition shadow-lg shadow-purple-500/20">
          <Plus size={20} /> New Project
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-black/40">
              <th className="p-4 font-medium text-gray-400 text-sm">Title</th>
              <th className="p-4 font-medium text-gray-400 text-sm">Status</th>
              <th className="p-4 font-medium text-gray-400 text-sm">Last Updated</th>
              <th className="p-4 font-medium text-gray-400 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Loading data from Rust backend...</td>
              </tr>
            ) : error ? (
               <tr>
                <td colSpan={4} className="p-8 text-center text-red-400">Error connecting to local Axum API.</td>
              </tr>
            ) : projects?.length === 0 ? (
               <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No projects found. Create one.</td>
              </tr>
            ) : projects?.map((project: any) => (
              <tr key={project.id} className="hover:bg-white/[0.02] transition">
                <td className="p-4">
                  <p className="font-semibold text-white">{project.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{project.tags?.join(", ")}</p>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${project.is_published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                    {project.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {new Date(project.updated_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-white rounded bg-white/5 hover:bg-white/10 transition">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:text-red-300 rounded bg-red-500/10 hover:bg-red-500/20 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
