# Finance Management System - Frontend

A modern, responsive finance management application built with React, Vite, and Tailwind CSS.

## Features

### 🔐 Authentication
- User Registration with validation
- User Login with JWT token management
- Automatic token refresh and logout on expiration

### 📊 Dashboard
- Financial summary cards (Income, Expense, Balance)
- Interactive charts (Line, Pie, Bar charts)
- Monthly transaction trends
- Category-wise expense breakdown

### 💰 Transactions
- Add, edit, and delete transactions
- Filter by type, category, date range
- Search functionality
- Detailed transaction table view

### 📁 Categories
- Manage income and expense categories
- CRUD operations with modal forms
- Category-wise transaction counts
- Visual separation of income/expense categories

### 📈 Reports
- Monthly financial reports
- Category breakdown with percentages
- Daily income vs expense trends
- Export reports to CSV
- Interactive charts and visualizations

### 👤 Profile & Settings
- Update user profile information
- Change password
- Notification preferences
- Display settings (currency, date format)
- Logout functionality

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Finance_management
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file from `.env.example`
```bash
cp .env.example .env
```

4. Update the `.env` file with your API base URL
```
VITE_API_BASE_URL=http://localhost:8000/api
```

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Finance_management/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React context providers
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Categories.jsx
│   │   ├── Reports.jsx
│   │   └── Profile.jsx
│   ├── services/        # API service functions
│   │   ├── authService.js
│   │   ├── dashboardService.js
│   │   ├── categoryService.js
│   │   ├── transactionService.js
│   │   └── reportService.js
│   ├── utils/           # Utility functions
│   │   └── axios.js     # Axios configuration with interceptors
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## API Integration

The application is set up to integrate with a REST API. The Axios instance is configured with:

- Base URL from environment variables
- Request interceptor to attach JWT token
- Response interceptor to handle authentication errors

### API Endpoints Expected

**Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

**Dashboard:**
- `GET /api/dashboard/summary` - Financial summary
- `GET /api/dashboard/monthly?month=X&year=Y` - Monthly data

**Categories:**
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

**Transactions:**
- `GET /api/transactions` - Get all transactions (with filters)
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

**Reports:**
- `GET /api/reports/export` - Export report to CSV

## Features in Detail

### Form Validation
All forms include comprehensive validation:
- Email format validation
- Password strength requirements
- Required field checks
- Custom validation rules

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly UI elements
- Responsive tables and charts

### Error Handling
- Global error handling via Axios interceptors
- User-friendly error messages
- Automatic redirect on authentication errors

### State Management
- Context API for global state
- Local state for component-specific data
- Persistent authentication via localStorage

## Mock Data

The application includes mock data for demonstration purposes when the backend is not available. This allows you to:
- Test the UI without a backend
- See how data is displayed
- Understand the expected data structure

To use with a real backend, simply update the API base URL in the `.env` file.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue in the repository.

