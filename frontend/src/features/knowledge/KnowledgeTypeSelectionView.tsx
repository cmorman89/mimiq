import {
  FaBlog,
  FaNewspaper,
  FaPodcast,
  FaBook,
  FaComments,
  FaVideo,
  FaList,
  FaTextHeight,
} from "react-icons/fa";
import { KnowledgeTypeCard } from "./components/KnowledgeTypeCard";

export const KnowledgeTypeSelectionView = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
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
  );
};
