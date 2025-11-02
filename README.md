# # Andhra Wander Hub

A comprehensive travel platform for exploring the beautiful destinations of Andhra Pradesh, India. Built with React, TypeScript, Tailwind CSS, and integrated with MongoDB Atlas for data management.

## 🌟 Features

### 🗺️ Enhanced Navigation & Search
- **Smart Search Bar**: Search destinations by name, location, or category with auto-suggestions
- **Advanced Filters**: Filter by budget range, duration, category, and ratings
- **Real-time Results**: Instant search results with debounced queries

### 💰 Budget Planning
- **Budget Range Filters**: Find destinations and hotels within your budget
- **Price Comparison**: Compare accommodation costs across different locations
- **Budget Validation**: Smart validation for travel plans
- **Cost Breakdown**: Detailed budget analysis for trips

### ⏰ Time Period Planning
- **Duration Filters**: Filter destinations by recommended stay duration
- **Trip Planning**: Plan multi-day itineraries with duration management
- **Flexible Scheduling**: Plan trips from 1 day to 7+ days

### 📖 Travel History
- **Trip Tracking**: Record and track all your travels
- **Status Management**: Mark trips as planned, ongoing, or completed
- **Experience Sharing**: Add reviews and ratings for completed trips
- **Photo Memories**: Upload and store travel photos
- **Budget Tracking**: Keep track of actual vs planned expenses

### ⭐ Rating & Review System
- **5-Star Rating System**: Rate destinations and hotels
- **Detailed Reviews**: Write comprehensive reviews with photos
- **Helpful Votes**: Community-driven review validation
- **Verified Reviews**: Verified traveler reviews for authenticity
- **Average Ratings**: Aggregated ratings with review counts

### 🏨 Enhanced Hotel Features
- **Comprehensive Listings**: Detailed hotel information with amenities
- **Price Range Filtering**: Filter hotels by price range
- **Rating-based Search**: Find top-rated accommodations
- **Contact Information**: Direct access to hotel contact details
- **Amenity Icons**: Visual representation of hotel amenities
- **Detailed Descriptions**: Rich hotel descriptions and features

### 🎯 Destination Discovery
- **Category-based Browsing**: Hill stations, beaches, religious sites, adventure spots
- **Feature Highlights**: Key attractions and unique features
- **Best Time to Visit**: Seasonal recommendations
- **Comprehensive Details**: Rich descriptions with practical information

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI Components
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth
- **Database**: MongoDB Atlas (with Mongoose ODM)
- **State Management**: React Query (TanStack Query)
- **UI Components**: Shadcn/ui, Lucide Icons
- **Forms**: React Hook Form with Zod validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account
- Supabase account (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/andhra-wander-hub.git
cd andhra-wander-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Configuration
VITE_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Configuration (for backend)
VITE_API_BASE_URL=http://localhost:3001/api
```

### 4. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account and cluster

2. **Database Configuration**:
   - Create a database named `andhra_wander_hub`
   - Create collections: `destinations`, `hotels`, `travel_history`, `reviews`, `travel_plans`

3. **Set Up Network Access**:
   - Add your IP address to the IP whitelist
   - Or use `0.0.0.0/0` for development (not recommended for production)

4. **Create Database User**:
   - Create a user with read/write permissions
   - Use the credentials in your connection string

### 5. Supabase Setup

1. **Create Supabase Project**:
   - Visit [Supabase](https://supabase.com)
   - Create a new project

2. **Get Project Credentials**:
   - Copy your project URL and anon key
   - Add them to your `.env.local` file

3. **Authentication Setup**:
   - Configure authentication providers if needed
   - Set up email authentication

### 6. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Backend Setup (Optional)

For full MongoDB Atlas integration, you'll need a backend API. Here's a basic setup using Node.js and Express:

### Backend Structure
```
backend/
├── src/
│   ├── models/
│   │   ├── Destination.js
│   │   ├── Hotel.js
│   │   ├── TravelHistory.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── destinations.js
│   │   ├── hotels.js
│   │   ├── travelHistory.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── auth.js
│   └── app.js
├── package.json
└── .env
```

### Quick Backend Setup
```bash
# Create backend directory
mkdir backend && cd backend

# Initialize npm project
npm init -y

# Install dependencies
npm install express mongoose cors dotenv

# Install dev dependencies
npm install -D nodemon

# Create basic structure
mkdir src src/models src/routes src/middleware
```

## 📊 Database Schema

### Destinations Collection
```javascript
{
  name: String,
  location: String,
  description: String,
  category: String, // 'Hill Station', 'Beach', 'Religious', etc.
  budgetRange: { min: Number, max: Number },
  recommendedDuration: { min: Number, max: Number },
  rating: { average: Number, count: Number },
  features: [String],
  bestTimeToVisit: [String],
  coordinates: { latitude: Number, longitude: Number }
}
```

### Hotels Collection
```javascript
{
  name: String,
  location: String,
  destinationId: ObjectId,
  description: String,
  priceRange: { min: Number, max: Number },
  rating: { average: Number, count: Number },
  amenities: [String],
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  address: String
}
```

### Travel History Collection
```javascript
{
  userId: String, // Supabase user ID
  destinationId: ObjectId,
  hotelId: ObjectId,
  visitDate: Date,
  duration: Number,
  totalBudget: Number,
  rating: Number,
  review: String,
  status: String, // 'planned', 'ongoing', 'completed'
  photos: [String]
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for trust and reliability
- **Secondary**: Green for success and nature
- **Accent**: Yellow for ratings and highlights
- **Muted**: Gray tones for secondary content

### Typography
- **Headings**: Inter font family, various weights
- **Body**: System fonts for readability
- **Monospace**: For code and data display

### Components
- All components built with Radix UI primitives
- Consistent spacing using Tailwind CSS
- Responsive design for all screen sizes
- Dark mode support (optional)

## 🔧 Development Guidelines

### Code Structure
```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components (shadcn/ui)
│   ├── Navbar.tsx    # Navigation component
│   └── Footer.tsx    # Footer component
├── pages/            # Page components
├── lib/              # Utility functions and configurations
│   ├── api.ts        # API utility functions
│   ├── models.ts     # MongoDB schemas and types
│   ├── staticData.ts # Static data for development
│   └── utils.ts      # General utilities
├── hooks/            # Custom React hooks
└── integrations/     # Third-party integrations
```

### Best Practices
- Use TypeScript for type safety
- Implement proper error handling
- Follow React best practices (hooks, components)
- Use semantic HTML for accessibility
- Implement responsive design patterns
- Add loading states for better UX

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables on the platform

### Backend (Railway/Heroku)
1. Create a `Procfile` for the backend
2. Configure environment variables
3. Deploy using Git or Docker

### MongoDB Atlas
- Already cloud-hosted, no additional deployment needed
- Ensure proper network access configuration
- Set up monitoring and alerts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Destinations Data**: Information sourced from AP Tourism and travel guides
- **UI Components**: Built with Shadcn/ui and Radix UI
- **Icons**: Lucide React icon library
- **Maps**: OpenStreetMap for location data
- **Images**: Placeholder images for demonstration

## 📞 Support

For support or questions:
- Create an issue on GitHub
- Email: support@andhrawanderhub.com
- Documentation: [Wiki](https://github.com/your-username/andhra-wander-hub/wiki)

---

**Happy Traveling! 🎒✈️**

Explore the beauty of Andhra Pradesh with confidence and create memories that last a lifetime.

## Project info

**URL**: https://lovable.dev/projects/c2cc65b9-6292-4900-978d-466a609b47b6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c2cc65b9-6292-4900-978d-466a609b47b6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

