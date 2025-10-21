# Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- React & React DOM
- React Router for navigation
- Axios for API calls
- Recharts for beautiful charts
- Tailwind CSS for styling
- React Hook Form for form validation
- And more!

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Then edit the `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Note:** Change the URL to match your backend API URL.

### Step 3: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 4: Access the Application

Open your browser and navigate to:
- **Login Page:** `http://localhost:3000/login`
- **Register Page:** `http://localhost:3000/register`

## 🎯 Demo Mode (Without Backend)

The application includes mock data, so you can test it even without a backend API:

1. Go to the login page
2. Enter any email and password
3. The app will show mock data for all features

## 🔌 Connecting to Backend

When your backend API is ready:

1. Update the `.env` file with the correct API URL
2. Make sure your backend returns data in the expected format
3. The frontend will automatically use the real API

### Expected API Response Formats:

**Login Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Dashboard Summary:**
```json
{
  "totalIncome": 55000,
  "totalExpense": 33000,
  "balance": 22000,
  "incomePercentage": 12.5,
  "expensePercentage": 8.3
}
```

**Categories:**
```json
[
  {
    "id": 1,
    "name": "Food & Dining",
    "type": "expense",
    "count": 25
  }
]
```

**Transactions:**
```json
[
  {
    "id": 1,
    "date": "2025-10-15",
    "category": "Food & Dining",
    "categoryId": 1,
    "type": "expense",
    "amount": 1500,
    "note": "Restaurant dinner"
  }
]
```

## 🎨 UI Features

### Pages Included:

1. **Authentication**
   - ✅ Login with validation
   - ✅ Register with password confirmation

2. **Dashboard**
   - ✅ Summary cards (Income, Expense, Balance)
   - ✅ Line chart (Income vs Expense trend)
   - ✅ Pie chart (Expense by category)

3. **Transactions**
   - ✅ Add/Edit/Delete transactions
   - ✅ Filter by type, category, date
   - ✅ Search functionality
   - ✅ Beautiful table view

4. **Categories**
   - ✅ Manage income/expense categories
   - ✅ Visual separation by type
   - ✅ CRUD operations

5. **Reports**
   - ✅ Monthly analysis
   - ✅ Category breakdown
   - ✅ Multiple chart types
   - ✅ Export to CSV option

6. **Profile/Settings**
   - ✅ Update profile info
   - ✅ Change password
   - ✅ Preferences
   - ✅ Logout

## 📱 Responsive Design

The application is fully responsive and works on:
- 💻 Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (320px - 767px)

## 🎯 Key Features

### Authentication
- JWT token storage in localStorage
- Automatic token attachment to API requests
- Auto-logout on token expiration
- Protected routes

### Form Validation
- Real-time validation
- Custom error messages
- Email format validation
- Password strength checks

### Data Visualization
- Interactive charts using Recharts
- Responsive chart sizing
- Custom tooltips
- Color-coded data

### User Experience
- Loading states
- Success/Error messages
- Smooth transitions
- Modal dialogs
- Mobile-friendly navigation

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use, Vite will automatically use the next available port (3001, 3002, etc.)

### Module Not Found Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### API Connection Issues

1. Check if backend is running
2. Verify API URL in `.env` file
3. Check browser console for CORS errors
4. Ensure backend allows requests from `http://localhost:3000`

### Styling Issues

```bash
# Rebuild Tailwind CSS
npm run dev
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Recharts Documentation](https://recharts.org)

## 🎉 Next Steps

1. **Customize the Design:** Modify `tailwind.config.js` to change colors and theme
2. **Add More Features:** Extend the application with new pages or components
3. **Connect Backend:** Integrate with your REST API
4. **Deploy:** Build and deploy to Vercel, Netlify, or your preferred hosting

## 💡 Tips

- The app uses mock data when API calls fail, making it easy to develop UI first
- All components are modular and can be easily customized
- Forms use React Hook Form for better performance
- Axios interceptors handle authentication automatically

## 🤝 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Review the README.md file
3. Check that all dependencies are installed
4. Ensure you're using Node.js v16 or higher

Happy coding! 🚀

