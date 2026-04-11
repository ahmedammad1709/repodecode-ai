Build a full-stack web application called "ReadForge" — an AI-powered README 
generator that connects with GitHub and automatically generates beautiful, 
structured READMEs for every repository.

=============================================================
🎨 DESIGN PHILOSOPHY — MOST IMPORTANT
=============================================================

The UI must NOT look like a generic AI tool. It should feel like a 
premium developer tool — dark, sleek, and powerful, inspired by GitHub's 
design language (dark backgrounds, green accents, monospace fonts for code).

Design Rules:
- Dark theme as default (#0d1117 background like GitHub)
- Accent color: Bright green (#00ff88) or electric blue (#4493f8)
- Font: Inter for body, JetBrains Mono for code/markdown areas
- Glassmorphism cards with subtle borders (#30363d)
- Smooth micro-animations on hover, click, page transitions
- NO generic gradients. NO cartoon illustrations. NO bubbly AI aesthetics
- Feels like: GitHub × Vercel × Linear — clean, sharp, professional
- Every button, card, badge must feel intentional and crafted
- Use subtle dot-grid or line-grid background patterns
- Icons from Lucide React only
- Responsive — mobile + desktop perfect

=============================================================
🌐 PAGE 1 — LANDING PAGE
=============================================================

NAVBAR:
- Logo left: ReadForge (with a small forge/lightning icon)
- Links: Features, How It Works, Pricing, Docs
- Right side: Login button (outlined) + "Connect GitHub" CTA (filled green)
- Sticky navbar with blur backdrop on scroll
- Active link underline animation

HERO SECTION:
- Bold headline (big, white):
  "Your Repos Deserve Better READMEs"
- Subheadline (gray):
  "Connect GitHub. Let AI scan your code. Get a perfect README in seconds."
- Two buttons: "Connect with GitHub" (green, GitHub icon) + "See Live Demo" (outlined)
- Below buttons: small trust text like "Free to start • No credit card • 2,400+ repos documented"
- Animated terminal/code window on the right showing a README being generated 
  line by line (typewriter effect)
- Subtle floating repo cards in background (parallax effect)

HOW IT WORKS (3 Steps):
- Step 1: Connect GitHub (plug icon)
- Step 2: AI Scans Your Repo (brain/scan icon)
- Step 3: README Generated Instantly (file-check icon)
- Each step is a dark card with a number, icon, title, description
- Connected by a dashed animated line between steps

FEATURES SECTION:
Title: "Everything your README needs"
Show 6 feature cards in a 3x2 grid:
1. Auto Tech Stack Detection — reads package.json, imports, configs
2. Smart Section Builder — installation, usage, contributing, license
3. README Health Score — rates your existing READMEs
4. One-Click Push to GitHub — no copy-paste needed
5. Version History — every generated README saved
6. Multi-Template Styles — minimal, detailed, startup, open-source
Each card: icon + title + short description, glassmorphism style

LIVE PREVIEW SECTION:
- Split screen — left: messy/empty README (blurred, red badge "Poor")
- Right: beautiful generated README (green badge "Excellent")
- Toggle button: "Before / After" slider or tab switch
- This is the most convincing section — make it beautiful

PRICING SECTION:
3 tiers side by side:
- Free: 5 READMEs/month, basic templates
- Pro ($9/mo): Unlimited READMEs, all templates, version history
- Team ($29/mo): Everything + team collaboration + admin dashboard
- Highlight "Pro" as most popular with a glowing border

TESTIMONIALS:
3 developer quote cards — profile photo circle (avatar), GitHub username, 
star rating, short quote about how it saved their time

FAQ SECTION:
6 collapsible accordion questions:
- Is it free to use?
- How does AI read my code?
- Can I edit the generated README?
- Is my code safe?
- Does it work with private repos?
- What languages are supported?

FOOTER:
- Logo + tagline
- Links: Product, Company, Legal
- GitHub icon link, Twitter/X link
- "Built for developers, by developers"
- Copyright 2025 ReadForge

=============================================================
🔐 PAGE 2 — AUTH PAGES
=============================================================

Login Page:
- Centered card, dark background
- "Welcome back to ReadForge" heading
- Big green button: "Continue with GitHub" (GitHub icon)
- Divider: "or"
- Email + Password fields (minimal, dark inputs)
- "Forgot password?" link
- "Don't have an account? Sign up"

Signup Page:
- Same layout
- "Start documenting your repos" heading  
- GitHub OAuth as primary CTA
- Name + Email + Password fields
- Terms checkbox
- Already have account link

=============================================================
📊 PAGE 3 — USER DASHBOARD
=============================================================

LAYOUT:
- Fixed left sidebar (dark, #0d1117)
- Top navbar with: search bar, notification bell, user avatar dropdown
- Main content area (slightly lighter: #161b22)

SIDEBAR ITEMS (with icons):
- Overview (home icon)
- My Repositories (git-branch icon)
- README Editor (file-edit icon)
- Health Scores (activity icon)
- Templates (layout icon)
- History (clock icon)
- GitHub Connection (github icon)
- Billing (credit-card icon)
- Settings (settings icon)
- Logout at bottom

---

TAB 1 — OVERVIEW:
- Welcome banner: "Good morning, [username] 👋"
- 4 stat cards in a row:
  * Total Repos Connected
  * READMEs Generated
  * Avg Health Score
  * This Month Usage
- Recent Activity feed (list of: repo name + action + time ago)
- Quick Action card: "Generate README" big button
- Top repos needing attention (health score < 50%)

TAB 2 — MY REPOSITORIES:
- Search bar + filter dropdown (by language, status, stars)
- Repository cards in a grid (like GitHub's repo list):
  * Repo name (bold, clickable)
  * Description (gray)
  * Language badge (colored dot)
  * Stars count
  * README Status badge: ✅ Good / ⚠️ Needs Work / ❌ Missing
  * Health score progress bar
  * Button: "Generate README" or "Regenerate"
- Pagination or infinite scroll

TAB 3 — README EDITOR:
- Split screen layout (50/50):
  * Left: Monaco-style markdown editor (dark, syntax highlighted)
  * Right: Live rendered preview of markdown
- Top toolbar:
  * Template selector dropdown
  * Section toggles (checkboxes for each section)
  * AI Improve button (sparkle icon)
  * Push to GitHub button (green, prominent)
  * Download .md button
- AI Suggestions panel (collapsible right drawer):
  * "Missing: Installation section"
  * "Consider adding: Screenshots"
  * Each suggestion has "Add" button
- Bottom status bar: word count, section count, health score

TAB 4 — README HEALTH SCORE:
- Select repo dropdown at top
- Big circular score (like a speedometer) — color coded:
  * 0-40: Red (Poor)
  * 41-70: Yellow (Average)  
  * 71-100: Green (Excellent)
- Section-by-section breakdown:
  * Title ✅ | Description ⚠️ | Installation ❌ | Usage ✅ | etc.
  * Each row: section name + score bar + status icon
- AI Recommendations list:
  * "Add a Usage section with code examples (+15 pts)"
  * "Include a license badge (+5 pts)"
- "Auto-Fix All" button (green, prominent)

TAB 5 — TEMPLATES:
- Grid of template cards (4 per row):
  * Template name
  * Preview thumbnail (README preview in tiny)
  * Tags: Minimal / Detailed / Startup / Open Source
  * "Use Template" button
  * "Preview" button (opens modal)
- Active template has a green glowing border
- "Create Custom Template" button at top right

TAB 6 — HISTORY & VERSIONS:
- Select repo from dropdown
- Timeline of all generated READMEs:
  * Date + time
  * Version number (v1, v2, v3...)
  * Template used
  * Health score at time
  * Buttons: "View" | "Restore" | "Compare"
- Compare mode: side-by-side diff view (green = added, red = removed)

TAB 7 — GITHUB CONNECTION:
- Connected account card:
  * GitHub avatar + username + email
  * "Connected ✅" green badge
  * Last synced time
  * "Sync Repos" button
  * "Disconnect" button (red, outlined)
- Repo access section:
  * Toggle: Public repos only / Include private repos
  * List of authorized repos with checkboxes

TAB 8 — BILLING:
- Current plan card (highlighted based on active plan)
- Usage bar: "3 of 5 READMEs used this month" (free plan)
- Upgrade CTA section (if on free plan)
- Plan comparison table
- Payment method card (if Pro/Team)
- Invoice history table: Date | Amount | Status | Download

TAB 9 — SETTINGS:
- Profile section: Name, email, avatar upload
- Preferences: Default template, default language
- Notifications: Email alerts toggles
- Danger Zone section (red border card):
  * "Delete all READMEs" button
  * "Disconnect GitHub" button
  * "Delete Account" button

=============================================================
🛡️ PAGE 4 — ADMIN DASHBOARD
=============================================================

Separate layout from user dashboard. More data-dense.

SIDEBAR ITEMS:
- Analytics (bar-chart icon)
- User Management (users icon)
- Subscriptions (credit-card icon)
- AI Usage Monitor (cpu icon)
- Feedback & Reports (message-square icon)
- Template Manager (layout icon)
- System Logs (terminal icon)

TAB 1 — ANALYTICS:
- Line chart: Users over time
- Bar chart: READMEs generated per day
- Pie chart: Plan distribution (Free/Pro/Team)
- Stat cards: Total Users | Active Today | Revenue MTD | Churn Rate
- Geographic map of user locations (optional)

TAB 2 — USER MANAGEMENT:
- Searchable, filterable data table
- Columns: Avatar | Name | Email | Plan | Repos | READMEs | Joined | Actions
- Actions: View Profile | Ban User | Delete User
- Bulk actions: Export CSV, Send Email, Ban Selected

TAB 3 — SUBSCRIPTIONS:
- Active subscriptions table
- Revenue chart (monthly)
- Failed payments list with retry button
- Subscription stats: MRR, ARR, Churn

TAB 4 — AI USAGE MONITOR:
- API calls today / this month
- Cost tracker ($X spent this month)
- Avg response time
- Error rate chart
- Most expensive users list

TAB 5 — FEEDBACK & REPORTS:
- README quality ratings from users (star distribution chart)
- Recent feedback table: User | Repo | Rating | Comment | Date
- Bug reports list with status (Open/Resolved)
- Feature request voting board

TAB 6 — TEMPLATE MANAGER:
- List all global templates
- Add New Template button → opens editor modal
- Edit / Delete / Set as Default actions per template

=============================================================
🗄️ DATABASE — SUPABASE
=============================================================

Tables to create:
- users (id, email, name, avatar_url, github_username, 
  github_access_token, plan, created_at)
- repos (id, user_id, github_repo_id, name, description, 
  language, stars, is_private, last_synced)
- readmes (id, repo_id, user_id, content, template_id, 
  health_score, version, created_at)
- templates (id, name, style_type, structure_json, 
  is_global, created_by, created_at)
- subscriptions (id, user_id, plan_type, status, 
  stripe_subscription_id, expires_at)
- feedback (id, user_id, readme_id, rating, comment, created_at)
- admin_logs (id, admin_id, action, target_user_id, 
  details, created_at)

Enable Row Level Security on all tables.
Use Supabase Auth with GitHub OAuth provider.

=============================================================
🛠️ TECH STACK
=============================================================

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS + shadcn/ui components
- Database: Supabase (PostgreSQL + Auth + Storage)
- Auth: Supabase GitHub OAuth
- AI: Claude API for README generation
- GitHub Data: GitHub REST API v3
- Markdown Editor: react-md-editor or Monaco Editor
- Charts: Recharts (for admin dashboard)
- Payments: Stripe
- Deployment: Vercel
- Icons: Lucide React only

=============================================================
⚙️ CORE AI FEATURE — README GENERATION LOGIC
=============================================================

When user clicks "Generate README" for a repo:
1. Fetch repo data via GitHub API:
   - File tree (folder structure)
   - package.json / requirements.txt / pom.xml (dependencies)
   - Existing README (if any)
   - Primary language
   - Repo description, stars, topics
2. Send all this context to Claude API with a prompt to generate:
   - Project title with badges
   - Description
   - Tech stack (auto-detected)
   - Prerequisites
   - Installation steps
   - Usage with code examples
   - Folder structure tree
   - Contributing guide
   - License
3. Stream the response into the editor in real-time
4. Calculate health score based on sections present
5. Save to Supabase readmes table

=============================================================
🎯 FINAL NOTES FOR LOVABLE
=============================================================

- Every page must be pixel perfect and feel premium
- Loading states: use skeleton loaders, never spinners alone
- Empty states: beautiful illustrations with helpful CTAs
- Error states: friendly error messages with retry options
- Toast notifications for all actions (success/error)
- Keyboard shortcuts where relevant
- The overall feel: GitHub × Vercel × Notion = ReadForge
- Make developers fall in love with this tool the moment 
  they land on the page
- This should look like a $99/month SaaS, not a hackathon project