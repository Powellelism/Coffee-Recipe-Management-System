# Sprint 2 ADR

## Using Cloudflare Workers for our additional APIs

### Context and Problem Statement

We need to build additional APIs for our website. We need to decide on a technology to build these APIs especially in the
AI/ML space.

### Considered Options

- Cloudflare Workers
- AWS Lambda
- Google Cloud Functions
- Azure Functions
- Supabase functions

### Decision Outcome

We chose Cloudflare Workers because it is a serverless platform that allows us to run JavaScript functions at the edge with GPU
support. Cloudflare allows us to connect to the GPU's they have at the edge and run inference on models they have on board for 
free up untill a certain neuron limit. This is going to help us build AI/ML features for our website without needing to pay

## Using Prisma as an ORM

### Context and Problem Statement

We were having slower then expected development times with our current database connection system.

### Considered Options

- Prisma
- TypeORM
- Sequelize
- Status Quo

### Decision Outcome

We chose Prisma because it is a modern ORM that is easy to use and has a lot of features. We liked the type safety that Prisma
provides and the ease of use. We also liked the fact that Prisma has a lot of features that we can use in the future like migrations
and a query builder. Migrations were very useful for setting up our database. We were able to use the Prisma CLI to generate migrations
and seeder files. We converted the previous code to use Prisma easily. 

## Rewrite of frontend

### Context and Problem Statement

Our frontend was not looking very good and it was also not very responsive.

### Considered Options

- Rewrite
- Status Quo

### Decision Outcome

We chose to rewrite the frontend because we wanted to make it look better and be more responsive. We also wanted to make it easier
to add new features in the future. 

## Structural Updates to the project

### Context and Problem Statement

We needed to make some structural updates to the project to make it easier to work with. Current structure was not very good.

### Considered Options

- Status Quo
- Update

### Decision Outcome

We chose to update the structure of the project. We wanted to make it easier to work with and add new features.

## Monorepo vs Multirepo

### Context and Problem Statement

Adding the cloudflare backend could be done in the same repo or a different repo.

### Considered Options

- Monorepo
- Multirepo

### Decision Outcome

We chose to use a monorepo because it was easier to work with. We were able to keep all the code in one place and it was easier to
present for grading purposes.
