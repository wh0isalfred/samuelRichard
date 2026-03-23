import { useState } from 'react';
import Buildings from '../components/projects/Buildings';
import Interiors from '../components/projects/Interiors';
import Inspiration from '../components/projects/Inspiration';

import { useAuth } from '../hooks/useAuth';
import { useRole } from '../hooks/useRole';
import { supabase } from '../lib/supabase';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('building');

  const user = useAuth();
  const role = useRole(user);

  const canUpload = role === 'admin' || role === 'secretary';

  return (
    <div className="bg-[#FBF9F7] pt-32 px-6 md:px-12 lg:px-20 min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Sidebar */}
        <aside className="md:w-[20%]">
          <div className="sticky top-32 space-y-6">
            {[
              { label: 'Buildings', value: 'building' },
              { label: 'Interiors', value: 'interior' },
              { label: 'Inspiration', value: 'inspiration' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`block text-left text-sm transition ${
                  activeTab === item.value
                    ? 'text-black border-l-2 border-[#A65A44] pl-3'
                    : 'text-gray-400 hover:text-black pl-3'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="md:w-[80%]">
          {activeTab === 'building' && <Buildings />}
          {activeTab === 'interior' && <Interiors />}
          {activeTab === 'inspiration' && <Inspiration />}
        </main>
      </div>

      {/* Floating Controls */}
      {canUpload && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">
          <button className="w-14 h-14 bg-[#A65A44] text-white text-2xl rounded-full shadow-lg hover:bg-black transition">
            +
          </button>

          <button
            onClick={() => supabase.auth.signOut()}
            className="text-xs text-gray-500 hover:text-black"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;