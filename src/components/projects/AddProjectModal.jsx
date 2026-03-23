import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const FIELDS = {
  title: '',
  type: 'building',
  year: new Date().getFullYear(),
  location: '',
  client: '',
  status: 'Completed',
  description: '',
  materials: '',
};

const AddProjectModal = ({ onClose, onAdded, defaultType = 'building' }) => {
  const [form, setForm] = useState({ ...FIELDS, type: defaultType });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const materialsArr = form.materials
        ? form.materials.split(',').map((m) => m.trim()).filter(Boolean)
        : [];

      const { data: project, error: insertErr } = await supabase
        .from('projects')
        .insert({
          title: form.title,
          type: form.type,
          year: parseInt(form.year),
          location: form.location,
          client: form.client,
          status: form.status,
          description: form.description,
          materials: materialsArr,
          created_by: user.id,
        })
        .select()
        .single();

      if (insertErr) throw insertErr;

      // Upload images
      for (const file of images) {
        const ext = file.name.split('.').pop();
        const path = `${project.id}/${Date.now()}.${ext}`;

        const { error: uploadErr } = await supabase.storage
          .from('projects-images')
          .upload(path, file);

        if (uploadErr) throw uploadErr;

        const { data: { publicUrl } } = supabase.storage
          .from('projects-images')
          .getPublicUrl(path);

        await supabase.from('project_images').insert({
          project_id: project.id,
          image_url: publicUrl,
        });
      }

      onAdded();
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 font-['Inter']">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#A65A44] font-semibold">
              New Entry
            </span>
            <h2 className="mt-1 text-lg font-['Playfair_Display'] font-semibold text-[#1A1A1A]">
              Add Project
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

          {/* Title */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Project Title *</label>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Lekki Residence"
              className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder:text-gray-300 focus:border-[#A65A44] transition-colors duration-200"
            />
          </div>

          {/* Type + Status row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Type *</label>
              <div className="flex border border-gray-200 overflow-hidden">
                {['building', 'interior'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set('type', t)}
                    className={`flex-1 py-2.5 text-[9px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 ${
                      form.type === t ? 'bg-[#1A1A1A] text-white' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] focus:border-[#A65A44] transition-colors duration-200 cursor-pointer"
              >
                {['Completed', 'Ongoing', 'On Hold'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Year + Location row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Year</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => set('year', e.target.value)}
                min="1970"
                max="2099"
                className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] focus:border-[#A65A44] transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Location</label>
              <input
                value={form.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="e.g. Lagos, Nigeria"
                className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder:text-gray-300 focus:border-[#A65A44] transition-colors duration-200"
              />
            </div>
          </div>

          {/* Client */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Client</label>
            <input
              value={form.client}
              onChange={(e) => set('client', e.target.value)}
              placeholder="e.g. Private Client"
              className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder:text-gray-300 focus:border-[#A65A44] transition-colors duration-200"
            />
          </div>

          {/* Materials */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">
              Materials <span className="normal-case tracking-normal text-gray-300">(comma-separated)</span>
            </label>
            <input
              value={form.materials}
              onChange={(e) => set('materials', e.target.value)}
              placeholder="e.g. Concrete, Glass, Steel"
              className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder:text-gray-300 focus:border-[#A65A44] transition-colors duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              placeholder="Brief project description..."
              className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder:text-gray-300 focus:border-[#A65A44] transition-colors duration-200 resize-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Images</label>
            <label className="flex items-center gap-3 border border-dashed border-gray-200 p-4 cursor-pointer hover:border-[#A65A44] transition-colors duration-200 group">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-300 group-hover:text-[#A65A44] transition-colors">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-300 group-hover:text-[#A65A44] transition-colors">
                {images.length > 0 ? `${images.length} file${images.length > 1 ? 's' : ''} selected` : 'Choose images'}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
            </label>
          </div>

          {error && (
            <p className="text-[11px] text-red-400 tracking-wide">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 border border-gray-200 text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-400 hover:text-black hover:border-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-[#A65A44] text-white text-[10px] uppercase tracking-[0.3em] font-semibold hover:bg-[#1A1A1A] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                  Saving
                </span>
              ) : 'Save Project'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
