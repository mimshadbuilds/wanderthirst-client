# Wanderthirst

Wanderthirst is a comprehensive travel booking platform that allows users to discover, book, and manage travel packages. The platform provides a seamless experience for travelers to explore destinations, check availability, and complete their travel bookings all in one place.

## Technologies Used

### Frontend
- **Next.js 16.4.3** - React framework with App Router and server-side rendering
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library based on Radix UI and Tailwind
- **Lucide React** - Icon library for React
- **Better Auth** - Authentication and session management
- **Zustand** - State management

### Backend
- **MongoDB** - NoSQL database for storing destinations, bookings, and user data
- **JWT Authentication** - Secure token-based authentication
- **CORS** - Cross-origin resource sharing
- **Express.js** - Web framework (for API endpoints)

### Development
- **Turbopack** - Next.js built-in bundler
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Vercel** - Deployment platform

## Key Features

### 1. **Travel Destination Discovery**
   - Browse through curated travel packages
   - Filter destinations by category, price, and duration
   - View detailed destination information with images and descriptions
   - Compare different travel options side by side

### 2. **Seamless Booking Experience**
   - Intuitive booking flow with real-time availability
   - Secure payment processing
   - Instant confirmation and digital tickets
   - Manage bookings from your account dashboard

### 3. **Personalized User Accounts**
   - User registration and authentication
   - Booking history tracking
   - Personalized recommendations
   - Account settings and profile management

### 4. **Advanced Search & Filtering**
   - Price range filters
   - Destination category selection
   - Date range filtering
   - Keyword search functionality

### 5. **Administrative Controls**
   - Admin-only access to destination management
   - Role-based permissions (admin/user)
   - Comprehensive booking management
   - System analytics and reporting

## Project Structure

```
/src
  /app                    # Next.js App Router routes
    /add-destination      # Add new travel package (admin only)
    /destinations         # Browse all destinations
    /destinations/[id]    # Individual destination details
    /my-bookings          # User booking dashboard
    /login               # Authentication pages
    /signup              # User registration
    /admin               # Admin panel
    /api                 # API routes
  /components            # React components
    /ui                  # UI components
    /booking             # Booking-related components
    /destination         # Destination-related components
  /lib                  # Shared libraries and utilities
    /auth.ts            # Authentication configuration
    /destinations-api.ts # API client for destinations
    /server-token.ts     # Server token management
  /assets              # Project assets (images, etc.)
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- Environment variables (.env file)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wanderthirst
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
wanderthirstDB

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-change-this-in-production

# Server Configuration
PORT=5000

# CORS Origins
CORS_ORIGIN=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

### Running the Application

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

### Build and Deploy

```bash
npm run build
npm start
```

## Development

### Code Quality
- Run linter: `npm run lint`
- Type checking: `npx tsc --noEmit`

### API Endpoints

**Backend API Routes (http://localhost:5000):**
- `GET /destinations` - Get all destinations
- `GET /featured-destinations` - Get featured destinations
- `GET /my-bookings/:email` - Get user bookings
- `POST /add-destination` - Add new destination (admin only)

**Frontend Routes:**
- `/` - Home page
- `/destinations` - Browse destinations
- `/destinations/[id]` - Destination details
- `/my-bookings` - User bookings
- `/add-destination` - Add destination (admin only)
- `/login` - Login page
- `/signup` - Registration page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Create a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- Built with Next.js and React
- Powered by MongoDB
- Styled with Tailwind CSS
- Components from shadcn/ui
- Icons from Lucide React
- Authentication by Better Auth

## Support

For support, please contact the development team or refer to the documentation.

---

**Wanderthirst** - Your complete travel companion for discovering, booking, and managing travel experiences.

**Version:** 0.1.0
**Last Updated:** October 30, 2026