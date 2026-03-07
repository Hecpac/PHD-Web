import type { ReactNode } from "react";

const ORDERED_LIST_ITEM = /^\d+\.\s+(.*)$/;
const UNORDERED_LIST_ITEM = /^-\s+(.*)$/;
const INLINE_TOKEN = /(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "paragraph"; content: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] };

type BlogRichTextProps = {
  content?: string;
};

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_TOKEN)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(<strong key={`strong-${index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`em-${index}`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("[") && token.includes("](")) {
      const separatorIndex = token.indexOf("](");
      const label = token.slice(1, separatorIndex);
      const href = token.slice(separatorIndex + 2, -1);
      nodes.push(
        <a
          key={`link-${index}`}
          href={href}
          className="font-medium text-accent underline-offset-4 hover:underline"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {label}
        </a>,
      );
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function parseMarkdownBlocks(content: string): MarkdownBlock[] {
  return content
    .trim()
    .split(/\n{2,}/)
    .map((rawBlock) => {
      const lines = rawBlock
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length === 0) {
        return null;
      }

      if (lines.length === 1 && lines[0].startsWith("## ")) {
        return {
          type: "heading",
          level: 2,
          content: lines[0].slice(3).trim(),
        } satisfies MarkdownBlock;
      }

      if (lines.length === 1 && lines[0].startsWith("### ")) {
        return {
          type: "heading",
          level: 3,
          content: lines[0].slice(4).trim(),
        } satisfies MarkdownBlock;
      }

      if (lines.every((line) => UNORDERED_LIST_ITEM.test(line))) {
        return {
          type: "unordered-list",
          items: lines.map((line) => line.replace(UNORDERED_LIST_ITEM, "$1")),
        } satisfies MarkdownBlock;
      }

      if (lines.every((line) => ORDERED_LIST_ITEM.test(line))) {
        return {
          type: "ordered-list",
          items: lines.map((line) => line.replace(ORDERED_LIST_ITEM, "$1")),
        } satisfies MarkdownBlock;
      }

      return {
        type: "paragraph",
        content: lines.join(" "),
      } satisfies MarkdownBlock;
    })
    .filter((block): block is MarkdownBlock => Boolean(block));
}

export function BlogRichText({ content }: BlogRichTextProps) {
  const blocks = content ? parseMarkdownBlocks(content) : [];

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 text-base leading-7 text-ink/90">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 2) {
            return (
              <h2 key={index} className="type-heading pt-2 text-ink">
                {renderInlineMarkdown(block.content)}
              </h2>
            );
          }

          return (
            <h3 key={index} className="text-lg font-semibold tracking-tight text-ink">
              {renderInlineMarkdown(block.content)}
            </h3>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={index} className="ml-5 list-disc space-y-2 text-muted marker:text-accent">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={index} className="ml-5 list-decimal space-y-2 text-muted marker:font-semibold marker:text-accent">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInlineMarkdown(item)}</li>
              ))}
            </ol>
          );
        }

        return <p key={index}>{renderInlineMarkdown(block.content)}</p>;
      })}
    </div>
  );
}
