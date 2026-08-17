export default function AboutLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12 animate-pulse">
      <div className="border-b border-neutral-900 pb-8 flex flex-col gap-4">
        <div className="h-4 w-28 bg-[#111] rounded" />
        <div className="h-16 w-1/2 bg-[#111] rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-[#111] rounded-lg border border-neutral-900" />
        <div className="h-64 bg-[#111] rounded-lg border border-neutral-900" />
      </div>
    </div>
  );
}
