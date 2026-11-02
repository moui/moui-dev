import { getAllContent } from "@/lib/content";
import PageContent from "@/components/PageContent";

export default async function Home() {
  const [en, es] = await Promise.all([getAllContent("en"), getAllContent("es")]);
  return <PageContent en={en} es={es} />;
}
