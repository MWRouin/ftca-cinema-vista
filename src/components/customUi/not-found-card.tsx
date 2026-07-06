import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NotFoundCardProps {
  /** Optional illustration above the title (each page styles its own <img>). */
  image?: ReactNode;
  title: string;
  description: ReactNode;
  /** Optional action row (e.g. a back button) rendered in the card footer. */
  action?: ReactNode;
}

/**
 * Centered "not found / non-public" message card used by the detail pages'
 * early returns (Person, BlogArticle, MoviePlayer). Callers supply the copy and,
 * optionally, a page-specific illustration and back action.
 */
export function NotFoundCard({ image, title, description, action }: NotFoundCardProps) {
  return (
    <div className="min-h-screen py-12 flex items-center">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <Card className="text-center">
          <CardHeader>
            {image}
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          {action && <CardContent>{action}</CardContent>}
        </Card>
      </div>
    </div>
  );
}
