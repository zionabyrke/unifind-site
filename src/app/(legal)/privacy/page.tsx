import { readLegalDocument } from "@/lib/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  const markdown = readLegalDocument("privacy-policy.md");
  return <LegalDocument markdown={markdown} />;
}
