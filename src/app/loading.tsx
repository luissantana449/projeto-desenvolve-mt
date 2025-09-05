export default function Loading() {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-600 rounded-full absolute top-0 left-0 animate-ping"></div>
            <div className="w-8 h-8 bg-blue-600 rounded-full absolute top-0 left-0 animate-pulse"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }