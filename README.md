<h1 align="center">
  To-Doify 
</h1>
<p align="center">
  A To-Do List App
</p>

## Installation & Set Up

1. Clone and install dependancies

```
git clone https://github.com/bigwoodentable/patient-medicine-management.git
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

## API Documentation

[API Documentation](https://bigwoodentable.github.io/doc/index.html)

## Github Repo

[repo](https://github.com/bigwoodentable/bigwoodentable.github.io)

## Next Steps

### Microservice Architecture

The next step is to refactor the current monolith into microservices. I am referring to this [course](https://www.udemy.com/course/microservices-with-node-js-and-react/) as the starting point.

## Notes

The feature to remind the user when a task has passed it's deadline is set on an interval of 5 seconds. As it is currently logging to stdout, it may become slightly irrating. If that's the case, please extend the interval or comment out 'deadlineCheck()' in server/server.js.
