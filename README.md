# Quiz App

## Local development

```
npm install
npm run dev
```

Open http://localhost:5173/en

## Build and preview

```
npm run build
npm run preview -- --host 0.0.0.0
```

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

Steps:

1. Create a new GitHub repo and push the code:
```
git remote add origin https://github.com/<YOUR_USER>/<YOUR_REPO>.git
git push -u origin main
```
2. In the GitHub repo settings:
   - Settings → Pages → Build and deployment → Source: GitHub Actions
3. Push to `main` or trigger the workflow manually. The action builds `dist` and publishes Pages.

Vite `base` is set to `./` to support subpath hosting.

# Libertex Trading Quiz

A comprehensive trading quiz application built with React, TypeScript, and Tailwind CSS with advanced tracking and analytics.

## 🚀 Quick Start - Local Deployment

### ✅ **Option 1: Standalone Version (Works Immediately)**
Open `dist/standalone.html` directly in your browser - **this will work without any server setup!**

### 🔧 **Option 2: Simple Local Server**
```bash
node serve-local.js
```
Then open http://localhost:3000 in your browser

### 💻 **Option 3: Development Server**
```bash
npm install
npm run dev
```

### 🏗️ **Option 4: Build and Serve**
```bash
npm install
npm run build
npm run serve-local
```

## 📊 Analytics & Tracking

### Smart Data Collection Strategy
The application implements an intelligent data collection strategy that only sends data to Supabase when:

1. **Quiz Completion**: User completes the entire quiz and reaches the results page
2. **Trust Element Timeout**: User views at least one trust element but doesn't complete the quiz within 5 minutes

This approach ensures:
- **Privacy-focused**: Only collects data from engaged users
- **Performance optimized**: Reduces unnecessary database writes
- **Cost-effective**: Minimizes Supabase usage while capturing valuable insights
- **User-centric**: Respects users who quickly leave without engagement

### Enhanced Database Analytics

The application now includes comprehensive analytics views and functions for detailed user behavior analysis:

#### 📈 **Analytics Views Available**

1. **`quiz_analytics_responses`** - Comprehensive user response analysis
   - Complete user demographics and responses
   - Calculated fields for user status and progress
   - Session duration and engagement metrics

2. **`quiz_conversion_funnel`** - Daily conversion funnel metrics
   - Trust element engagement rates
   - Form completion rates
   - Email collection rates
   - Results view rates

3. **`quiz_user_segments`** - User segmentation analysis
   - Demographics-based segmentation
   - Conversion rates by segment
   - Average progress and session duration

4. **`quiz_market_analysis`** - Market interest performance
   - Market selection popularity
   - Conversion rates by market interest
   - Email collection by market preference

5. **`quiz_utm_performance`** - Campaign performance tracking
   - UTM parameter analysis
   - Campaign conversion rates
   - Traffic source effectiveness

6. **`quiz_trust_elements`** - Trust element effectiveness
   - Trust element view counts
   - Conversion rates by trust element
   - Email collection effectiveness

#### 🔧 **Analytics Functions**

- **`get_quiz_stats(days_back)`** - Real-time statistics with period comparison
- **Optimized indexes** for fast analytics queries
- **Performance-focused views** limited to recent data

### Database Tracking
The application tracks comprehensive user behavior in a single Supabase table (`quiz_sessions`):

- **User Email**: Captured from lead form completion
- **Complete Quiz Responses**: All user answers to quiz questions stored in `responses` JSONB field
- **Trust Elements Viewed**: Array of trust elements each user has seen
- **Form Completion**: Boolean flag when users complete the lead capture form
- **Results Viewed**: Boolean flag when users reach the final results page
- **Facebook Events**: Array of all Facebook Pixel events fired during the session
- **UTM Parameters**: Object containing marketing campaign data
- **User Agent & Referrer**: Technical and traffic source information
- **Session Metadata**: Progress, completion status, timestamps

### Email and Response Tracking
The system now captures:

1. **Email Address**: Automatically saved when user completes the lead form
2. **All Quiz Answers**: Complete user responses stored in the `responses` field including:
   - Demographics (gender, age)
   - Financial situation and goals
   - Trading knowledge and experience
   - Market interests and investment readiness
   - Personal goals and time commitment
   - Language preference

3. **User Profile**: Enhanced to include email when available:
   ```json
   {
     "name": "User Name",
     "role": "user",
     "email": "user@example.com"
   }
   ```

### Facebook Pixel Events
The following Facebook events are automatically tracked:

- `InitiateCheckout` - User starts the quiz
- `AddToCart` - User completes a quiz step
- `ViewContent` - User views a trust element
- `Lead` - User starts filling the lead form
- `CompleteRegistration` - User completes the lead form
- `Purchase` - User reaches results page (main conversion)
- `Subscribe` - User clicks download guide
- `Search` - User selects language
- `AddToWishlist` - User selects market interests

### Session Management
Each user session is tracked with:
- **Unique Session ID**: Generated client-side for session identification
- **Local State Management**: All data stored locally until transmission criteria are met
- **Timeout Management**: 5-minute timer after trust element viewing
- **Page Unload Protection**: Uses `sendBeacon` API for reliable data transmission
- **Email Capture**: Automatically tracked when user provides email in lead form

### Supabase Analytics Dashboard
You can view all tracking data in your Supabase dashboard using the new analytics views:

#### **Quick Analytics Queries**

```sql
-- Real-time stats for last 7 days with comparison
SELECT * FROM get_quiz_stats(7);

-- Daily conversion funnel for last 30 days
SELECT * FROM quiz_conversion_funnel ORDER BY date DESC LIMIT 30;

-- Top performing user segments
SELECT * FROM quiz_user_segments 
WHERE segment_size >= 10 
ORDER BY conversion_rate DESC LIMIT 10;

-- Market interest performance
SELECT * FROM quiz_market_analysis 
ORDER BY conversion_rate DESC;

-- UTM campaign performance
SELECT * FROM quiz_utm_performance 
WHERE sessions >= 10 
ORDER BY conversion_rate DESC;

-- Trust element effectiveness
SELECT * FROM quiz_trust_elements 
ORDER BY conversion_rate DESC;

-- Recent user responses with full details
SELECT * FROM quiz_analytics_responses 
ORDER BY created_at DESC LIMIT 50;
```

#### **Advanced Analytics Queries**

```sql
-- Conversion funnel analysis
SELECT 
  'Started Quiz' as stage, COUNT(*) as users, 100.0 as conversion_rate
FROM quiz_sessions WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
UNION ALL
SELECT 
  'Engaged (Trust Elements)' as stage, 
  COUNT(*) as users,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz_sessions WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 2) as conversion_rate
FROM quiz_sessions 
WHERE array_length(trust_elements_viewed::jsonb, 1) > 0 
  AND created_at >= CURRENT_DATE - INTERVAL '7 days'
UNION ALL
SELECT 
  'Form Completed' as stage,
  COUNT(*) as users,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz_sessions WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 2) as conversion_rate
FROM quiz_sessions 
WHERE form_completed = true 
  AND created_at >= CURRENT_DATE - INTERVAL '7 days'
UNION ALL
SELECT 
  'Email Collected' as stage,
  COUNT(*) as users,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz_sessions WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 2) as conversion_rate
FROM quiz_sessions 
WHERE user_profile->>'email' IS NOT NULL 
  AND created_at >= CURRENT_DATE - INTERVAL '7 days'
UNION ALL
SELECT 
  'Results Viewed' as stage,
  COUNT(*) as users,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM quiz_sessions WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 2) as conversion_rate
FROM quiz_sessions 
WHERE results_viewed = true 
  AND created_at >= CURRENT_DATE - INTERVAL '7 days';

-- User journey analysis by demographics
SELECT 
  responses->>'gender' as gender,
  responses->>'age' as age_range,
  responses->>'financialSituation' as financial_situation,
  COUNT(*) as total_users,
  ROUND(AVG(progress_percentage), 2) as avg_progress,
  COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
  ROUND(COUNT(CASE WHEN form_completed THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate,
  ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(completed_at, last_active) - created_at))/60), 2) as avg_session_minutes
FROM quiz_sessions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  AND responses IS NOT NULL
GROUP BY responses->>'gender', responses->>'age', responses->>'financialSituation'
HAVING COUNT(*) >= 5
ORDER BY conversion_rate DESC;

-- Market interest cross-analysis
SELECT 
  m1.market as market1,
  m2.market as market2,
  COUNT(*) as combinations,
  ROUND(AVG(s.progress_percentage), 2) as avg_progress,
  COUNT(CASE WHEN s.form_completed THEN 1 END) as conversions,
  ROUND(COUNT(CASE WHEN s.form_completed THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM quiz_sessions s,
LATERAL jsonb_array_elements_text(s.responses->'marketInterests') as m1(market),
LATERAL jsonb_array_elements_text(s.responses->'marketInterests') as m2(market)
WHERE s.responses->'marketInterests' IS NOT NULL
  AND s.created_at >= CURRENT_DATE - INTERVAL '30 days'
  AND m1.market < m2.market  -- Avoid duplicates
GROUP BY m1.market, m2.market
HAVING COUNT(*) >= 5
ORDER BY conversion_rate DESC, combinations DESC;
```

## 📁 File Structure

```
├── dist/
│   ├── index.html          # Main built version (needs server)
│   ├── standalone.html     # Self-contained version (works directly)
│   └── assets/            # All compiled assets and images
├── src/                   # Source code
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks (including session management)
│   ├── utils/            # Utility functions (Facebook Pixel, translations, analytics)
│   └── context/          # React context providers
├── supabase/
│   └── migrations/       # Database migration files (including analytics views)
├── serve-local.js         # Simple local server script
└── README.md             # This file
```

## 🎯 Features

- **Interactive multi-step trading quiz**
- **Smart data collection** (only when users are engaged)
- **Email capture and storage** in Supabase
- **Complete user response tracking** for analysis
- **Advanced analytics views** for comprehensive reporting
- **Real-time statistics** with period comparisons
- **User segmentation** and conversion analysis
- **Comprehensive user tracking and analytics**
- **Facebook Pixel integration** with event tracking
- **Responsive design** for all devices
- **Progress tracking** with visual indicators
- **Personalized results** based on responses
- **Lead capture** with email collection
- **Professional Libertex branding**
- **Multi-language support** (English/Russian)
- **Risk warnings** and compliance
- **Supabase backend** for data persistence
- **Session timeout management**
- **UTM parameter tracking**
- **Performance optimized** with image preloading

## 🛠️ Technologies

- React 18 with TypeScript
- Tailwind CSS for styling
- Supabase for backend and analytics
- Facebook Pixel for conversion tracking
- Tealium for additional analytics
- Vite for build tooling
- Lucide React for icons
- Advanced SQL views for analytics

## 🔧 Configuration

### Facebook Pixel Setup
1. Replace the placeholder Pixel ID in `index.html` and `src/utils/facebookPixel.ts`
2. Update the Pixel ID in `src/context/SurveyContext.tsx`

### Supabase Setup
1. Create a Supabase project
2. Run the migrations in the `supabase/migrations/` folder
3. Update the environment variables in `.env`

### Analytics Setup
The analytics views and functions are automatically created when you run the latest migration. You can access them directly in your Supabase dashboard or use the provided TypeScript functions in `src/utils/analytics.ts`.

### UTM Parameter Tracking
The application automatically captures and stores UTM parameters:
- utm_source
- utm_medium  
- utm_campaign
- utm_term
- utm_content

## 🔧 Troubleshooting

**If you see a blank page:**
1. Try `dist/standalone.html` first (this always works)
2. Use the local server: `node serve-local.js`
3. Make sure you're not opening `dist/index.html` directly (it needs a server)

**For development:**
1. Run `npm install` first
2. Then `npm run dev` for development mode
3. Or `npm run build && npm run serve-local` for production mode

## 🌐 Deployment

The `dist/` folder contains all files needed for web deployment. Upload the entire `dist/` folder to any web server.

## ⚠️ Important Notes

- `dist/standalone.html` - Works directly in browser (no server needed)
- `dist/index.html` - Requires a web server to function properly
- All images and assets are included in the `dist/assets/` folder
- The quiz works offline once loaded
- Facebook Pixel requires HTTPS in production
- Supabase provides real-time analytics dashboard with enhanced views
- **Data is only sent to Supabase when users are engaged** (complete quiz or view trust elements)
- **Email addresses are automatically captured** when users complete the lead form
- **All user responses are stored** in the `responses` JSONB field for comprehensive analysis
- **Advanced analytics views** provide detailed insights into user behavior and conversion patterns
- Session data is managed locally until transmission criteria are met
- 5-minute timeout after trust element viewing ensures data capture from interested users
- **Performance optimized** with image preloading and lazy loading