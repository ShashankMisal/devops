# DevOps Backend

Minimal Express backend for the DevOps learning project.

## Local Run

```bash
npm install
npm start
```

The server listens on `PORT` (default `3000`).

## Docker

```bash
docker build -t devops-backend .
docker run -p 3000:3000 devops-backend
```

## Health Probe

Kubernetes readiness/liveness path:

```
/health
```

## Frontend Base URL in Kubernetes

The frontend should call the backend using the service DNS name, for example:

```
http://backend-service/api/tasks
```
