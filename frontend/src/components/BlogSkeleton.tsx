import { Card } from "./Card";

/**
 * A loading skeleton component that mimics the structure of a blog post.
 *
 * Features:
 * - Animated shimmer effect for loading states
 * - Realistic content placeholder layout
 * - Consistent spacing and sizing
 * - Dark theme optimized
 * - Responsive width variations for natural content flow
 *
 * This component is used to provide a visual placeholder while blog content is loading,
 * reducing perceived loading time and preventing layout shifts.
 *
 * @component
 * @returns {JSX.Element} A skeleton loading state for blog content
 */
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
