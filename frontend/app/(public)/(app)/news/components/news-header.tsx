

export function NewsHeader() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">📰 Noticias de Ciberseguridad</h1>
            <p className="text-gray-500 mt-1">
              Innovamos juntos, construimos el futuro
            </p>
          </div>
          <div className="flex items-center text-gray-500 mt-4 md:mt-0">
            <div className="text-right">
              <div className="text-sm font-medium">
                 <span>Actualizado: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </header>

  );
}
