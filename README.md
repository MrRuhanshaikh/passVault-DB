# PassVault

PassVault is a secure and fully responsive password management application built with React, Express, and MongoDB. This version allows users to store site names, usernames, and passwords, with data persisted in a MongoDB database. It includes form validation for site URLs, usernames, and strong passwords, and provides real-time feedback using React Toastify. This version is designed to run locally and requires MongoDB on your personal computer.

## Features

- **Store Credentials**: Save site names, usernames, and passwords in MongoDB.
- **Form Validation**: Validates site URLs, usernames, and strong passwords.
- **Toast Notifications**: Real-time feedback using React Toastify.
- **Fully Responsive**: Optimized for all devices, from desktops to mobile phones.

## Technologies Used

- **React**: For building the front-end user interface.
- **Tailwind CSS**: For styling and responsiveness.
- **Express**: For building the server-side API.
- **MongoDB**: For database storage.
- **React Toastify**: For toast notifications.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (Node Package Manager)
- MongoDB (running locally on your personal computer)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/MrRuhanshaikh/passvault-db.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd passvault-db
    ```

3. **Backend Setup**:

    - Navigate to the `backend` folder:

        ```bash
        cd backend
        ```

    - **Update MongoDB Connection**:

        Open `server.js` and update the MongoDB connection string to match your local MongoDB setup.

    - **Install server-side dependencies**:

        ```bash
        npm install
        ```

    - **Start the Express server**:

        ```bash
        npm start
        ```

4. **Frontend Setup**:

    - Navigate to the `client` folder:

        ```bash
        cd ../client
        ```

    - **Install client-side dependencies**:

        ```bash
        npm install
        ```

    - **Start the React development server**:

        ```bash
        npm start
        ```

5. **Open your browser at**:

    ```
    http://localhost:3000
    ```

## Usage

- **Enter Site Details**: Input site name, username, and password.
- **Form Validation**: The app validates the site URL, username, and password strength.
- **Save Credentials**: Data is saved to MongoDB and persists across sessions.
- **Toast Notifications**: Real-time feedback on form submissions.

## Code Structure

- **`client/src/components`**: Contains React components such as `Form`, `Toast`, and `CredentialList`.
- **`client/src/App.js`**: Main React component managing application logic.
- **`backend/routes`**: Contains API routes for managing credentials.
- **`backend/models`**: Defines MongoDB models for credentials.
- **`backend/server.js`**: Server entry point and MongoDB connection configuration.

## Contributing

1. Fork the repository.
2. Create a branch (`git checkout -b feature-branch-name`).
3. Commit changes (`git commit -m 'Add some feature'`).
4. Push the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.


