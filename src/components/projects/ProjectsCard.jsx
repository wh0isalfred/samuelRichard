const ProjectCard = ({ project }) => {
  const image = project.project_images?.[0]?.image_url;

  return (
    <div className="group">
      
      {/* IMAGE */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={project.title}
          className="w-full h-[260px] object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="mt-5 space-y-4">

        {/* Title + Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">
            {project.title}
          </h3>

          <span className="text-[10px] uppercase tracking-[0.2em] bg-[#EDE7E3] text-[#A65A44] px-3 py-1">
            {project.status || "Completed"}
          </span>
        </div>

        {/* Location + Year */}
        <p className="text-xs text-gray-400 tracking-wide">
          {project.location || "Undisclosed"} • {project.year}
        </p>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-[1px] bg-gray-200"></div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 text-xs">

          <div>
            <p className="uppercase tracking-widest text-gray-400 mb-1">
              Style
            </p>
            <p className="text-gray-800">
              {project.style || "Contemporary"}
            </p>
          </div>

          <div>
            <p className="uppercase tracking-widest text-gray-400 mb-1">
              Area
            </p>
            <p className="text-gray-800">
              {project.area || "—"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="uppercase tracking-widest text-gray-400 mb-1">
              Client
            </p>
            <p className="text-gray-800">
              {project.client || "Private Client"}
            </p>
          </div>

        </div>

        {/* Materials */}
        {project.materials?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.materials.map((m, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-widest bg-[#EDE7E3] px-3 py-1"
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