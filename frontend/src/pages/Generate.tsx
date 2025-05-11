import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";
import { GenerateWorkflow } from "../features/generate/components/GenerateWorkflow";

export const Generate = () => {
  return (
    <PageContainer>
      <div className="h-full flex gap-6">
        <Card className="flex-col gap-2">
          <GenerateWorkflow nodeArray={["Blog Topic", "Blog Description", "Blog Tone", "Blog Audience", "Blog Length"]} />
          <label htmlFor="blog-topic" className="text-xl text-white/90">
            Blog Topic
          </label>
          <div className="p-px bg-gradient-mimiq rounded-md">
            <input
              id="blog-topic"
              type="text"
              className="w-full bg-gray-700 rounded-md px-2 py-1 outline-none"
            />
          </div>
          <label htmlFor="blog-description" className="text-sm text-white/50">
            Blog Description
          </label>
          <textarea
            id="blog-description"
            className="w-full bg-white/10 rounded-md px-2 py-1 outline-none"
          />
          <label htmlFor="blog-tone" className="text-sm text-white/50">
            Blog Tone
          </label>
          <input
            id="blog-tone"
            type="text"
            className="w-full bg-white/10 rounded-md px-2 py-1 outline-none"
          />
          <label htmlFor="blog-audience" className="text-sm text-white/50">
            Blog Audience
          </label>
          <input
            id="blog-audience"
            type="text"
            className="w-full bg-white/10 rounded-md px-2 py-1 outline-none"
          />
          <label htmlFor="blog-purpose" className="text-sm text-white/50">
            Blog Purpose
          </label>
          <input
            id="blog-purpose"
            type="text"
            className="w-full bg-white/10 rounded-md px-2 py-1 outline-none"
          />
          <label htmlFor="blog-length" className="text-sm text-white/50">
            Blog Length
          </label>
          <input
            id="blog-length"
            type="text"
            className="w-full bg-white/10 rounded-md px-2 py-1 outline-none"
          />
          <div className="p-px bg-gradient-mimiq rounded-md">
            <input
              type="text"
              className="w-full bg-gray-700 rounded-md px-2 py-1 outline-none"
            />
          </div>
          <Button to="" type="accent">
            Generate
          </Button>
        </Card>
        <Card></Card>
      </div>
    </PageContainer>
  );
};
