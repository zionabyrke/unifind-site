import fs from "node:fs";
import path from "node:path";

export function readLegalDocument(filename: string): string {
  const filePath = path.join(process.cwd(), "src/content/legal", filename);
  return fs.readFileSync(filePath, "utf-8");
}
