import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const useRole = (user) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchRole = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setRole(data?.role ?? null);
    };

    fetchRole();
  }, [user]);

  return role;
};