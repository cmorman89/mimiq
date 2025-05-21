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
      <div className="w-4/5 h-12 mb-4 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-full h-6 mb-2 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-11/12 h-6 mb-2 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-full h-6 mb-4 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-full h-6 mb-2 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-10/12 h-6 mb-4 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-full h-6 mb-2 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-11/12 h-6 mb-2 bg-gray-800 rounded-md shimmer-skeleton"></div>
      <div className="w-3/4 h-6 bg-gray-800 rounded-md shimmer-skeleton"></div>
    </Card>
  );
};
