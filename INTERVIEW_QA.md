# AI-Powered Content Generator — Interview Q&A

**Interview:** OneLab Ventures · AI Native Engineer (SDE2) · March 2026  
**Interviewer:** Balkrushna More  

---

## Project Executive Summary

1. **Full-Stack SaaS Platform**: Built a production-ready AI content generation platform using Next.js 15.3.3 App Router, integrating SambaNova's Meta-Llama-3.1-8B-Instruct model for 18 specialized content templates (blog posts, YouTube descriptions, code generation, etc.)

2. **Enterprise Authentication & Payments**: Implemented Clerk authentication with protected routes via middleware, integrated Razorpay subscription system with webhook handling for Monthly (₹700/month) and Yearly (₹7,000/year) plans supporting 10,000+ monthly generations

3. **Type-Safe Database Architecture**: Designed PostgreSQL schema using Drizzle ORM with Neon serverless driver, implementing two core tables (AIOutput for generation history, UserSubscription for billing) with optimized queries and 2-minute cache headers

4. **Credit-Based Usage System**: Built real-time usage tracking with context-based state management, enforcing tier-based limits (Free: 10,000 words, Monthly: 100,000 words, Yearly: 1,200,000 words) with automatic UI updates via React Context

5. **Rich Content Editor Integration**: Integrated Toast UI WYSIWYG editor with HTML-formatted AI responses, implementing copy-to-clipboard with rich text preservation and custom animations for enhanced UX

---

## Files Read

**Configuration & Setup (6 files):**
- package.json
- README.md
- next.config.ts
- tsconfig.json
- drizzle.config.ts
- middleware.ts

**Database & Schema (2 files):**
- utils/schema.tsx
- utils/db.tsx

**Data & Templates (1 file):**
- app/(data)/Templates.tsx

**API Routes (6 files):**
- app/api/check-subscription/route.js
- app/api/create-subscription/route.js
- app/api/save-subscription/route.js
- app/api/get-history/route.js
- app/api/get-total-usage/route.js
- app/api/get-user-subscription/route.js

**Core Application Logic (2 files):**
- app/actions.ts
- app/dashboard/content/[template-slug]/page.tsx

**UI Components (8 files):**
- app/dashboard/_components/Header.tsx
- app/dashboard/_components/SideNav.tsx
- app/dashboard/_components/UsageTrack.tsx
- app/dashboard/_components/TemplateCard.tsx
- app/dashboard/billing/page.tsx
- app/dashboard/content/[template-slug]/_components/FormSection.tsx
- app/dashboard/content/[template-slug]/_components/OutputSection.tsx
- app/dashboard/history/page.tsx

**Context & State Management (3 files):**
- app/(context)/TotalUsageContext.tsx
- app/(context)/UserSubscriptionContext.tsx
- app/(context)/UpdateCreditUsageContext.tsx

**Layout & Providers (4 files):**
- app/layout.tsx
- app/provider.tsx
- app/dashboard/layout.tsx
- app/dashboard/page.tsx

**Total: 32 files analyzed**

---


## SECTION 1: Architecture & Tech Stack Decisions

### Q1: Why did you choose Next.js App Router over the Pages Router for this SaaS application?

**Difficulty:** Medium  
**Category:** Architecture

**Answer:**  
I chose Next.js 15.3.3 with the App Router because this SaaS platform benefits heavily from server-side rendering and server actions. Looking at `app/actions.ts`, I implemented `generateSambaNovaContent` as a server action with the `'use server'` directive, which allows me to securely call the SambaNova API without exposing the API key to the client. The App Router's file-based routing in the `app/` directory made it natural to organize authentication routes under `app/(auth)/sign-in` and `app/(auth)/sign-up`, while keeping the main dashboard under `app/dashboard`. The layout system in `app/dashboard/layout.tsx` provides a persistent sidebar and header across all dashboard pages without re-rendering, which is crucial for maintaining the usage tracking context.

**Key talking points:**
- Server actions eliminate the need for separate API routes for AI generation
- Nested layouts (`app/layout.tsx` → `app/dashboard/layout.tsx`) provide persistent UI with React Context providers
- Route groups like `(auth)`, `(context)`, and `(data)` organize code without affecting URL structure
- Turbopack dev server (`"dev": "next dev --turbopack"` in package.json) provides faster hot reloading during development

**Follow-up the interviewer might ask:** How do you handle client-side interactivity with server components in the App Router?

---

### Q2: Why did you choose Drizzle ORM over Prisma for this project?

**Difficulty:** Medium  
**Category:** Architecture / Drizzle

**Answer:**  
I selected Drizzle ORM because it provides a lightweight, type-safe solution that works seamlessly with Neon's serverless PostgreSQL. Looking at `drizzle.config.ts`, the configuration is minimal—just 9 lines pointing to `utils/schema.tsx` with the PostgreSQL dialect and connection URL. Drizzle's schema definition in `utils/schema.tsx` uses a functional API (`pgTable`, `serial`, `varchar`, `text`, `boolean`) that feels more like writing SQL than an abstraction layer. The key advantage is the `drizzle-orm/neon-http` integration in `utils/db.tsx`, which uses Neon's HTTP driver instead of a persistent connection pool—critical for serverless environments where connection limits can be exhausted. The migration workflow with `npm run db:push` and `npm run db:studio` (defined in package.json) is simpler than Prisma's generate-migrate-deploy cycle.

**Key talking points:**
- Neon serverless driver (`@neondatabase/serverless` v1.0.1) eliminates connection pooling issues
- Schema is co-located with TypeScript types—no code generation step required
- Drizzle Studio (`drizzle-kit studio`) provides a GUI for database inspection
- Smaller bundle size compared to Prisma (important for edge deployments)

**Follow-up the interviewer might ask:** How do you handle database migrations in production with Drizzle?

---

### Q3: Why did you choose Clerk for authentication instead of implementing custom JWT-based auth?

**Difficulty:** Medium  
**Category:** Architecture / Clerk

**Answer:**  
I chose Clerk because it handles the entire authentication lifecycle with minimal code. Looking at `middleware.ts`, I use `clerkMiddleware` with `createRouteMatcher` to protect all routes except the landing page (`"/"`). The middleware automatically redirects unauthenticated users to `/sign-in` (configured via `NEXT_PUBLIC_CLERK_SIGN_IN_URL` in the README). In `app/dashboard/content/[template-slug]/page.tsx`, I use the `useUser()` hook to access `user.primaryEmailAddress.emailAddress` for database queries—Clerk handles token refresh, session management, and CSRF protection automatically. The catch-all routes `app/(auth)/sign-in/[[...sign-in]]/page.tsx` and `app/(auth)/sign-up/[[...sign-up]]/page.tsx` render Clerk's pre-built UI components, saving weeks of development time for features like email verification, password reset, and OAuth providers.

**Key talking points:**
- Middleware in `middleware.ts` uses `matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]` to protect all routes including API routes
- `useUser()` hook provides loading states (`isLoaded`) to prevent hydration mismatches
- Clerk's `UserButton` component in `app/dashboard/_components/Header.tsx` provides profile management UI
- User metadata can be extended to store subscription tier without additional database tables

**Follow-up the interviewer might ask:** How do you sync Clerk user data with your PostgreSQL database?

---

### Q4: Why PostgreSQL over MongoDB for storing AI-generated content?

**Difficulty:** Easy  
**Category:** Architecture

**Answer:**  
I chose PostgreSQL because the data model is inherently relational. Looking at `utils/schema.tsx`, the `AIOutput` table has a foreign key relationship with users via `createdBy: varchar('createdBy').notNull()` (storing the email), and the `UserSubscription` table links to users via `email: varchar('email')`. The queries in `app/api/get-history/route.js` use Drizzle's relational operators like `eq(AIOutput.createdBy, email)` and `orderBy(desc(AIOutput.id))`, which map directly to SQL. PostgreSQL's ACID guarantees are critical for the payment flow—when a Razorpay webhook fires in `app/api/save-subscription/route.js`, I need to ensure the subscription record is atomically inserted with `active: true`. Additionally, Neon's serverless PostgreSQL provides automatic scaling and branching for preview deployments, which wouldn't be possible with a self-hosted MongoDB instance.

**Key talking points:**
- Structured schema with clear relationships (users → subscriptions, users → AI outputs)
- SQL aggregations for usage tracking (word count calculation in `app/api/get-total-usage/route.js`)
- Neon's serverless architecture eliminates connection pooling issues
- Future-proof for analytics queries (e.g., "most popular templates by subscription tier")

**Follow-up the interviewer might ask:** How would you optimize queries if you had millions of AI generation records?

---

### Q5: Explain the overall SaaS architecture—how do frontend, database, LLM, and payments integrate in a single Next.js app?

**Difficulty:** Hard  
**Category:** Architecture

**Answer:**  
The architecture is a monolithic Next.js application with clear separation of concerns. The frontend lives in `app/dashboard/` with React Server Components for initial page loads and Client Components (marked with `"use client"`) for interactivity. The AI generation flow starts in `app/dashboard/content/[template-slug]/page.tsx` where `GenereteAIContent` calls the server action `generateSambaNovaContent` from `app/actions.ts`—this keeps the SambaNova API key (`process.env.SAMBANOVA_API_KEY`) server-side only. The response is saved to PostgreSQL via `SaveInDb`, which inserts into the `AIOutput` table using Drizzle ORM. Payment integration happens in `app/dashboard/billing/page.tsx`, where clicking "Go Monthly" calls `createSubscription` (hits `/api/create-subscription/route.js`), which uses the Razorpay SDK to create a subscription object. The Razorpay checkout modal handles payment, and on success, the `handler` callback saves the subscription to the database via `/api/save-subscription/route.js`. Usage tracking is managed through React Context providers in `app/dashboard/layout.tsx`, which wrap the entire dashboard and provide `totalUsage`, `userSubscription`, and `updateCreditUsage` to all child components.

**Key talking points:**
- Server actions (`'use server'`) eliminate the need for API routes for AI calls
- API routes (`app/api/`) handle database operations and Razorpay integration
- React Context (`TotalUsageContext`, `UserSubscriptionContext`) provides global state without prop drilling
- Middleware (`middleware.ts`) protects all routes with Clerk authentication

**Follow-up the interviewer might ask:** What would you change if you needed to scale this to 100,000 concurrent users?

---

### Q6: How does the folder structure separate concerns in the app/ directory?

**Difficulty:** Easy  
**Category:** Architecture

**Answer:**  
The `app/` directory uses route groups (folders with parentheses) to organize code without affecting URLs. `app/(auth)/` contains sign-in and sign-up pages with catch-all routes (`[[...sign-in]]`), which render Clerk's authentication UI. `app/(context)/` holds React Context definitions (`TotalUsageContext.tsx`, `UserSubscriptionContext.tsx`, `UpdateCreditUsageContext.tsx`) that are imported into `app/dashboard/layout.tsx`. `app/(data)/` contains the `Templates.tsx` file, which exports an array of 18 template objects with `name`, `desc`, `icon`, `aiPrompt`, `slug`, and `form` fields. The `app/api/` directory contains API routes for database operations (subscriptions, history, usage). The `app/dashboard/` directory is the main application, with `_components/` for shared UI (Header, SideNav, UsageTrack) and nested routes like `content/[template-slug]/` for dynamic template pages. This structure keeps authentication, data, and business logic separate while maintaining a flat URL structure.

**Key talking points:**
- Route groups `(auth)`, `(context)`, `(data)` don't appear in URLs
- `_components/` folders are private (not routable)
- Dynamic routes use `[template-slug]` for parameterized URLs
- Catch-all routes `[[...sign-in]]` handle Clerk's multi-step auth flow

**Follow-up the interviewer might ask:** How do you handle shared components between different route groups?

---

### Q7: What interesting settings exist in next.config.ts and why?

**Difficulty:** Easy  
**Category:** Architecture

**Answer:**  
Looking at `next.config.ts`, I configured `images.domains: ["cdn-icons-png.flaticon.com"]` to allow Next.js Image optimization for the template icons loaded from Flaticon (used in `app/(data)/Templates.tsx` for each template's `icon` field). The `reactStrictMode: true` setting enables double-rendering in development to catch side effects and unsafe lifecycle methods. The `env` object exposes Razorpay environment variables to the client side (`NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_RAZORPAY_MONTHLY_PLAN_ID`, `NEXT_PUBLIC_RAZORPAY_YEARLY_PLAN_ID`) because the Razorpay checkout modal runs in the browser. These are mapped from server-side variables (`MONTHLY_SUBSCRIPTION_PLAN_ID`, `YEARLY_SUBSCRIPTION_PLAN_ID`) to avoid exposing internal naming conventions.

**Key talking points:**
- Image optimization requires whitelisting external domains for security
- React Strict Mode helps catch bugs during development
- Environment variable mapping keeps client-side variables prefixed with `NEXT_PUBLIC_`
- Razorpay plan IDs must be client-accessible for the checkout modal

**Follow-up the interviewer might ask:** Why not use `NEXT_PUBLIC_` prefix directly in .env.local instead of mapping in next.config.ts?

---

### Q8: How does TypeScript configuration support the Next.js App Router?

**Difficulty:** Easy  
**Category:** Architecture

**Answer:**  
Looking at `tsconfig.json`, the `target: "ES2017"` ensures compatibility with modern JavaScript features while supporting older browsers. The `moduleResolution: "bundler"` setting is specific to Next.js 15 and enables proper resolution of server and client components. The `paths: { "@/*": ["./*"] }` alias allows absolute imports like `import { db } from '@/utils/db'` instead of relative paths like `../../../utils/db`. The `plugins: [{ "name": "next" }]` entry enables TypeScript support for Next.js-specific features like server actions and route handlers. The `include` array contains `.next/types/**/*.ts`, which includes auto-generated types for route parameters (like the `params` prop in `app/dashboard/content/[template-slug]/page.tsx`). The `strict: true` setting enforces strict null checks and type safety across the codebase.

**Key talking points:**
- Path aliases (`@/*`) improve import readability and refactoring
- Next.js TypeScript plugin provides type inference for route params
- Strict mode catches potential null/undefined errors at compile time
- `isolatedModules: true` ensures each file can be transpiled independently (required for Turbopack)

**Follow-up the interviewer might ask:** How do you handle type safety for dynamic route parameters in the App Router?

---


## SECTION 2: SambaNova AI API Integration — Deep Dive

### Q9: Walk me through the actual AI API call code—what model is used and what parameters are configured?

**Difficulty:** Hard  
**Category:** SambaNova API

**Answer:**  
Looking at `app/actions.ts`, the `generateSambaNovaContent` function makes a POST request to `https://api.sambanova.ai/v1/chat/completions` with the model `"Meta-Llama-3.1-8B-Instruct"`. The request body includes `stream: false` (non-streaming response), a system message `"You are a helpful assistant"`, and the user prompt. The function uses `Bearer ${apiKey}` authentication with the API key from `process.env.SAMBANOVA_API_KEY`. I implemented a helper function `handleNonStreamResponse` that parses the JSON response and extracts `data.choices[0]?.message?.content || ""`. The original code had `stream: true` in the first fetch, but I refactored to use `stream: false` for simplicity, which returns the full response at once instead of requiring SSE (Server-Sent Events) parsing. Error handling checks `response.ok` and throws a detailed error with status code and response text if the API call fails.

**Key talking points:**
- Model: Meta-Llama-3.1-8B-Instruct (8 billion parameter instruction-tuned model)
- API endpoint: SambaNova's OpenAI-compatible chat completions API
- Authentication: Bearer token in Authorization header
- Response parsing: `choices[0].message.content` follows OpenAI's response format
- No streaming implementation (could be added for real-time UI updates)

**Follow-up the interviewer might ask:** Why did you choose the 8B model over larger models like 70B or 405B?

---

### Q10: Show me the actual system prompts for each content template—quote at least 3 examples.

**Difficulty:** Medium  
**Category:** SambaNova API

**Answer:**  
Looking at `app/(data)/Templates.tsx`, here are three actual prompts:

**Blog Title Generator:**
```
"Generate 5 creative, SEO-optimized blog title ideas based on the provided niche and outline.
Format the output for a rich text editor with the following style:
- Start with a bold heading: **Top Blog Title Ideas**
- Use bullet points for each title.
- Bold important keywords in each title.
- Add spacing between entries for readability.
- Output in HTML or Markdown."
```

**Code Bug Detector:**
```
"Analyze the code for bugs and suggest fixes.
Response style:
- Bold heading: **Detected Issues**
- <pre><code> blocks for buggy and corrected code
- Explain each fix below in <p> tags."
```

**Instagram Post Generator:**
```
"Generate 3 creative Instagram post captions based on the given keywords.
Format the response with:
- Each post under its own bold heading: **Post 1**, **Post 2**, etc.
- Include emojis and line breaks.
- Make it look like a ready-to-post caption in rich text format."
```

All prompts explicitly request HTML formatting with tags like `<b>`, `<ul>`, `<li>`, `<p>`, `<pre>`, `<code>` to ensure the output renders correctly in the Toast UI editor.

**Key talking points:**
- Every prompt includes formatting instructions for rich text output
- Prompts specify HTML tags instead of Markdown to avoid parsing issues
- The "Blog Content" template requests `<h2>` for titles and `<h3>` for subheadings
- Prompts are designed to produce copy-paste-ready content with minimal post-processing

**Follow-up the interviewer might ask:** How do you prevent the AI from ignoring formatting instructions?

---

### Q11: How are the 18 templates structured in code—are they objects, classes, or functions?

**Difficulty:** Easy  
**Category:** SambaNova API

**Answer:**  
Looking at `app/(data)/Templates.tsx`, the templates are exported as a default array of plain JavaScript objects. Each object has the structure:
```typescript
{
  name: string,           // Display name (e.g., "Blog Title")
  desc: string,           // Description shown on template card
  category: string,       // Category for filtering (e.g., "Blog", "Youtube Tools")
  icon: string,           // Flaticon CDN URL
  aiPrompt: string,       // System prompt for the AI
  slug: string,           // URL-safe identifier (e.g., "generate-blog-title")
  form: Array<{          // Form fields for user input
    label: string,
    field: 'input' | 'textarea',
    name: string,
    required?: boolean
  }>
}
```

The array is imported in `app/dashboard/content/[template-slug]/page.tsx` as `Templates` and filtered using `Templates?.find((item) => item.slug == unwrappedParams['template-slug'])` to get the selected template. The form fields are mapped in `FormSection.tsx` to render either `<Input>` or `<Textarea>` components based on the `field` property.

**Key talking points:**
- 18 templates total (Blog Title, Blog Content, YouTube SEO Title, Code Generator, etc.)
- Plain objects allow easy addition of new templates without code changes
- The `slug` field maps to the dynamic route `[template-slug]`
- Form configuration is declarative—no hardcoded form logic per template

**Follow-up the interviewer might ask:** How would you add a new template to the system?

---

### Q12: How is the prompt dynamically constructed from user form input?

**Difficulty:** Medium  
**Category:** SambaNova API

**Answer:**  
Looking at `app/dashboard/content/[template-slug]/page.tsx`, the `GenereteAIContent` function receives `formData` (an object with user inputs like `{ niche: "AI", outline: "..." }`). The prompt construction happens in this line:
```typescript
const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt + ". Return the result as HTML only, using tags like <b>, <ul>, <li>, <p> as appropriate for rich text editors. Do not use markdown, code blocks, or RTF. Do not wrap everything in a single <p> or <ul> unless it is semantically correct. The output should be ready to render in a WYSIWYG editor.";
```

So if a user fills out the Blog Title form with `niche: "AI"` and `outline: "Introduction to machine learning"`, the final prompt becomes:
```
{"niche":"AI","outline":"Introduction to machine learning"}, Generate 5 creative, SEO-optimized blog title ideas based on the provided niche and outline. [formatting instructions...]. Return the result as HTML only, using tags like <b>, <ul>, <li>, <p> as appropriate for rich text editors...
```

The `JSON.stringify(formData)` ensures all user inputs are included, and the template's `aiPrompt` provides the task-specific instructions.

**Key talking points:**
- User inputs are serialized as JSON and prepended to the template prompt
- Additional formatting instructions are appended to enforce HTML output
- The AI model parses the JSON structure to extract field values
- This approach allows flexible form schemas without prompt rewriting

**Follow-up the interviewer might ask:** What happens if the user input contains malicious content or prompt injection attempts?

---

### Q13: Is streaming implemented for real-time AI responses, or does it return the full response at once?

**Difficulty:** Medium  
**Category:** SambaNova API

**Answer:**  
Looking at `app/actions.ts`, the current implementation uses `stream: false` in the `handleNonStreamResponse` function, which means the full response is returned at once. The original code had `stream: true` in the first fetch call, but there's no SSE (Server-Sent Events) parsing logic to handle the streamed chunks. The function simply awaits `response.json()` and returns `data.choices[0]?.message?.content`. In `app/dashboard/content/[template-slug]/page.tsx`, the UI shows a loading spinner (`loading && <Loader2Icon className='animate-spin'/>`) while waiting for the full response, then updates the `AIOutput` state with `setAIOutput(text)` all at once. There's no incremental rendering of text as it's generated.

**Key talking points:**
- Current implementation: full response, no streaming
- Loading state managed with `useState(false)` and `setLoading(true/false)`
- Toast UI editor receives the complete HTML response via `editorRef.current.getInstance().setHTML(AIOutput)`
- Streaming could be added using `ReadableStream` and `TextDecoder` for better UX on long responses

**Follow-up the interviewer might ask:** How would you implement streaming to show the AI response in real-time?

---

### Q14: How is the AI response parsed and returned to the frontend?

**Difficulty:** Easy  
**Category:** SambaNova API

**Answer:**  
Looking at `app/actions.ts`, the `handleNonStreamResponse` function parses the JSON response with `await response.json()` and extracts the content using `data.choices[0]?.message?.content || ""`. The optional chaining (`?.`) handles cases where the response structure is unexpected, and the `|| ""` fallback ensures a string is always returned. This string is then returned to the calling function in `app/dashboard/content/[template-slug]/page.tsx`, where it's stored in the `AIOutput` state with `setAIOutput(text)`. The `OutputSection` component receives this string as a prop and renders it in the Toast UI editor using `editorRef.current.getInstance().setHTML(AIOutput)`. The HTML content is rendered directly without sanitization (potential XSS risk if the AI returns malicious HTML, though unlikely with instruction-tuned models).

**Key talking points:**
- Response follows OpenAI's chat completion format: `{ choices: [{ message: { content: "..." } }] }`
- No sanitization of HTML content (assumes AI output is safe)
- Error handling returns empty string on failure
- The editor's `setHTML` method renders the HTML directly in the WYSIWYG view

**Follow-up the interviewer might ask:** How would you sanitize the AI response to prevent XSS attacks?

---

### Q15: How are API errors from SambaNova handled (rate limits, quota exceeded, network failures)?

**Difficulty:** Medium  
**Category:** SambaNova API

**Answer:**  
Looking at `app/actions.ts`, error handling checks `if (!response.ok)` and throws an error with the format:
```typescript
throw new Error(`SambaNova API Error: ${response.status} ${response.statusText} - ${errorText}`);
```
The `errorText` is extracted with `await response.text()` to capture the API's error message. However, this error is not caught in the calling function `GenereteAIContent` in `app/dashboard/content/[template-slug]/page.tsx`, so it would propagate to the user as an unhandled promise rejection. The UI would remain in the loading state (`setLoading(false)` is never called on error), and the user would see a stuck spinner. There's no retry logic, no user-friendly error message, and no logging to track API failures. Rate limit errors (HTTP 429) and quota exceeded errors would be treated the same as network failures.

**Key talking points:**
- Basic error handling with `response.ok` check
- No try-catch in the calling function (error propagates to user)
- No differentiation between error types (rate limit vs. network failure)
- Missing: retry logic, exponential backoff, user-friendly error messages
- Missing: error logging/monitoring (e.g., Sentry, LogRocket)

**Follow-up the interviewer might ask:** How would you implement exponential backoff for rate limit errors?

---

### Q16: How is the SambaNova API key secured—where is it stored and how is it accessed?

**Difficulty:** Easy  
**Category:** SambaNova API

**Answer:**  
Looking at `app/actions.ts`, the API key is accessed via `process.env.SAMBANOVA_API_KEY` (note: the README mentions `NEXT_PUBLIC_SAMBANOVA_API_KEY`, but the code uses the non-public version). The key is stored in `.env.local` (listed in `.gitignore` to prevent committing to version control). Because `generateSambaNovaContent` is a server action (marked with `'use server'`), it runs on the server side only, so the API key is never exposed to the client. The function checks `if (!apiKey)` and throws an error if the key is missing, preventing the app from starting with invalid configuration. The key is passed in the `Authorization: Bearer ${apiKey}` header, which is the standard authentication method for OpenAI-compatible APIs.

**Key talking points:**
- API key stored in `.env.local` (not committed to Git)
- Server action ensures key is never sent to the client
- Environment variable validation prevents runtime errors
- Bearer token authentication follows OAuth 2.0 standards

**Follow-up the interviewer might ask:** How would you rotate the API key in production without downtime?

---

### Q17: Is there token limit management—does the code set max_tokens or handle context window limits?

**Difficulty:** Medium  
**Category:** SambaNova API

**Answer:**  
Looking at `app/actions.ts`, there is no `max_tokens` parameter in the request body. The API call only includes `stream`, `model`, and `messages`—no token limits, temperature, top_p, or other generation parameters. This means the model uses its default settings, which for Meta-Llama-3.1-8B-Instruct is typically a context window of 8,192 tokens and a max output of 2,048 tokens. There's no validation of input prompt length, so if a user submits a very long blog outline (e.g., 10,000 words), the API would return an error for exceeding the context window. The code doesn't handle this error gracefully—it would just show a generic error message. Additionally, there's no truncation logic to fit long prompts within the context window.

**Key talking points:**
- No `max_tokens` parameter (uses model defaults)
- No input validation for prompt length
- Meta-Llama-3.1-8B-Instruct has 8K context window
- Missing: token counting (e.g., using tiktoken library)
- Missing: prompt truncation for long inputs

**Follow-up the interviewer might ask:** How would you implement token counting to prevent context window errors?

---

### Q18: Walk me through the exact steps to add a new template to the system.

**Difficulty:** Easy  
**Category:** SambaNova API

**Answer:**  
To add a new template, I would:

1. **Add template object to `app/(data)/Templates.tsx`:**
```typescript
{
  name: 'LinkedIn Post',
  desc: 'Generate professional LinkedIn posts with hashtags',
  category: 'Social Media',
  icon: 'https://cdn-icons-png.flaticon.com/128/174/174857.png',
  aiPrompt: 'Generate a professional LinkedIn post based on the topic. Include relevant hashtags and format with <p> tags.',
  slug: 'linkedin-post-generator',
  form: [
    {
      label: 'Enter your post topic',
      field: 'input',
      name: 'topic',
      required: true
    },
    {
      label: 'Key points to include (optional)',
      field: 'textarea',
      name: 'keyPoints'
    }
  ]
}
```

2. **Test the template:** Navigate to `/dashboard/content/linkedin-post-generator` (the slug automatically creates the route via `[template-slug]`).

3. **No code changes needed:** The dynamic route in `app/dashboard/content/[template-slug]/page.tsx` automatically handles the new template by finding it in the `Templates` array using the slug.

**Key talking points:**
- Zero code changes outside of Templates.tsx
- The form fields are automatically rendered by `FormSection.tsx`
- The template card appears on the dashboard via `TemplateListSection.tsx`
- The slug must be unique and URL-safe (kebab-case)

**Follow-up the interviewer might ask:** How would you add template-specific validation logic (e.g., max character limits)?

---

