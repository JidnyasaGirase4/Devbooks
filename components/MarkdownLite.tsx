// Tiny markdown renderer — handles ## headings, bullet lists, links and paragraphs.
// Server-safe (no client hooks).

type Block =
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "p"; text: string };

function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ kind: "p", text: para.join(" ").trim() });
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ kind: "ul", items: list });
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push({ kind: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushPara();
      list.push(line.slice(2).trim());
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

function renderInline(text: string): React.ReactNode {
  // Replace **bold** and naked URLs / emails with anchors
  const out: React.ReactNode[] = [];
  let key = 0;
  // Email + URL detection
  const linkRe =
    /\b(mailto:[\w.+-]+@[\w.-]+|https?:\/\/[^\s)]+|[\w.+-]+@[\w.-]+\.\w+)\b/g;
  let lastIdx = 0;
  let match;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIdx) {
      out.push(text.slice(lastIdx, match.index));
    }
    const raw = match[0];
    const href = raw.includes("@") && !raw.startsWith("mailto:")
      ? `mailto:${raw}`
      : raw;
    out.push(
      <a
        key={`link-${key++}`}
        href={href}
        className="font-semibold text-brand-700 hover:text-brand-900"
      >
        {raw.replace(/^mailto:/, "")}
      </a>
    );
    lastIdx = match.index + raw.length;
  }
  if (lastIdx < text.length) out.push(text.slice(lastIdx));
  return out;
}

export default function MarkdownLite({ source }: { source: string }) {
  const blocks = parse(source);
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.kind === "h2") {
          return (
            <h2
              key={i}
              className="display text-2xl font-semibold text-ink-900"
            >
              {b.text}
            </h2>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-5 text-ink-700/85 marker:text-brand-700"
            >
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="leading-relaxed text-ink-700/85">
            {renderInline(b.text)}
          </p>
        );
      })}
    </div>
  );
}
