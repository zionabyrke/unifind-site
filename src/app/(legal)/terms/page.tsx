import { readLegalDocument } from "@/lib/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = { title: "Terms of Service" };

export default function TermsOfServicePage() {
  const markdown = readLegalDocument("terms-of-service.md");
  return <LegalDocument markdown={markdown} />;
}
