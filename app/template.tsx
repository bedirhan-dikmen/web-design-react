/**
 * Re-mounted on every navigation (unlike layout.tsx), so each page settles in
 * with a short fade (.k-page-enter in globals.css; off under reduced motion).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="k-page-enter">{children}</div>;
}
