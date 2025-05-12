import { Card } from "./Card";

export const BlogSkeleton = () => {
  return (
    <Card type="dark" padding="tight" className="flex-col gap-2">
      <div className="shimmer-skeleton h-12 w-4/5 rounded-md bg-gray-800 mb-4"></div>
      <div className="shimmer-skeleton h-6 w-full rounded-md bg-gray-800 mb-2"></div>
      <div className="shimmer-skeleton h-6 w-11/12 rounded-md bg-gray-800 mb-2"></div>
      <div className="shimmer-skeleton h-6 w-full rounded-md bg-gray-800 mb-4"></div>
      <div className="shimmer-skeleton h-6 w-full rounded-md bg-gray-800 mb-2"></div>
      <div className="shimmer-skeleton h-6 w-10/12 rounded-md bg-gray-800 mb-4"></div>
      <div className="shimmer-skeleton h-6 w-full rounded-md bg-gray-800 mb-2"></div>
      <div className="shimmer-skeleton h-6 w-11/12 rounded-md bg-gray-800 mb-2"></div>
      <div className="shimmer-skeleton h-6 w-3/4 rounded-md bg-gray-800"></div>
    </Card>
  );
};
