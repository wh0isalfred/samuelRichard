import { useState } from 'react';
import Sidebar from '../components/projects/Sidebar';
import Buildings from '../components/projects/Buildings';
import Interiors from '../components/projects/Interiors';
import Inspiration from '../components/projects/Inspiration';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('building');

  return (
    <div className="bg-[#FBF9F7] pt-32 px-6 md:px-12 lg:px-20 min-h-screen">
      
      <div className="flex flex-col md:flex-row gap-12">

        {/* LEFT */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* RIGHT */}
        <main className="md:w-[80%]">
          {activeTab === 'building' && <Buildings />}
          {activeTab === 'interior' && <Interiors />}
          {activeTab === 'inspiration' && <Inspiration />}
        </main>

      </div>
    </div>
  );
};

export default Projects;