
  # Personal website for Joel Karr

  This is a code bundle for Personal website for Joel Karr. The original project is available at https://www.figma.com/design/d5YI1XyleB9T6vmG1zWBrs/Personal-website-for-Joel-Karr.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## 404 Route Assistant (Azure OpenAI)

  The 404 page includes a chat route assistant that calls `POST /api/route-assistant`.

  Configure these environment variables in Azure Static Web Apps (or your function host):

  - `AZURE_OPENAI_ENDPOINT`
  - `AZURE_OPENAI_API_KEY`
  - `AZURE_OPENAI_DEPLOYMENT`
  - `AZURE_OPENAI_API_VERSION` (optional, defaults to `2024-10-21`)

  If these variables are missing, the assistant automatically falls back to local in-page route matching.
  