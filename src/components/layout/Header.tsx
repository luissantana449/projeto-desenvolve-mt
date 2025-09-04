import Link from "next/link";
import Image from "next/image";
import { Home } from "lucide-react";

export function Header() {
    return (
        <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-lg">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="relative w-14 h-14 flex-shrink-0">
                                <Image
                                    src="/pjc_logo.svg"
                                    alt="Polícia Judiciária Civil - MT"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-white tracking-tight">
                                    Polícia Judiciária Civil
                                </span>
                                <span className="text-sm text-white/90 font-medium">
                                    Estado de Mato Grosso
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-white/90 hover:text-white hover:bg-white/10"
                        >
                            <Home className="w-4 h-4" />
                            <span>Início</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
