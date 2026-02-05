import React from 'react';
import { Users, FileText, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 px-6 sm:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Shaping the future of</span>{' '}
                  <span className="block text-ieee-blue xl:inline">AI Standards</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Welcome to the official collaboration portal for IEEE P3394. We are defining the technical and ethical frameworks for next-generation artificial intelligence systems.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/schedule"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ieee-blue hover:bg-ieee-dark md:py-4 md:text-lg transition"
                    >
                      View Agenda
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/assistant"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-ieee-blue bg-blue-50 hover:bg-blue-100 md:py-4 md:text-lg transition"
                    >
                      Ask AI Assistant
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-100 flex items-center justify-center">
            {/* Abstract visual representation of network/standards */}
            <svg className="h-full w-full opacity-10 text-ieee-blue" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
               </pattern>
               <rect width="100" height="100" fill="url(#grid)" />
            </svg>
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 bg-ieee-blue rounded-full opacity-20 blur-3xl filter animate-pulse"></div>
             </div>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="py-12 bg-white rounded-xl shadow-sm border border-gray-100 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Working Group Objectives</h2>
          <p className="mt-4 text-lg text-gray-500">
            Our mission is to foster interoperability, safety, and transparency in AI deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative p-6 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-ieee-blue rounded-full flex items-center justify-center text-white shadow-lg">
              <Users size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
            <p className="text-gray-600">
              Uniting experts from academia, industry, and government to build consensus-based standards.
            </p>
          </div>

          <div className="relative p-6 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-ieee-blue rounded-full flex items-center justify-center text-white shadow-lg">
              <Target size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Rigor</h3>
            <p className="text-gray-600">
              Defining precise metrics for model performance, bias detection, and robustness verification.
            </p>
          </div>

          <div className="relative p-6 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-ieee-blue rounded-full flex items-center justify-center text-white shadow-lg">
              <FileText size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600">
              Producing clear, actionable documents that serve as the foundation for global AI regulation.
            </p>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-ieee-light rounded-xl p-8 border border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h3 className="text-2xl font-bold text-ieee-dark">Next Plenary Meeting</h3>
                <p className="text-ieee-blue mt-2 font-medium">November 15-17, 2024 • Hybrid (Geneva & Online)</p>
                <p className="text-gray-600 mt-2 max-w-2xl">
                    Registration is now open for the Q4 plenary. Key topics include the final review of the "Data Governance in ML" draft.
                </p>
            </div>
            <Link to="/schedule" className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-md">
                View Schedule <ArrowRight size={16} className="ml-2"/>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;