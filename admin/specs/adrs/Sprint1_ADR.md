# Sprint 1 ADR

## Cloudflare as a CDN and DNS provider

### Context and Problem Statement

We need a DNS provider to manage our domain.

### Considered Options

- Cloudflare
- Route 53
- GoDaddy
- Namecheap

### Decision Outcome

We chose Cloudflare because it is a popular choice for DNS management and it provides a CDN service as well. It was easy
to setup and configure. We were able to use the analytics and security features provided by Cloudflare. We also used the
CDN service to cache our static assets. We were able to use pages as an early preview of our website. We moved on to using
Render.com for hosting our website once we had the backend setup. Using cloudflare will also allow us to use their workers

## Render.com as a hosting provider

### Context and Problem Statement

We need a hosting provider to host our website.

### Considered Options

- Render.com
- Heroku
- Vercel
- Netlify
- Linode
- Digital Ocean

### Decision Outcome

We chose Render.com because it was easy free without any credit card required. We were able to deploy our website with a
single click. We used cloudflare as our NS provider to point to Render.com. We were able to setup CD using github actions.
Only downside was that if the website does not recieve traffic for 15 minutes, the website goes to sleep and takes a few
seconds to wake up. We discussed this with the team and decided that this was a compromise we were willing to make.

## Express.js as a backend framework

### Context and Problem Statement

We need a backend framework to build our API.

### Considered Options

- Express.js
- FastAPI
- Django
- NextJS
- Laravel
- Cloudflare Workers

### Decision Outcome

We eliminated FastAPI, Django, and Laravel because we wanted to use JavaScript for the backend as well. We eliminated NextJS since
we were looking for a backend framework. We eliminated Cloudflare Workers since we wanted to make our backend more flexible and deployable
on other platforms. We chose Express.js because it is a popular choice for building APIs, it is simple to use and unopinionated. We also liked
the middleware support provided by Express.js.

## Vanilla JS as a frontend framework

### Context and Problem Statement

We need a frontend framework to build our website.

### Considered Options

- Vanilla JS
- React
- Vue
- Angular
- Svelte

### Decision Outcome

We chose Vanilla JS because we wanted to keep our frontend simple and lightweight. We did not want to add the complexity of a frontend
framework. We were able to use the fetch API to make requests to our backend. We were able to use the DOM API to manipulate the DOM. We felt like
we did not have a complex enough frontend to justify using a frontend framework. We also wanted to maximize the time used to develop features which
would have been spent learning a frontend framework.

## Supabase as a database provider

### Context and Problem Statement

We need a database provider to store our data.

### Considered Options

- Supabase
- Firebase
- MongoDB

### Decision Outcome

We chose Supabase because it is an open source alternative to Firebase. We were able to use the Postgres database provided by Supabase. We were able
to use the Supabase client to make requests to the database. We were able to use the Supabase auth to authenticate users. Postgres is tried and tested
database system and Supabase was able to provide a simple API to interact with the database.

## GitHub Actions as a CI/CD tool

### Context and Problem Statement

We need a CI/CD tool to automate our deployment process.

### Considered Options

- GitHub Actions
- CircleCI
- TravisCI
- Jenkins
- GitLab CI

### Decision Outcome

We chose GitHub Actions because it was easy to setup and configure. Our repo is hosted on GitHub so it made sense to use GitHub Actions.
Other tools we were using were compatible with GitHub Actions and we did not have to learn a new tool.

## GitHub Projects as a project management tool

### Context and Problem Statement

We need a project management tool to manage our project.

### Considered Options

- GitHub Projects
- Trello
- Asana
- Jira

### Decision Outcome

We chose GitHub Projects because it was integrated with GitHub. We were able to create issues and link them to the project board. We were able to
create tasks and assign them to team members. We were able to create milestones and track our progress. We were able to use the project board to
track our progress and plan our sprints. We used hours based estimation for our tasks and were able to track our progress using the project board.
