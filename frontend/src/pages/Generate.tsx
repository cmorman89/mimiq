import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";

export const Generate = () => {
  return (
    <PageContainer>
      <div className="h-full">
        <Card>
          <Button to="" type="accent">Generate</Button>
        </Card>
      </div>
    </PageContainer>
  );
};
