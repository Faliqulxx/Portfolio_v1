"use client";

export default function TypingIndicator() {
  return (
    <span
      role="status"
      aria-label="AI sedang mengetik"
      className="inline-flex items-center gap-1 py-0.5"
    >
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
    </span>
  );
}
