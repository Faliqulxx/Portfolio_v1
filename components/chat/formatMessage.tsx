import type { ReactNode } from "react";

// Handles **bold**, `inline code`, [links](url), raw URLs, and emails.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  // Regex matches:
  // 1. **bold**
  // 2. `code`
  // 3. [text](url)
  // 4. http(s):// raw url (ignoring trailing punctuation)
  // 5. email address
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+?(?=[.,!?;:]*(?:\s|$))|[\w.-]+@[\w.-]+\.\w+)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-b-${i}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-c-${i}`}
          className="rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em] dark:bg-white/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Markdown link: [text](url)
    const markdownLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (markdownLinkMatch) {
      return (
        <a
          key={`${keyPrefix}-ml-${i}`}
          href={markdownLinkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
          className="hover:text-blue-700"
        >
          {markdownLinkMatch[1]}
        </a>
      );
    }

    // Raw URL: https://...
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={`${keyPrefix}-url-${i}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
          className="hover:text-blue-700"
        >
          {part}
        </a>
      );
    }

    // Email
    if (/^[\w.-]+@[\w.-]+\.\w+$/.test(part)) {
      return (
        <a
          key={`${keyPrefix}-email-${i}`}
          href={`mailto:${part}`}
          style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
          className="hover:text-blue-700"
        >
          {part}
        </a>
      );
    }

    return <span key={`${keyPrefix}-t-${i}`}>{part}</span>;
  });
}

// Splits on ```fenced code blocks```, rendering the code segments with
// monospace/pre styling and running renderInline() over the plain-text
// segments in between. No markdown library involved.
export function renderMessageContent(content: string): ReactNode {
  const segments = content.split(/```([\s\S]*?)```/g);

  return segments.map((segment, i) => {
    const isCodeBlock = i % 2 === 1; // capture group -> odd indices
    if (isCodeBlock) {
      const code = segment.replace(/^\w*\n/, ""); // drop an optional language hint line
      return (
        <pre
          key={`code-${i}`}
          className="my-2 overflow-x-auto rounded-lg bg-black/80 p-3 text-xs leading-relaxed text-gray-100"
        >
          <code className="font-mono">{code}</code>
        </pre>
      );
    }
    return (
      <span key={`text-${i}`} className="whitespace-pre-wrap">
        {renderInline(segment, `seg-${i}`)}
      </span>
    );
  });
}
