import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const AddInspirationModal = ({ onClose, onAdded }) => {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) { setError('Please select an image.'); return; }
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const ext = image.name.split('.').pop();
      const path = `inspiration/${Date.now()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from('inspiration-images')
        .upload(path, image);

      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage
        .from('inspiration-images')
        .getPublicUrl(path);

      const { error: insertErr } = await supabase
        .from('inspiration')
        .insert({
          image_url: publicUrl,
          comment: comment.trim() || null,
          created_by: user.id,
        });

      if (insertErr) throw insertErr;

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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-white w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#A65A44] font-semibold">New Entry</span>
            <h2 className="mt-1 text-lg font-['Playfair_Display'] font-semibold text-[#1A1A1A]">Add Inspiration</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black transition-colors">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Image *</label>
            <label className="block cursor-pointer">
              {preview ? (
                <div className="relative group">
                  <img src={preview} alt="preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white font-semibold">Change</span>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 h-48 flex flex-col items-center justify-center gap-3 hover:border-[#A65A44] transition-colors group">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-200 group-hover:text-[#A65A44] transition-colors">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gray-300 group-hover:text-[#A65A44] transition-colors">
                    Choose image
                  </span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">
              Comment <span className="normal-case tracking-normal text-gray-300">(optional)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="A note about this image..."
              className="w-full border-b border-gray-200 py-2 text-sm outline-none bg-transparent text-[#1A1A1A] placeholder:text-gray-300 focus:border-[#A65A44] transition-colors duration-200 resize-none"
            />
          </div>

          {error && <p className="text-[11px] text-red-400 tracking-wide">{error}</p>}

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
                  Uploading
                </span>
              ) : 'Save Image'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddInspirationModal;
