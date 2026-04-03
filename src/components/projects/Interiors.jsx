import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import ProjectCard from './ProjectsCard';

const PAGE_SIZE = 12;

const fetchInteriors = async (startFrom) => {
  const { data, count, error } = await supabase
    .from('projects')
    .select('*, project_images(*)', { count: 'exact' })
    .eq('type', 'interior')
    .order('created_at', { ascending: false })
    .range(startFrom, startFrom + PAGE_SIZE - 1);

  if (error) throw new Error(error.message);
  return { data, count };
};

const Interiors = () => {
  const [projects, setProjects] = useState([]);
  const [from, setFrom] = useState(0);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const hasMore = total === null || projects.length < total;

  const loadPage = async (startFrom) => {
    setLoading(true);
    try {
      const { data, count } = await fetchInteriors(startFrom);
      if (startFrom === 0) setTotal(count);
      setProjects((prev) => startFrom === 0 ? data : [...prev, ...data]);
      setFrom(startFrom + PAGE_SIZE);
    } catch (err) {
      console.error('Error fetching interiors:', err.message);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    loadPage(0);
  }, []);

  if (initialLoad) {
    return (
      <div className="flex items-center justify-center py-24">
        <span className="w-6 h-6 border border-[#A65A44]/30 border-t-[#A65A44] rounded-full animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-300 font-semibold">
          No projects yet
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <div className="flex items-center justify-center py-4">
        {hasMore ? (
          <button
            onClick={() => loadPage(from)}
            disabled={loading}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-semibold text-gray-400 hover:text-[#1A1A1A] transition-colors duration-300 disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border border-gray-300 border-t-[#A65A44] rounded-full animate-spin" />
                Loading
              </>
            ) : (
              <>
                Load More
                <span className="h-[1px] w-6 bg-current" />
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-gray-200" />
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300 font-semibold">
              All {total} projects loaded
            </p>
            <span className="h-[1px] w-12 bg-gray-200" />
          </div>
        )}
      </div>

    </div>
  );
};

export default Interiors;
