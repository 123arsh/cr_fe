# Frontend Deployment Guide for Render

## ✅ What I've Updated

Based on your deployed backend at `https://cr-be-1.onrender.com`, I've updated your frontend to connect to the production backend:

### 1. **API Configuration**
- Created `src/config/api.js` with centralized API configuration
- All API calls now point to your deployed backend: `https://cr-be-1.onrender.com`
- Environment variable support for flexibility

### 2. **Updated Components**
- ✅ `src/components/auth/login.jsx` - Login API calls
- ✅ `src/components/auth/signup.jsx` - Signup API calls  
- ✅ `src/contexts/AuthContext.jsx` - Authentication checks
- ✅ `src/components/subComponents/navigation.jsx` - Auth checks & logout
- ✅ `src/components/auth/ProtectedRoute.jsx` - Route protection
- ✅ `src/components/subComponents/Reviews.jsx` - Reviews API
- ✅ `src/components/subComponents/ReviewForm.jsx` - Review submission
- ✅ `src/components/navigation/MyRequests.jsx` - Booking management
- ✅ `src/components/navigation/lists.jsx` - Car listings & bookings
- ✅ `src/components/details/enterdetail.jsx` - Car details & booking
- ✅ `src/components/subComponents/Footer.jsx` - Admin login link

### 3. **Production Configuration**
- ✅ Updated `vite.config.js` for production builds
- ✅ Added `public/_redirects` for client-side routing
- ✅ All image URLs now use the deployed backend

## 🚀 Deployment Steps

### Step 1: Commit Your Changes
```bash
git add .
git commit -m "Update frontend to connect to deployed backend at https://cr-be-1.onrender.com"
git push origin main
```

### Step 2: Deploy to Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in to your account

2. **Create New Static Site**
   - Click "New +" button
   - Select "Static Site"

3. **Connect Repository**
   - Connect your GitHub account
   - Select your frontend repository
   - Choose `main` branch

4. **Configure Build Settings**
   - **Name**: `cr-fe-1` (or your preferred name)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Leave as default

5. **Deploy**
   - Click "Create Static Site"
   - Render will build and deploy automatically

### Step 3: Test Your Deployment

1. **Check Build Logs**
   - Monitor the build process
   - Ensure no errors occur

2. **Test Functionality**
   - Visit your deployed URL
   - Test login/signup
   - Verify car browsing works
   - Check booking functionality
   - Test admin login link

## 🔧 Environment Variables (Optional)

If you need to override the backend URL:

- **Development**: Create `.env.local` with `VITE_API_URL=http://localhost:7700`
- **Production**: Default is `https://cr-be-1.onrender.com`

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Your backend needs to allow requests from your frontend domain
   - Check backend CORS configuration

2. **Build Failures**
   - Ensure all dependencies are in `package.json`
   - Check Node.js version compatibility

3. **API Connection Issues**
   - Verify backend is running at `https://cr-be-1.onrender.com`
   - Test API endpoints directly

4. **Routing Issues**
   - The `_redirects` file handles client-side routing
   - If issues persist, check Render's routing docs

## 📋 What's Connected

Your frontend now connects to these backend endpoints:

- **Authentication**: `/login`, `/signup`, `/logout`, `/check-auth`
- **Cars**: `/car/list`, `/car/:id`
- **Bookings**: `/detail/detail`, `/detail/send`, `/detail/:id`
- **Reviews**: `/api/ratings`
- **Admin**: `/admin/login`
- **Images**: Car images and document images

## 🎯 Next Steps

After successful deployment:
1. Test all functionality thoroughly
2. Set up monitoring
3. Configure automatic deployments
4. Consider custom domain setup

Your frontend is now ready to connect to your deployed backend! 🚀 