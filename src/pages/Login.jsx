import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const emailMap = {
    admin: 'alfredenyinna03@gmail.com',
    secretary: 'arnolden30@gmail.com',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: emailMap[role],
      password,
    });

    setLoading(false);

    if (error) {
      setError('Incorrect password. Please try again.');
      return;
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF9F7] px-8 sm:px-16 font-['Inter']">
      <div className="w-full max-w-[380px]">

          {/* Logo */}
          <div className="mb-12">
            <p className="text-xl font-bold uppercase tracking-[0.3em] italic text-[#1A1A1A]">
              Samuel Richard
            </p>
            <span className="mt-1 block h-[1px] w-6 bg-[#A65A44]" />
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-[9px] uppercase tracking-[0.5em] text-[#A65A44] font-semibold mb-4">
              Studio Access
            </h1>
            <p className="text-[#1A1A1A] text-3xl font-['Playfair_Display'] font-semibold leading-tight">
              Welcome back.
            </p>
            <p className="mt-2 text-sm text-gray-400 font-light tracking-wide">
              Restricted to authorized personnel only.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">

            {/* Role Selector */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-3">
                Access Level
              </label>
              <div className="flex border border-gray-200 overflow-hidden">
                {[
                  { id: 'admin', label: 'Admin' },
                  { id: 'secretary', label: 'Secretary' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => { setRole(r.id); setError(''); }}
                    className={`flex-1 py-3.5 text-[10px] uppercase tracking-[0.3em] font-semibold transition-all duration-300 ${
                      role === r.id
                        ? 'bg-[#1A1A1A] text-white'
                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-3">
                Password
              </label>
              <div className={`relative border-b-2 transition-all duration-300 ${
                focused ? 'border-[#A65A44]' : 'border-gray-200'
              }`}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full py-3 pr-4 outline-none bg-transparent text-[#1A1A1A] text-sm placeholder:text-gray-300 tracking-wide"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                />
              </div>
              {/* Error */}
              {error && (
                <p className="mt-2 text-[11px] text-red-400 tracking-wide animate-pulse">
                  {error}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full group relative flex items-center justify-center h-[56px] bg-[#A65A44] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Animated bg sweep */}
              <span className="absolute inset-0 w-0 bg-[#1a1a1a] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full" />

              <span className="relative z-10 text-[10px] uppercase tracking-[0.4em] font-bold text-white">
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                    Authenticating
                  </span>
                ) : (
                  'Enter Studio'
                )}
              </span>
            </button>

          </form>

          {/* Footer */}
          <p className="mt-16 text-[9px] uppercase tracking-[0.3em] text-gray-300 text-center">
            Samuel Richard &copy; {new Date().getFullYear()}
          </p>
      </div>
    </div>
  );
};

export default Login;
