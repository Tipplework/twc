{filteredClients.map((client) => {
  const matchedProject = projectData.find(p => p.image === client.image);

  const LogoCard = (
    <motion.div
      key={client.id}
      className={`relative bg-white rounded-lg transition-all duration-300 border border-gray-100 hover:border-black overflow-hidden ${
        hoveredLogo === client.id ? 'scale-105 shadow-md' : 'scale-100'
      }`}
      onMouseEnter={() => setHoveredLogo(client.id)}
      onMouseLeave={() => setHoveredLogo(null)}
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
    >
      <div className="aspect-square flex items-center justify-center p-6 overflow-hidden">
        <img
          src={client.image}
          alt={client.name}
          className={`w-auto h-auto max-h-full object-contain transition-all duration-500 ${
            hoveredLogo === client.id ? 'filter-none' : 'grayscale opacity-60'
          }`}
        />
      </div>
      <div
        className={`absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
          hoveredLogo === client.id ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>
          <p className="text-sm text-white font-medium">{client.name}</p>
          <p className="text-xs text-white/80">{client.category}</p>
        </div>
      </div>
    </motion.div>
  );

  return matchedProject ? (
    <Link key={client.id} to={`/project/${matchedProject.slug}`}>
      {LogoCard}
    </Link>
  ) : (
    <div key={client.id}>{LogoCard}</div>
  );
})}
