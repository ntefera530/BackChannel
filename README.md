# BackChannel

A real-time, ephemeral messaging app — direct messages and group chats with
auto-expiring messages, built with a React frontend and a Node/Express +
Socket.IO backend.

**Live demo:** [back-channel-steel.vercel.app](https://back-channel-steel.vercel.app/)

## Try it out

Log in with any of these accounts, or create your own — friend another test
account and start chatting between two tabs/devices to see messages arrive
in real time.

| Username | Password |
|---|---|
| TestUser1 | 123456 |
| TestUser2 | 123456 |
| TestUser3 | 123456 |
| TestUser4 | 123456 |
| TestUser5 | 123456 |

> **Note:** this is hosted on free-tier infrastructure. If the site feels
> slow or unresponsive on the very first load, the backend has spun down
> from inactivity and is waking back up — give it 30-60 seconds and it'll
> be fine from then on.

## Features

- **Direct messages and group chats**, with real-time delivery over WebSockets (Socket.IO)
- **Self-destructing messages** - chats and messages can be set to auto-expire, with a background job that permanently deletes them on schedule
- **Friend system** - add/remove friends by username before starting a chat
- **Profile pictures and chat pictures**, uploaded directly to object storage via presigned URLs
- **Per-user configurable message retention**, so you control how long your own messages stick around
- Session auth via HTTP-only JWT cookies

## Tech stack

**Frontend:** React 19, React Router, Tailwind CSS + DaisyUI, Socket.IO client, Axios, Vite

**Backend:** Node.js, Express 5, Socket.IO, PostgreSQL (`pg`), BullMQ (Redis-backed job queue for scheduled message deletion), JWT auth, AWS SDK v3 (S3-compatible client for object storage)

**Infrastructure:**
| Piece | Provider |
|---|---|
| Frontend hosting | Vercel |
| Backend hosting | Render |
| Database | Neon (Postgres) |
| Job queue | Upstash (Redis) |
| Object storage | Cloudflare R2 |

## Architecture notes

The deletion worker (the background job that permanently removes expired
messages) runs embedded in the same process as the API server rather than as
a separate service, to fit within free-tier hosting limits. The frontend
proxies its API requests through Vercel to the backend so cookie-based auth
works reliably across the two different domains, including on mobile
browsers; the WebSocket connection authenticates with a short-lived token
passed at connect time instead, since that connection has to stay direct to
the backend.

## Running it locally

```bash
# backend
cd backend
npm install
cp .env.example .env   # fill in your own Postgres/Redis/R2 credentials
npm run dev

# frontend
cd frontend
npm install
cp .env.example .env   # point VITE_API_URL at your local backend
npm run dev
```

You'll need your own Postgres database (schema in `backend/BackChannelInit.hosting.sql`),
a Redis instance, and an S3-compatible bucket (R2, S3, etc.) to run the full
feature set locally.
