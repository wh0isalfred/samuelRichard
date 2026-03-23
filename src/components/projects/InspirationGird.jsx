const InspirationGrid = ({ images }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {images.map((img) => (
        <div key={img.id} className="group relative break-inside-avoid">

          {/* IMAGE */}
          <img
            src={img.image_url}
            className="w-full object-cover rounded-lg transition duration-500 group-hover:opacity-90"
          />

          {/* OPTIONAL COMMENT (HOVER) */}
          {img.comment && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-white text-sm leading-relaxed">
                {img.comment}
              </p>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default InspirationGrid;