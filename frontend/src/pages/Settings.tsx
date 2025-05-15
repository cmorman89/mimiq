import { Card } from "../components/Card";
import { PageContainer } from "../features/page_container/PageContainer";

/**
 * The Settings page component that provides LMStudio connection configuration.
 *
 * Features:
 * - Connection protocol selection (HTTP/HTTPS)
 * - Server address configuration
 * - API endpoint customization
 * - Endpoint prefix management
 * - Models endpoint configuration
 * - Completions endpoint setup
 * - Embeddings endpoint setup
 * - Styled form inputs
 *
 * This page allows users to configure their LMStudio connection settings,
 * including the server address and various API endpoints used throughout
 * the application.
 *
 * @component
 * @returns {JSX.Element} The settings page with LMStudio connection configuration forms
 */
export const Settings = () => {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <Card className="h-content">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">LMStudio Connection</h1>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Connection</h2>
              <div className="flex items-center gap-0 bg-white/10 rounded-md">
                <select className="w-shrink-0 bg-transparent rounded-l-md px-2 py-1 h-full outline-none">
                  <option value="https">https://</option>
                  <option value="http">http://</option>
                </select>
                <input
                  type="text"
                  className="w-full bg-transparent rounded-r-md px-2 py-1 h-full outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Endpoints</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center bg-white/10 rounded-md">
                  <label
                    htmlFor="lmstudio-endpoint-prefix"
                    className="px-2 py-1 text-sm text-white/50 items-center w-28"
                  >
                    Prefix:
                  </label>
                  <div className="flex h-full items-center text-white/50">
                    /
                    <input
                      id="lmstudio-endpoint-prefix"
                      type="text"
                      className="w-full pr-2 py-1 bg-transparent outline-none text-white"
                      value="v1"
                    />
                  </div>
                </div>
                <div className="flex items-center bg-white/10 rounded-md">
                  <label
                    htmlFor="lmstudio-endpoint-models"
                    className="px-2 py-1 text-sm text-white/50 items-center w-28"
                  >
                    Models:
                  </label>
                  <div className="flex h-full items-center text-white/50">
                    /v1/
                    <input
                      id="lmstudio-endpoint-models"
                      type="text"
                      className="w-full pr-2 py-1 bg-transparent outline-none text-white"
                      value="models"
                    />
                  </div>
                </div>
                <div className="flex items-center bg-white/10 rounded-md">
                  <label
                    htmlFor="lmstudio-endpoint-completions"
                    className="px-2 py-1 text-sm text-white/50 items-center w-28"
                  >
                    Completions:
                  </label>
                  <div className="flex h-full items-center text-white/50">
                    /v1/
                    <input
                      id="lmstudio-endpoint-completions"
                      type="text"
                      className="w-full pr-2 py-1 bg-transparent outline-none text-white"
                      value="chat/completions"
                    />
                  </div>
                </div>
                <div className="flex items-center bg-white/10 rounded-md">
                  <label
                    htmlFor="lmstudio-endpoint-models"
                    className="px-2 py-1 text-sm text-white/50 items-center w-28"
                  >
                    Embeddings:
                  </label>
                  <div className="flex h-full items-center text-white/50">
                    /v1/
                    <input
                      id="lmstudio-endpoint-embeddings"
                      type="text"
                      className="w-full pr-2 py-1 bg-transparent outline-none text-white"
                      value="embeddings"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
