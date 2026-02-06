export default function Loader({ label = "Loading…" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 h-[100vh]"
    >
      <span
        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500"
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}