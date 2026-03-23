const Sidebar = ({ activeTab, setActiveTab }) => {
  const items = [
    { label: 'Buildings', value: 'building' },
    { label: 'Interiors', value: 'interior' },
    { label: 'Inspiration', value: 'inspiration' },
  ];

  return (
    <aside className="md:w-[20%]">
      <div className="sticky top-32 space-y-6">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setActiveTab(item.value)}
            className={`block text-left text-sm transition ${
              activeTab === item.value
                ? 'text-black border-l-2 border-[#1D1128] pl-3'
                : 'text-gray-400 hover:text-black pl-3'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;