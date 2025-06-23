# AI Content Generator App

A modern, full-stack AI-powered content generation platform built with Next.js, Clerk authentication, Drizzle ORM, and a beautiful, responsive UI. Effortlessly generate, manage, and customize high-quality content for your projects.

## Features

- ✨ **17+ Templates**: Responsive, mobile-first content templates for various use cases.
- 🛠️ **Customizable**: Easily extend and customize components to fit your needs.
- 💸 **Free to Use**: All components and plugins are well documented and open source.
- ⚡ **24/7 Support**: Contact us any time for help or questions.
- 🔒 **Authentication**: Secure sign-in/sign-up with Clerk.
- 📊 **Dashboard**: Track usage, manage templates, and view content history.
- 💳 **Subscription Management**: Upgrade plans and manage billing securely.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/ai-content-generator-app.git
cd ai-content-generator-app
```

### 2. Install Dependencies
```bash
npm install --force
# or
yarn install --force
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_DRIZZLE_DB_URL=your_database_url
MONTHLY_SUBSCRIPTION_PLAN_ID=plan_QkK0vnaAEylqIz
YEARLY_SUBSCRIPTION_PLAN_ID=plan_QkK1obIHHAQdkq
RAZORPAY_KEY_ID=rzp_test_pIk7qARmLefaop
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_pIk7qARmLefaop
```

**Note:** Never commit your `.env` file to version control.

### 4. Start the Drizzle Database

Make sure your database is running and accessible using the credentials in your `.env.local` file.

To run Drizzle migrations and set up your database schema, use:
```bash
npx drizzle-kit push:pg
```

This will apply your schema to the database defined in `NEXT_PUBLIC_DRIZZLE_DB_URL`.

If you need to generate migration files, use:
```bash
npx drizzle-kit generate:pg
```

Refer to the [Drizzle ORM documentation](https://orm.drizzle.team/docs/overview) for more advanced usage.

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Open Drizzle Studio (Optional)

To visually manage and inspect your database, you can use Drizzle Studio:
```bash
npx drizzle-kit studio
```

This will launch a local web interface for your database defined in `NEXT_PUBLIC_DRIZZLE_DB_URL`.

## Project Structure
- `app/` - Main application code (pages, components, API routes)
- `components/` - Reusable UI components
- `utils/` - Utility functions, database schema, and helpers
- `public/` - Static assets

## License
[MIT](LICENSE)

---

Made with ❤️ using Next.js, Clerk, and Drizzle ORM.
