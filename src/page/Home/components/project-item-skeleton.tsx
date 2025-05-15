export default function ProjectItemSkeleton() {
  return (
    <div className="">
      <div>
        {/* <div className="aspect-[16/2] bg-foreground/10 w-full rounded-full animate-pulse" /> */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="h-4 bg-foreground/10 w-1/3 rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-2/3 rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
        </div>
      </div>

      <div>
        <div className="mt-5 flex flex-col gap-3">
          <div className="h-4 bg-foreground/10 w-2/3 rounded-full animate-pulse" />
          <div className="h-4 bg-foreground/10 w-full rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
