# Node.js REST API CI/CD Demo

This project is a lightweight Express REST API that exposes a health endpoint and ships with Docker-based deployment automation through GitHub Actions.

## API Endpoint

- `GET /health` returns the API status, service name, and timestamp.

## Local Development

```bash
npm install
npm run dev
```

The API runs on port `3000` by default. You can override it with the `PORT` environment variable.

## Testing and Build

```bash
npm run lint
npm test
npm run build
```

## Docker

Build the image:

```bash
docker build -t node-rest-api-cicd .
```

Run the container:

```bash
docker run -d -p 3000:3000 --name node-rest-api-cicd node-rest-api-cicd
```

## CI/CD Pipeline

The GitHub Actions workflow lives in `.github/workflows/ci-cd.yml` and performs the following steps in a single pipeline file:

1. Install dependencies with `npm ci`
2. Lint the TypeScript source
3. Run tests with Vitest
4. Build the production bundle
5. Build the Docker image
6. Deploy to Render using a deploy hook

## Render Deployment Setup

1. Create a new Render Web Service and choose `Docker` as the runtime.
2. Point Render at this repository.
3. Copy the service deploy hook URL from Render.
4. Add the deploy hook in GitHub as the `RENDER_DEPLOY_HOOK_URL` repository secret.

Once the secret is configured, pushes to `main` or `master` will automatically trigger deployment after the CI steps pass.
