# This is to show a more detailed discussion of building or onboarding the product.

## Structure of our repo (please view in raw):

[Github Repo](https://github.com/alien-traveler/cse110-fa22-group39)
/project-root
├── .github
│   └── workflows (Github Action Files)
├── .idea
├── admin
│   ├── workplans (Workplans, April - June 2024)
│   ├── cipipeline (Including video, diagram, docs)
│   ├── meetings (All meeting minutes)
│   ├── specs (ADRs for each Sprint)
│   └── videos (Team status and intro video)
├── source (Source files for the Express.js application and Cloudflare Worker)
│   ├── ai-worker (Contains the Cloudflare worker code)
│   │   └── src
│   │       └── endpoints
│   │           └── index.ts: entry point into the application
│   └── web (Contains the Express.js web application files)
│       ├── tests/current
│       ├── commands (Commands to run - only seed available)
│       ├── config (Configurations - only db config is here)
│       ├── controllers
│       ├── middlewares
│       ├── prisma (Prisma schema file is here used for ORM)
│       ├── routes (Route declarations grouped into files are here)
│       └── public (Static files accessible to the public)
│           ├── assets (Fonts, images, svgs)
│           │   ├── fonts
│           │   ├── images
│           │   └── svgs
│           ├── pages (HTML files)
│           ├── scripts (JS files)
│           └── styles (CSS files)
