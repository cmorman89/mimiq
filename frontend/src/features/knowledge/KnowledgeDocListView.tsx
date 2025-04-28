import { Card } from "../../components/Card";

export const KnowledgeDocListView = ({ docType }: { docType: string }) => {
  return (
    <Card>
      <div>KnowledgeDocListView == {docType}</div>
    </Card>
  );
};
