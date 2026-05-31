import { Link } from "react-router-dom";
import { Heart, AlertCircle, Search, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "@/features/wishlist/wishlistApi";

export default function Wishlist() {
  const { data, isLoading, error, refetch } = useGetWishlistQuery();
  const [removeItem, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-muted-foreground">Courses you've saved for later.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <AlertCircle className="size-12 text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">Failed to load wishlist</h2>
            <p className="text-muted-foreground mb-6">Please try again later.</p>
            <Button onClick={refetch}>Try Again</Button>
          </CardContent>
        </Card>
      ) : !data?.data?.length ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Heart className="size-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save courses you're interested in to revisit later.</p>
            <Button asChild>
              <Link to="/search"><Search className="mr-2 size-4" />Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium leading-snug">
                  <Link to={`/course/${item.courseId}`} className="hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Added on {item.addedAt ? new Date(item.addedAt).toLocaleDateString() : "N/A"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  disabled={isRemoving}
                  onClick={() => removeItem(item.id)}
                >
                  {isRemoving ? (
                    <Loader2 className="size-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="size-4 mr-2" />
                  )}
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
