import {
  FaBlog,
  FaNewspaper,
  FaPodcast,
  FaBook,
  FaComments,
  FaVideo,
  FaList,
  FaTextHeight,
  FaExclamationTriangle,
} from "react-icons/fa";
import { KnowledgeTypeCard } from "./components/KnowledgeTypeCard";
import { Card } from "../../components/Card";

/**
 * A grid view component that displays different types of knowledge content categories.
 *
 * Features:
 * - Grid layout with responsive columns
 * - Visual icons for each content type
 * - Navigation cards for different knowledge categories
 * - Consistent styling across all category cards
 *
 * This component serves as the main navigation interface for the knowledge base,
 * allowing users to browse different types of content such as blog posts, books,
 * videos, podcasts, articles, and discussions.
 *
 * @component
 * @returns {JSX.Element} A grid of knowledge type selection cards
 */
export const KnowledgeTypeSelectionView = () => {
  return (
    <Card className="flex-col gap-4">
      <div className="flex gap-2 items-center justify-center my-4 ">
        <FaExclamationTriangle className="text-xxl text-yellow-500" />
        <p>
          <span className="font-bold text-yellow-500 text-lg">Note: </span>
          Knowledge page under development.
        </p>
      </div>
      <div className="h-px flex border-1 my-4 bg-gray-600"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 h-fit">
        <KnowledgeTypeCard
          to="blog"
          className="font-bold text-xl"
          icon={<FaBlog className="text-2xl" />}
          children="Blog Posts"
        />
        <KnowledgeTypeCard
          to="books"
          className="font-bold text-xl"
          icon={<FaBook className="text-2xl" />}
          children="Books"
        />
        <KnowledgeTypeCard
          to="videos"
          className="font-bold text-xl"
          icon={<FaVideo className="text-2xl" />}
          children="Videos"
        />
        <KnowledgeTypeCard
          to="podcasts"
          className="font-bold text-xl"
          icon={<FaPodcast className="text-2xl" />}
          children="Podcasts"
        />
        <KnowledgeTypeCard
          to="articles"
          className="font-bold text-xl"
          icon={<FaNewspaper className="text-2xl" />}
          children="Articles"
        />
        <KnowledgeTypeCard
          to="other"
          className="font-bold text-xl"
          icon={<FaTextHeight className="text-2xl" />}
          children="Other"
        />
        <KnowledgeTypeCard
          to="all"
          className="font-bold text-xl"
          icon={<FaList className="text-2xl" />}
          children="All"
        />
        <KnowledgeTypeCard
          to="discussions"
          className="font-bold text-xl"
          icon={<FaComments className="text-2xl" />}
          children="Discussions"
        />
      </div>
    </Card>
  );
};
