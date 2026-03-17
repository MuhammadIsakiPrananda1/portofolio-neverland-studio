# API Reference

All endpoints are prefixed with `/api/v1` and return JSON.  
Authentication uses **Laravel Sanctum** (cookie-based for SPA).

---

## Authentication

### Login
```
POST /api/v1/auth/login
```
**Body**
```json
{ "email": "admin@example.com", "password": "secret" }
```
**Response** `200 OK`
```json
{ "user": { ... }, "token": "..." }
```

### Logout
```
POST /api/v1/auth/logout
```
Requires `Authorization: Bearer <token>`.

### Current User
```
GET /api/v1/auth/me
```

---

## Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/projects` | List all projects |
| `POST` | `/api/v1/projects` | Create a project (auth required) |
| `GET` | `/api/v1/projects/{id}` | Get a single project |
| `PUT` | `/api/v1/projects/{id}` | Update a project (auth required) |
| `DELETE` | `/api/v1/projects/{id}` | Delete a project (auth required) |

---

## Messages / Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/contact` | Submit a contact form message |
| `GET` | `/api/v1/messages` | List messages (auth required) |
| `PATCH` | `/api/v1/messages/{id}/read` | Mark as read (auth required) |

---

## Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/analytics` | Aggregate stats for dashboard |
| `GET` | `/api/v1/analytics/live` | Live visitor count (Pusher) |

---

## Clients

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/clients` | List clients (auth required) |
| `POST` | `/api/v1/clients` | Create client (auth required) |
| `PUT` | `/api/v1/clients/{id}` | Update client (auth required) |
| `DELETE` | `/api/v1/clients/{id}` | Delete client (auth required) |

---

## Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/services` | List service offerings |
| `POST` | `/api/v1/services` | Create service (auth required) |
| `PUT` | `/api/v1/services/{id}` | Update service (auth required) |
| `DELETE` | `/api/v1/services/{id}` | Delete service (auth required) |

---

## Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/settings` | Get app settings (auth required) |
| `PUT` | `/api/v1/settings` | Update settings (auth required) |

---

## Real-Time Events (Laravel Echo / Pusher)

| Channel | Event | Payload |
|---------|-------|---------|
| `dashboard` | `DashboardStatsUpdated` | Updated stats object |
| `dashboard` | `AnalyticsUpdated` | Updated analytics |
| `dashboard` | `LiveVisitorUpdate` | `{ count: number }` |
| `messages` | `NewMessageReceived` | Message object |
| `messages.{id}` | `MessageRead` | `{ id: number }` |
| `projects` | `ProjectCreated` | Project object |
| `projects.{id}` | `ProjectUpdated` | Updated project |
| `projects.{id}` | `ProjectDeleted` | `{ id: number }` |

---

## Error Responses

All errors follow this shape:

```json
{
  "message": "Human-readable error description",
  "errors": {
    "field": ["Validation message"]
  }
}
```

| HTTP Status | Meaning |
|-------------|---------|
| `400` | Bad request / validation failure |
| `401` | Unauthenticated |
| `403` | Forbidden |
| `404` | Resource not found |
| `422` | Unprocessable entity (form validation) |
| `500` | Internal server error |
