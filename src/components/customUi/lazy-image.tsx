import { useState } from "react";
import { Loader } from "@/components/customUi/loader";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loaderSize?: number;
}

export function LazyImage({
  loaderSize = 24,
  className,
  alt,
  ...props
}: LazyImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={loaderSize} text={alt} />
        </div>
      )}

      <img
        {...props}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
}