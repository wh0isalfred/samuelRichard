import { useState, useEffect } from 'react';
import Sidebar from '../components/projects/Sidebar';
import Buildings from '../components/projects/Buildings';
import Interiors from '../components/projects/Interiors';
import Inspiration from '../components/projects/Inspiration';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('building');
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return;
    if (!user) navigate('/login');
  }, [user, navigate]);

  const tabLabels = {
    building: 'Buildings',
    interior: 'Interiors',
    inspiration: 'Inspiration',
  };

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-[#FBF9F7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-6 h-6 border border-[#A65A44]/30 border-t-[#A65A44] rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-300">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F7] min-h-screen font-['Inter']">
      {/* Page Header */}
      <div className="pt-32 pb-10 px-6 md:px-12 lg:px-20 border-b border-gray-100">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.5em] text-[#A65A44] font-semibold">
              Portfolio
            </span>
            <h1 className="mt-2 text-3xl font-['Playfair_Display'] font-semibold text-[#1A1A1A]">
              {tabLabels[activeTab]}
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 hidden md:block pb-1">
            Samuel Richard Studio
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="md:w-[80%]">
            {activeTab === 'building' && <Buildings />}
            {activeTab === 'interior' && <Interiors />}
            {activeTab === 'inspiration' && <Inspiration />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Projects;
