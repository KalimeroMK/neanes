# Docker Local Development Setup

This project has been containerized to allow for easy local development without needing to install Node.js or dependencies directly on your machine.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

## Getting Started

1.  **Build and Start the Container:**

    Open your terminal in the project root and run:

    ```bash
    docker-compose up --build
    ```

2.  **Access the Application:**

    Once the container is running and you see the Vite server output (e.g., `Local: http://localhost:5173/`), open your browser and navigate to:

    [http://localhost:5173](http://localhost:5173)

3.  **Stopping the Container:**

    Press `Ctrl+C` in the terminal or run:

    ```bash
    docker-compose down
    ```

## Notes

-   **Web Mode**: This Docker setup runs the application in "Web Mode" (`npm run web:dev`). Electron-specific features (like native menus or file system access via Electron APIs) will not be available in the browser.
-   **Hot Reloading**: The source code is mounted as a volume, so changes you make to files in `src/` will automatically reload the application in the browser.
-   **Node Modules**: The `node_modules` folder is isolated inside the container to prevent conflicts with your local system.
