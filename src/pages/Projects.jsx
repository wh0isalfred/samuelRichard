import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useRole } from '../hooks/useRole';
import Sidebar from '../components/projects/Sidebar';
import Buildings from '../components/projects/Buildings';
import Interiors from '../components/projects/Interiors';
import Inspiration from '../components/projects/Inspiration';
import AddProjectModal from '../components/projects/AddProjectModal';
import AddInspirationModal from '../components/projects/AddInspirationModal';

const TAB_LABELS = {
  building: 'Buildings',
  interior: 'Interiors',
  inspiration: 'Inspiration',
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('building');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showInspirationModal, setShowInspirationModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const user = useAuth();
  const role = useRole(user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAdded = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const handleFabClick = () => {
    if (activeTab === 'inspiration') {
      setShowInspirationModal(true);
    } else {
      setShowProjectModal(true);
    }
  };

  // viewer: read only. secretary: can add projects, not inspiration. admin: full access.
  const canAdd =
    role === 'admin' ||
    (role === 'secretary' && activeTab !== 'inspiration');

  const isAuthenticated = role === 'admin' || role === 'secretary';

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
              {TAB_LABELS[activeTab]}
            </h1>
          </div>

          {/* Only show Sign Out when actually logged in */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-300 hover:text-[#1D1128] transition-colors duration-300 pb-1"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 7h8M10 4l3 3-3 3M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="md:w-[80%]">
            {activeTab === 'building' && <Buildings key={`building-${refreshKey}`} />}
            {activeTab === 'interior' && <Interiors key={`interior-${refreshKey}`} />}
            {activeTab === 'inspiration' && <Inspiration key={`inspiration-${refreshKey}`} />}
          </main>
        </div>
      </div>

      {/* Floating + Button — hidden for viewers */}
      {canAdd && (
        <button
          onClick={handleFabClick}
          title={`Add to ${TAB_LABELS[activeTab]}`}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#A65A44] text-white flex items-center justify-center shadow-lg hover:bg-[#1A1A1A] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1v16M1 9h16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      {/* Modals */}
      {showProjectModal && (
        <AddProjectModal
          defaultType={activeTab === 'interior' ? 'interior' : 'building'}
          onClose={() => setShowProjectModal(false)}
          onAdded={handleAdded}
        />
      )}
      {showInspirationModal && (
        <AddInspirationModal
          onClose={() => setShowInspirationModal(false)}
          onAdded={handleAdded}
        />
      )}

    </div>
  );
};

export default Projects;
