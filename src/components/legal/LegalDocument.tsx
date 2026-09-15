import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LegalDocumentProps {
  markdown: string;
}

export function LegalDocument({ markdown }: LegalDocumentProps) {
  return (
    <article className="prose prose-unifind prose-sm md:prose-base max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
