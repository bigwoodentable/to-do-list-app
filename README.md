<h1 align="center">
  To-Do
</h1>
<p align="center">
  This app is created based on the user requirements below. I was given around 10 days to complete this.

User Requirements:

  <ol>
    <li>As a user, I can view all lists and tasks which have been created </li>
    <li>As a user, I can create an empty list with a name property </li>
    <li>As a user, I can delete an entire list with all its tasks </li>
    <li>As a user, I can add new tasks to an existing list with a name description and deadline properties </li>
    <li>As a user, I can update the name, description and deadline of a task within a list </li>
    <li>As a user, I can move a single task to a different list </li>
    <li>As a user, I can move multiple tasks to a different list in a single transaction </li>
    <li>As a user, I can delete a task from a list </li>
    <li>As a user, I can delete multiple tasks from a list in a single transaction </li>
    <li>As a user, I can complete a task </li>
    <li>As a user, I will receive an email (mock this functionality by logging to stdout) when a
task is completed </li>
    <li>As a user, I will receive an email (mock this functionality by logging to stdout) when a
task passes it's deadline </li>
</ol>

Bonus Requirements:

  <ol>
  <li>Microservice architecture (potentially implementing patterns such as an API Gateway)</li>
  <li>Containerisation (docker-compose, minikube, etc.)</li>
  <li>Relational or non-relational database (possibly run as a container with the
application)</li>
  <li>The Twelve-Factor App</li>
  <li>Tests (unit and/or integration)</li>
  <li>Documentation of API</li>
  <li>Good developer onboarding steps</li>
  </ol>
</p>
</div>
</br></br>

## Installation & Set Up

1. Clone and install dependancies

```
git clone https://github.com/bigwoodentable/bigwoodentable.github.io.git
npm install
```

2. Create and populate database

```
npm run knex migrate:latest
npm run knex seed:run
```

3. Start the server (dev)

```
npm run dev
```

4. Server runs on [http://localhost:3000](http://localhost:3000)

## Unit and Integration Tests

```
npm run test

```

## Next Steps

### Microservice Architecture

The next step is to refactor the current monolith into microservices. I am referring to this [course](https://www.udemy.com/course/microservices-with-node-js-and-react/) as the starting point.

## Notes

The feature to remind the user when a task has passed it's deadline is set on an interval of 5 seconds. As it is currently logging to stdout, it may become slightly irrating. If that's the case, please extend the interval or comment out 'deadlineCheck()' in server/server.js.
