import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number;
  className?: string;
  text?: string;
}

export function Loader({ size = 32, className, text }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className="rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin"
        style={{ width: size, height: size }}
      />
      {text && (
        <span className="text-sm text-muted-foreground">
          {text}
        </span>
      )}
    </div>
  );
}
