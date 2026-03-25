const ProjectCard = ({ project }) => {
  const image = project.project_images?.[0]?.image_url;

  return (
    <div className="group font-['Inter']">

      {/* IMAGE */}
      <div className="overflow-hidden bg-[#EDE7E3] relative">
        {image ? (
          <img
            src={image}
            alt={project.title}
            className="w-full h-[280px] object-cover transition duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-[280px] flex items-center justify-center">
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#A65A44]/40 font-semibold">
              No Image
            </span>
          </div>
        )}

        {/* Status badge — midnight violet */}
        <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.2em] bg-black/70 text-white px-3 py-1.5 font-semibold">
          {project.status || 'Completed'}
        </span>
      </div>

      {/* CONTENT */}
      <div className="mt-5 space-y-4">

        {/* Title */}
        <h3 className="text-base font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#A65A44] transition-colors duration-300">
          {project.title}
        </h3>

        {/* Location + Year */}
        <p className="text-[11px] text-gray-400 tracking-wide uppercase">
          {project.location || 'Undisclosed'}&nbsp;&nbsp;·&nbsp;&nbsp;{project.year}
        </p>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-[1px] bg-gray-100" />

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300 mb-1">Style</p>
            <p className="text-gray-700 font-medium">{project.style || 'Contemporary'}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300 mb-1">Area</p>
            <p className="text-gray-700 font-medium">{project.area || '—'}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300 mb-1">Client</p>
            <p className="text-gray-700 font-medium truncate">{project.client || 'Private'}</p>
          </div>
        </div>

        {/* Materials — alternating terracotta and midnight violet */}
        {project.materials?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.materials.map((m, i) => (
              <span
                key={i}
                className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-semibold ${
                  i % 2 === 0
                    ? 'bg-[#F5F0EC] text-[#A65A44]'
                    : 'bg-[#EFEFEF] text-[#6B6B6B]'
                }`}
              >
                {m}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectCard;
