# Nexus Node ⚡

> **An event-driven, distributed multi-agent AI workspace designed for intelligent task orchestration and collaborative conversational workflows.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.x-black?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![LangChain](https://img.shields.io/badge/LangGraph-Agentic%20Orchestration-1C3C3C?style=flat&logo=langchain&logoColor=white)](https://www.langchain.com/langgraph)
[![Redis](https://img.shields.io/badge/Redis-Session%20Store-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Persistence-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

---

## 📌 Overview

**Nexus Node** is a scalable, microservices-based AI platform that routes user inquiries to dedicated, specialized AI agents using a dynamic graph routing engine. Rather than relying on a single monolithic language model, Nexus Node distributes domain-specific tasks (general conversation, code synthesis, visual generation, document analysis, presentation building, and web search) across isolated agent nodes.

The system is decoupled into an **API Gateway**, independent **Domain Microservices**, a **LangGraph Agent Engine**, and a reactive **Vite + React 19 Frontend**.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client [Client Layer]
        UI["React 19 + Vite Frontend"]
    end

    subgraph Gateway [API Gateway]
        GW["Express Gateway"]
        AuthMiddleware["protect Middleware"]
        HeaderEnricher["proxyWithHeader"]
    end

    subgraph DataLayer [Data & Storage Layer]
        Redis[("Redis Session Store")]
        MongoUsers[("MongoDB: Users")]
        MongoChats[("MongoDB: Chats & Messages")]
    end

    subgraph Services [Backend Microservices]
        AuthService["Auth Service"]
        ChatService["Chat Service"]
        AgentService["Agent Service"]
    end

    subgraph AgentGraph [LangGraph Multi-Agent Engine]
        StateDef["agentState Root Annotation"]
        Router{"Graph Router"}
        ChatAgent["Chat Agent"]
        CodingAgent["Coding Agent"]
        ImageAgent["Image Gen Agent"]
        PDFAgent["PDF Agent"]
        PPTAgent["PPT Agent"]
        SearchAgent["Search Agent"]
    end

    UI -->|REST with Cookies| GW
    GW -->|Session Check| Redis
    GW -->|/api/auth| AuthService
    GW -->|/api/chat| AuthMiddleware
    GW -->|/api/agent| AuthMiddleware

    AuthMiddleware --> HeaderEnricher
    HeaderEnricher -->|Forward Request| ChatService
    AuthMiddleware -->|Forward Request| AgentService

    AuthService -->|User Sync| MongoUsers
    ChatService -->|Persist History| MongoChats

    AgentService --> StateDef
    StateDef --> Router
    Router -->|chat| ChatAgent
    Router -->|coding| CodingAgent
    Router -->|imageGen| ImageAgent
    Router -->|pdf| PDFAgent
    Router -->|ppt| PPTAgent
    Router -->|search| SearchAgent
```

---

## 🧩 Current Implementation Status

Here is an exact, deep-dive summary of what is built and operating today versus what is being actively expanded:

### 1. Ingress & API Gateway (`/backend/gateway`)
- [x] **Reverse Proxy Integration**: Uses `express-http-proxy` to route requests transparently to respective microservices.
- [x] **Session Guard Middleware (`protect`)**: Verifies HTTP-only session cookies against Redis in real time before admitting requests to protected routes.
- [x] **Header Injection (`proxyWithHeader`)**: Extracts user credentials from Redis and automatically injects metadata (`x-user-id`) into downstream service requests.
- [x] **CORS & Cookie Parser**: Centralized cookie management and origin validation.

### 2. Auth Service (`/backend/services/auth`)
- [x] **Firebase Authentication Integration**: Validates Google OAuth ID tokens on the server using `firebase-admin`.
- [x] **User Sync & Persistence**: Automatically provisions and syncs user records in MongoDB upon successful token verification.
- [x] **Redis-Backed Session Management**: Issues UUIDv4 session identifiers stored in Redis with 7-day TTL and dispatches `httpOnly`, `sameSite: strict` cookies.
- [x] **Logout Invalidation**: Destroys session keys in Redis and clears browser cookies.

### 3. Chat Service (`/backend/services/chat`)
- [x] **Thread Management**: Endpoints to create, update (rename titles), and query user conversation lists.
- [x] **Message Persistence**: Schema for role-based (`user`/`assistant`) message logs mapped to `conversationId`.
- [x] **Chronological Retrieval**: Fetching message history sorted by creation timestamps.

### 4. Agent Service (`/backend/services/agent`)
- [x] **LangGraph Foundation**: Configured with `@langchain/langgraph` and `@langchain/core`.
- [x] **Agent State Management**: Implemented `agentState` root annotation (`prompt`, `aiResponse`, `agent`) in `graph/state.js`.
- [x] **StateGraph & Dynamic Routing**: Assembled `StateGraph(agentState)` with conditional edges routing prompts across all 6 specialized agents in `graph/graph.js`.
- [x] **Agent Scaffolding**: Modular directory structure housing individual agent handlers:
  - 💬 **Chat Agent**: Conversational exchanges and dialogue management.
  - 💻 **Coding Agent**: Code writing, reviewing, and explanation workflows.
  - 🎨 **Image Gen Agent**: Prompt formatting and image generation pipelines.
  - 📄 **PDF Agent**: Document parsing, context retrieval, and question-answering.
  - 📊 **PPT Agent**: Presentation outlining and slide data structuring.
  - 🔍 **Search Agent**: Web search routing and retrieval-augmented context.

### 5. Frontend Client (`/frontend`)
- [x] **Stack**: React 19, Vite, Tailwind CSS v4.
- [x] **Authentication Flow**: Firebase Google popup sign-in integrated with backend `/api/auth/login`.
- [x] **State Management**: Redux Toolkit store (`userSlice`) tracking authenticated user state.
- [x] **Glassmorphic Dark UI**: Clean modal overlay with responsive design.
- [ ] **Chat Interface & Agent Viewports**: *In progress* (sidebar threads, streaming responses, agent selector).

---

## 📂 Repository Structure

```text
nexus_node/
├── backend/
│   ├── docker-compose.yml         # Container configuration (Redis)
│   ├── gateway/                   # Ingress reverse proxy & auth middleware
│   │   ├── controllers/
│   │   ├── middleware/            # Redis-based session protector
│   │   ├── utils/                 # Header injection proxy utilities
│   │   └── index.js
│   ├── services/
│   │   ├── auth/                  # Authentication & Firebase Admin service
│   │   │   ├── config/            # Database & Firebase initialization
│   │   │   ├── controllers/
│   │   │   ├── model/             # User Mongoose model
│   │   │   └── routes/
│   │   ├── chat/                  # Conversation & message storage service
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── models/            # Conversation & Message schemas
│   │   │   └── routes/
│   │   └── agent/                 # LangGraph multi-agent orchestration
│   │       ├── agents/            # Individual specialized agents (chat, code, image, etc.)
│   │       ├── config/
│   │       ├── graph/             # Dynamic router & LangGraph execution
│   │       └── index.js
│   └── shared/
│       └── redis/                 # Shared ioredis client singleton
├── frontend/                      # Vite + React 19 Client
│   ├── src/
│   │   ├── features/              # Feature modules & user status
│   │   ├── pages/                 # Application views (Home, Chat, etc.)
│   │   ├── redux/                 # Redux Toolkit slices and store configuration
│   │   └── utils/                 # Axios client instance & Firebase SDK init
│   └── package.json
└── README.md
```

---

## 🛠️ Tech Stack & Tools

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **API Gateway** | Express 5, `express-http-proxy` | Ingress traffic routing, centralized auth guard & header mutation |
| **Agent Framework** | `@langchain/langgraph`, `@langchain/core` | State-driven multi-agent graph orchestration |
| **Cache & Sessions** | Redis, `ioredis` | Fast key-value session storage with automatic TTL |
| **Database** | MongoDB, Mongoose | Document database for users, conversation threads, and message logs |
| **Auth** | Firebase Auth (Client & Admin SDK) | Google identity provider verification and account synchronization |
| **Frontend** | React 19, Vite, Tailwind CSS v4 | High-performance reactive UI with modern styles |
| **State Management**| Redux Toolkit (`@reduxjs/toolkit`) | Predictable global client state container |
| **Containers** | Docker Compose | Local Redis instance management |

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/) (for Redis)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)

---

### 2. Local Setup & Execution

1. **Start the Infrastructure (Redis)**:
   ```bash
   cd backend
   docker compose up -d
   ```

2. **Start the Backend Microservices**:
   Run each service in its respective directory:
   ```bash
   # Ingress API Gateway (Port 8000)
   cd backend/gateway && npm install && npm run dev

   # Authentication Service (Port 8001)
   cd backend/services/auth && npm install && npm run dev

   # Chat & Message Service (Port 8002)
   cd backend/services/chat && npm install && npm run dev

   # LangGraph Agent Service (Port 8003)
   cd backend/services/agent && npm install && npm run dev
   ```

3. **Start the Frontend Client**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Open `http://localhost:5173` in your browser to access the application workspace.

---

## 🗺️ Roadmap & Future Architecture

- [x] **LangGraph StateGraph & Routing**: Conditional edge routing architecture in `graph/graph.js` and state schema in `graph/state.js`.
- [ ] **Agent Execution & Model Providers**: Wire LLM invocation into individual agent nodes and implement classification logic in `router.js`.
- [ ] **Streaming Responses (SSE / WebSockets)**: Enable token-by-token streaming from individual agent models back to the client interface.
- [ ] **Multi-Agent Memory**: Implement LangGraph checkpointers backed by Redis/MongoDB for cross-turn contextual memory.
- [ ] **Document & Vector Ingestion**: RAG pipeline for the `pdf.agent.js` and `search.agent.js` using vector embeddings.
- [ ] **Rich Frontend Workspace**: Multi-view layout displaying agent thought processes, tool calls, and rendered output (markdown, syntax-highlighted code, image canvas).

---

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
