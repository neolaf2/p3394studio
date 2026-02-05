import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Briefcase, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    affiliation: user?.affiliation || '',
    email: user?.email || '',
  });
  const [success, setSuccess] = useState(false);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: formData.name, affiliation: formData.affiliation });
    setSuccess(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-600">Manage your working group identity and affiliation settings.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-20 w-20 bg-ieee-blue rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                {user.role}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              
              <div className="sm:col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="focus:ring-ieee-blue focus:border-ieee-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    value={formData.email}
                    className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border text-gray-500 cursor-not-allowed"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Contact the working group chair to change your email.</p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700">
                  Organization / Affiliation
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="affiliation"
                    id="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className="focus:ring-ieee-blue focus:border-ieee-blue block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-gray-200">
              {success ? (
                 <span className="text-green-600 text-sm font-medium flex items-center">
                    Successfully updated profile.
                 </span>
              ) : <span></span>}
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-ieee-blue hover:bg-ieee-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ieee-blue transition"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;