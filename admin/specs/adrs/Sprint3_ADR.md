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

We chose Jest/Pupppeteer as this was the testing framework that this repository was already using. In addition, a majority of this team has used Jest/Puppeteer in the past, hence it made sense to use something we are already familiar with. There was no need to add complexity by learning a new testing framework. We did remove legacy Jest/Puppeteer tests and create completley new ones.