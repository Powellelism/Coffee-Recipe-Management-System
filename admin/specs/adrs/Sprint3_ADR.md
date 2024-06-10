# Sprint 3 ADR

## Using Jest/Puppeteer as our testing framework.

### Context and Problem Statement

We need to build unit and end to end testing for our site. What is the best way of going about this and what approaches should we consider?

### Considered Options

- Jest/Puppeteer
- PlayWright
- Nothing
- Cypress
- Mocha

### Decision Outcome

We chose Jest/Pupppeteer as this was the testing framework that this repository was already using. In addition, a majority of this team has used Jest/Puppeteer in the past, hence it made sense to use something we are already familiar with. There was no need to add complexity by learning a new testing framework. We did remove legacy Jest/Puppeteer tests and create completley new ones.$


## Using nodemon for our live update when code in backend.

### Context and Problem Statement

Whenever we make change to backend, we will need to rerun the command `npm run start` in the backend folder so that it update the change. However this take it a lot of time and getting annoyned as we are working on backend. Hence, we are finding a solution to run the command for us every single time we make a changes to our code and we can see and test our changes immediately.

### Considered Options

- nodemon 
- live reload 

### Decision Outcome
We choose to use nodemon because it is easy to install as a package inside our project. Nodemon is better to use for any code updates in backend while livereload work better for frontend changes such as changes in css or html file.

## Using faker to generate random testing data

### Context and Problem Statement

We need a lot of mock data for our testing in both backend and frontend. Hoever, we don't want to spend time doing manual work by creating mock data and models in our database manually. Hence we are looking for a way to automatic this process and create a lot of random data for our testing purpose.

### Considered Options

- mockaroo 
- faker

### Decision Outcome

We chose faker as our software to generate mock data because we can easily install as an npm package into our project and there is a lot of documentation provided for the code to generate mock data for us based on our schemas in our codebase. We don't need to manually provided the schema structure but we can just set up a general script and told us the model that we want to created fake data and faker will handle the work for us. Compare to mockaroo where you will have to provide the structure of your model and you have to get on its website to generate fake data. 