# Coffee Recipe management System

## Description
This project uses Express.js for the backend Supabase for DB and Prisma for ORM. Cloudflare worker's with Open API schema is used to handle for AI inference. Repo is organized into AI-Worker and web sections. All cloudflare worker code is in Ai-Worker and express js and front end code is in web.

## Directory Structure
- **source/**: Source files for the Express.js application and Cloudflare Worker
  - **ai-worker/**: Contains the Cloudflare worker code
    - **src/**: Contains the code
      - **endpoints/**: Contains the endpoint code
      - **index.ts**: entry point into the application
  - **web/**: Contains the Express.js web application files.
    - **commands/**: Commands to run - only seed available
    - **config/**: Configurations - only db config is here
    - **middleware/**: Middleware functions.
    - **controller/**: Controller files.
    - **public/**: Static files accessible to the public.
    - **prisma/**: Prisma schema file is here used for ORM
    - **routes/**: Route decleration's grouped into files are here

## Prerequisites
- Node.js installed (see nodejs.org)
- A Cloudflare account 

## Setup
### Setting Up the Express.js Application
1. Navigate to the `src/web` directory:
   ```bash
   cd src/web
   ```
3. Install the necessary packages:
   ```bash
   npm install
   ```
5. Create a `.env` file in the `src/web` directory and populate it with the necessary environment variables:
   - PORT=
   - API_KEY=
   - API_TEXTGEN_URL=
   - API_IMGGEN_URL=
   - DATABASE_URL=
   - SUPABASE_URL=
   - SUPABASE_KEY=
6. To start the application locally, run:
   ```bash
   npm run start
   ```


### Setting Up Cloudflare Worker
1. Navigate to the `worker` directory:
   `cd worker`
2. Ensure you have `wrangler` installed:
   `npm install -g @cloudflare/wrangler`
3. Fill in the .dev.vars with environment variables:
   - API_KEY=
   - CLOUDFLARE_API_TOKEN=
4. Start the development server using Wrangler:
   `npm run wrangler dev`

## Continuous Integration
This project uses GitHub Actions for continuous integration, which performs the following upon each push to the repository:
- Run code quality checks.
- Run tests.
- Deploy to the specified environment when a PR is merged to the `deployment` branch.

## Deployment
To deploy the application:
1. Push your changes to a feature branch and create a pull request to the `deployment` branch.
2. Once the continuous integration checks pass, merge the pull request.
3. The CI/CD pipeline will automatically deploy your changes to the production environment.

