"use client";

interface WhatsAppButtonProps {
  personId: string;
  personName: string;
  personAge: number;
  className?: string;
}

// WhatsApp official logo SVG
const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function WhatsAppButton({
  personId,
  personName,
  personAge,
  className = "",
}: WhatsAppButtonProps) {
  const handleShare = () => {
    const currentUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/person/${personId}`
        : `${process.env.NEXT_PUBLIC_APP_URL}/person/${personId}`;

    const message = `PESSOA DESAPARECIDA: ${personName.toUpperCase()} de ${personAge} anos, está DESAPARECIDO(A). Saiba mais em: ${currentUrl}`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://api.whatsapp.com/send/?text=${encodedMessage}&type=custom_url&app_absent=0`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleShare}
      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-700 hover:bg-green-900 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 ${className}`}
      aria-label={`Compartilhar informações de ${personName} via WhatsApp`}
    >
      <WhatsAppIcon />
      <span>Compartilhar no WhatsApp</span>
    </button>
  );
}
