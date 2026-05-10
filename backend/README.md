# 🌍 Traveloop Backend API

> A scalable REST API for the Traveloop travel planning and itinerary management platform.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Dev Server | Nodemon |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
git clone https://github.com/VaibhavSarsawat44/hackathon-project.git
cd hackathon-project
git checkout backend-api
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/traveloop
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

> **MongoDB Atlas:** Replace `MONGO_URI` with your Atlas URI.

### 3. Start MongoDB (local)

```bash
mkdir -p ~/traveloop-db
mongod --dbpath ~/traveloop-db &
```

### 4. Run the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server starts at: `http://localhost:5001`

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js       # Auth: signup, login, profile
│   ├── tripController.js       # Trip CRUD
│   ├── stopController.js       # Stop CRUD + reorder
│   ├── activityController.js   # Activity CRUD (separate collection)
│   ├── packingController.js    # Packing checklist
│   ├── notesController.js      # Notes/Journal
│   └── budgetController.js     # Budget breakdown
├── middleware/
│   ├── auth.js                 # JWT protect middleware
│   └── authMiddleware.js       # Alias (spec naming)
├── models/
│   ├── User.js                 # User + savedDestinations
│   ├── Trip.js                 # Trip + budget fields
│   ├── Stop.js                 # Stop (no embedded activities)
│   ├── Activity.js             # Separate Activity collection
│   ├── PackingItem.js          # Packing checklist item
│   └── Note.js                 # Journal/Notes
├── routes/
│   ├── authRoutes.js
│   ├── tripRoutes.js
│   ├── stopRoutes.js
│   ├── activityRoutes.js
│   ├── packingRoutes.js
│   ├── notesRoutes.js
│   └── publicRoutes.js         # Public itinerary (no auth)
├── utils/
│   ├── generateToken.js        # JWT signing
│   └── budgetCalculator.js     # Reusable budget functions
├── tests/
│   └── traveloop.postman_collection.json
├── server.js
├── package.json
├── .env
└── .env.example
```

---

## 🗺 API Endpoints

**Base URL:** `http://localhost:5001/api`

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | Public | Register user |
| POST | `/auth/login` | Public | Login, get token |
| GET | `/auth/me` | 🔒 | Get profile |
| PUT | `/auth/me` | 🔒 | Update profile |
| PUT | `/auth/change-password` | 🔒 | Change password |
| POST | `/auth/me/destinations` | 🔒 | Save a destination |
| DELETE | `/auth/me/destinations/:index` | 🔒 | Remove destination |

### Trips
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/trips` | 🔒 | All user trips |
| POST | `/trips` | 🔒 | Create trip |
| GET | `/trips/:id` | 🔒 | Get trip + stops |
| PUT | `/trips/:id` | 🔒 | Update trip |
| DELETE | `/trips/:id` | 🔒 | Delete (cascade) |
| GET | `/trips/:id/budget` | 🔒 | Budget breakdown |

### Stops
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/stops` | 🔒 | Add stop (`tripId` in body) |
| GET | `/stops/trip/:tripId` | 🔒 | Get all stops for trip |
| PUT | `/stops/:id` | 🔒 | Update stop |
| DELETE | `/stops/:id` | 🔒 | Delete stop + activities |
| PUT | `/stops/reorder` | 🔒 | Reorder stops |

### Activities
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/activities` | 🔒 | Add activity (`stopId` in body) |
| GET | `/activities/:stopId` | 🔒 | Get activities for stop |
| PUT | `/activities/:id` | 🔒 | Update activity |
| DELETE | `/activities/:id` | 🔒 | Delete activity |

### Packing
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/packing` | 🔒 | Add item (`tripId` in body) |
| GET | `/packing/:tripId` | 🔒 | Get packing list + stats |
| PUT | `/packing/:id` | 🔒 | Update item |
| PATCH | `/packing/:id/toggle` | 🔒 | Toggle packed/unpacked |
| DELETE | `/packing/:id` | 🔒 | Delete item |

### Notes / Journal
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/notes` | 🔒 | Create note (`tripId` required, `stopId` optional) |
| GET | `/notes/:tripId` | 🔒 | Get all notes (add `?stopId=` to filter) |
| PUT | `/notes/:id` | 🔒 | Update note |
| DELETE | `/notes/:id` | 🔒 | Delete note |

### Public
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/public/:tripId` | Public | Public itinerary (trip + stops + activities) |

---

## 🔒 Authentication

Include JWT token in every protected request:

```
Authorization: Bearer <your_token_here>
```

---

## 📦 Standard Response Format

```json
{
  "success": true,
  "message": "Trip created successfully",
  "data": { ... }
}
```

Error response:
```json
{
  "success": false,
  "message": "Trip not found or access denied"
}
```

---

## 🧪 Testing with Postman

1. Open Postman
2. Click **Import** → select `tests/traveloop.postman_collection.json`
3. Set `baseUrl` variable to `http://localhost:5001/api`
4. Run **Signup** → token auto-saves to collection variable
5. Run all other requests — they use `{{token}}` automatically

---

## 🔗 Database Relationships

```
User ──→ many Trips
Trip ──→ many Stops
Stop ──→ many Activities
Trip ──→ many PackingItems
Trip ──→ many Notes (Notes also optionally linked to a Stop)
```

---

## 🛡 Security Features

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- **JWT** tokens expire in 7 days
- All mutations verify **user ownership** before acting
- Cascade deletes prevent orphaned data
- Global error handler normalizes all error responses

---

## 📞 Frontend Integration Notes

- Set `Authorization: Bearer <token>` on all private requests
- Use `/api/public/:tripId` for shared/embedded itineraries (no token needed)
- Budget is calculated server-side — just call `GET /api/trips/:id/budget`
- Packing stats (total/packed/unpacked %) returned automatically with packing list
