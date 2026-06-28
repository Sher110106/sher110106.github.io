import Link from "next/link";

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <nav className="fixed top-0 left-0 w-full px-6 py-5 z-50 bg-bg-base/90 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-accent-amber transition-colors font-mono"
          >
            ← Back
          </Link>
          <span className="text-[10px] text-text-dim tracking-wider font-mono">FIELD NOTES</span>
        </div>
      </nav>
      {children}
    </div>
  );
}
