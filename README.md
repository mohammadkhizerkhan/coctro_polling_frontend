# Polling App

A real-time polling application where users can create polls with multiple options, vote on existing polls, and view the results in real-time. The project is built with Next.js, TypeScript, Tailwind CSS for the frontend, and Node.js with MongoDB for the backend, and it is deployed on Vercel.

[Live Demo](https://coctro-polling-frontend.vercel.app/)

## Features

- **User Creation:** Users can create an account by inputting their name.
- **Poll Creation:** Users can create a new poll with a question and multiple options.
- **Voting:** Users can vote on existing polls. Users are restricted to voting once per poll.
- **Real-time Results:** Poll results are updated every 5 seconds.
- **Responsive Design:** The app is designed to work on both desktop and mobile devices.

## How It Works

- When a user first visits the site, they are prompted to create an account by entering their name.
- The user is then redirected to the Polls page, where they can view existing polls or create a new poll.
- The Polls page displays a list of active polls in a 4-column grid layout.
- Users can click on a poll to view its details and vote on one of the options.
- Once a user votes, their choice is stored, and they can no longer vote on the same poll.
- The results of each poll are updated in real-time, with data being fetched every 5 seconds.

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Deployment:** Vercel (Frontend), MongoDB Atlas (Database)
- **State Management:** React useState and useEffect hooks

## API Endpoints

### Create User

**Endpoint:**
```
POST /api/users
```

**Example Request:**
```bash
curl -X POST https://cactro-polling-backend.vercel.app/api/users \
  -H 'Content-Type: application/json' \
  -d '{ "name": "John Doe" }'
```

### Create Poll

**Endpoint:**
```
POST /api/questions
```

**Example Request:**
```bash
curl -X POST https://cactro-polling-backend.vercel.app/api/questions \
  -H 'Content-Type: application/json' \
  -d '{
        "question": "What is your favorite programming language?",
        "user_id": "user_id",
        "options": ["JavaScript", "Python", "Java", "C#"]
      }'
```

**Example Response:**
```json
{
  "_id": "poll_id",
  "question": "What is your favorite programming language?",
  "user_id": "user_id",
  "options": [
    { "option_name": "JavaScript", "votes": [], "_id": "option_id" },
    { "option_name": "Python", "votes": [], "_id": "option_id" },
    { "option_name": "Java", "votes": [], "_id": "option_id" },
    { "option_name": "C#", "votes": [], "_id": "option_id" }
  ]
}
```

### Vote on an Option

**Endpoint:**
```
POST /api/questions/:questionId/options/:optionId/vote
```

**Example Request:**
```bash
curl -X POST https://cactro-polling-backend.vercel.app/api/questions/:questionId/options/:optionId/vote \
  -H 'Content-Type: application/json' \
  -d '{ "user_id": "user_id" }'
```

**Example Response:**
```json
{
  "message": "Vote added"
}
```

### Get Poll Details

**Endpoint:**
```
GET /api/questions/:questionId
```

**Example Request:**
```bash
curl https://cactro-polling-backend.vercel.app/api/questions/:questionId
```

**Example Response:**
```json
{
  "_id": "poll_id",
  "question": "What is your favorite programming language?",
  "user_id": "user_id",
  "options": [
    { "option_name": "JavaScript", "votes": [], "_id": "option_id" },
    { "option_name": "Python", "votes": [], "_id": "option_id" },
    { "option_name": "Java", "votes": [{ "user_id": "user_id", "created_at": "timestamp" }], "_id": "option_id" },
    { "option_name": "C#", "votes": [], "_id": "option_id" }
  ]
}
```

### Get All Polls

**Endpoint:**
```
GET /api/questions
```

**Example Request:**
```bash
curl https://cactro-polling-backend.vercel.app/api/questions
```

**Example Response:**
```json
[
  {
    "_id": "poll_id",
    "question": "What is your favorite programming language?"
  },
  {
    "_id": "poll_id",
    "question": "What is your favorite framework?"
  }
]
```

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/my-feature`).
6. Create a Pull Request.

## Getting Started

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/mohammadkhizerkhan/cactro_polling_backend.git
    cd coctro_polling_backend
    ```
    ```bash
    git clone https://github.com/mohammadkhizerkhan/coctro_polling_frontend.git
    cd coctro_polling_frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. a. Set up backend environment variables:
    Create a `.env` file in the root directory with the following content:
    ```env
    MONGODB_USERNAME=khan
    MONGODB_PASSWORD=P4f51gqk0JP3bCdr
    MONGODB_CLUSTER_URL=cluster0.tz1bpqa.mongodb.net
    MONGODB_DB_NAME=polling_app
    PORT=3001
    ```
    b. Set up frontend environment variables:
    Create a `.env.local` file in the root directory with the following content:
    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
    ```

4. Start the development server:
    ```bash
    npm run start
    ```
    Start front end:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3001](http://localhost:3001) for backend, and [http://localhost:3000](http://localhost:3000) for front end