# Task Manager API

This is a simple Node.js project that provides a task management API. The project uses JavaScript and is managed with npm.

### Prerequisites

You need to have Node.js and npm installed on your machine. If you don't have Node.js installed, you can download it from [here](https://nodejs.org/en/download/).

### Installing

1. Clone the repository:
    ```
    git clone https://github.com/kmanikanth/task-manager.git
    ```

2. Navigate to the project directory:
    ```
    cd task-manager
    ```

3. Install the dependencies:
    ```
    npm install
    ```

## Running the Application

To start the application, run the following command in the project directory:

```
node app.js
```

## Running the Tests

To run the tests, use the following command:

```
npm test
```

## API Endpoints

The application provides the following endpoints:

- `GET /tasks`: Fetches all tasks. Supports pagination and sorting through query parameters.
- `GET /tasks/:id`: Fetches a task by its ID.
- `GET /tasks/priority/:level`: Fetches tasks by their priority.
- `POST /tasks`: Creates a new task.
- `PUT /tasks/:id`: Updates an existing task.
- `DELETE /tasks/:id`: Deletes a task by its ID.

## Built With

- [Node.js](https://nodejs.org/) - The runtime environment
- [express](https://expressjs.com/) - The web framework
- [npm](https://www.npmjs.com/) - Dependency Management

## Authors

- **kmanikanth** - *Initial work* - [kmanikanth](https://github.com/kmanikanth)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.