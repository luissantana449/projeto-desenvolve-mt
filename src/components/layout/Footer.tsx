import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white border-t-4 border-gray-800">
            <div className="container">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Sobre a Plataforma */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">
                                Sobre a Plataforma
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Esta plataforma foi desenvolvida para ajudar na busca e
                                localização de pessoas desaparecidas no estado de Mato Grosso,
                                facilitando o acesso a informações e o envio de denúncias.
                            </p>
                        </div>

                        {/* Links Rápidos */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">
                                Links Rápidos
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        Página Inicial
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="https://desaparecidos.pjc.mt.gov.br"
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        Buscar Pessoas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="text-gray-400 hover:text-white text-sm transition-colors"
                                    >
                                        Como Ajudar
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contatos de Emergência */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">
                                Contatos de Emergência
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-red-400" />
                                    <span className="text-sm text-gray-400">
                                        190 - Polícia Militar
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-red-400" />
                                    <span className="text-sm text-gray-400">
                                        197 / 181 - Polícia Civil
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-red-400" />
                                    <span className="text-sm text-gray-400">
                                        193 - Corpo de Bombeiros
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Informações de Contato */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                                    <span className="text-sm text-gray-400">
                                        Avenida Coronel Escolástico, 346
                                        <br />
                                        Bairro Bandeirantes
                                        <br />
                                        Cuiabá - MT
                                        <br />
                                        Cep: 78.010-200
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm text-gray-400">
                                        Telefone: (65) 3613-5602
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Barra Inferior */}
                <div className="border-t border-gray-900 py-6 bg-black">
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Desenvolve MT. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
