import { PersonDetail } from "@/src/components/common/PersonDetail";

interface PersonDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PersonDetailPage({
  params,
}: PersonDetailPageProps) {
  const { id } = await params;

  return <PersonDetail id={id} />;
}
