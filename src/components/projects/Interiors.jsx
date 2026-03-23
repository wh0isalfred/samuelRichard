import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import ProjectCard from './ProjectsCard';

const Interiors = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*, project_images(*)')
        .eq('type', 'interior')
        .order('created_at', { ascending: false });

      setProjects(data || []);
    };

    fetch();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
};

export default Interiors;