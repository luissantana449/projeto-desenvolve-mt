import Link from "next/link";
import { Search, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Página não encontrada
          </h2>

          <p className="text-gray-600 mb-8">
            Desculpe, não conseguimos encontrar a página que você está
            procurando. Ela pode ter sido movida ou não existe mais.
          </p>

          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
