export default function ProjectDetailSkeleton() {
  return (
    <div className="grid grid-cols-[300px_auto] p-15 gap-20">
      <div>
        <div className="aspect-[16/2] bg-foreground/10 w-full rounded-full animate-pulse" />
        <div className="mt-5 flex flex-col gap-3">
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
        </div>

        <div className="aspect-[16/2] bg-foreground/10 w-full rounded-full animate-pulse mt-10" />
        <div className="mt-5 flex flex-col gap-3">
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
        </div>
      </div>

      <div>
        <div className="aspect-[16/9] bg-foreground/10 w-full rounded-xl animate-pulse" />
        <div className="mt-5 flex flex-col gap-3">
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
