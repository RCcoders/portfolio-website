export default function CertificationsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12 animate-pulse">
      <div className="border-b border-neutral-900 pb-8 flex flex-col gap-4">
        <div className="h-4 w-32 bg-[#111] rounded" />
        <div className="h-16 w-3/4 max-w-xl bg-[#111] rounded" />
      </div>
      <div className="h-[420px] w-full bg-[#111] rounded-xl border border-neutral-900 flex items-center justify-center">
        <div className="h-8 w-48 bg-neutral-900 rounded" />
      </div>
    </div>
  );
}
