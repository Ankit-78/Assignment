🎨 Infinite Scroll Masonry Gallery

A responsive, visually clean infinite-scroll gallery built with ReactJS + Tailwind CSS.
It renders a masonry-style layout of images & videos with smooth infinite scrolling and route-based content fetching.

🚀 Features

Masonry Layout
Responsive grid that balances items by their aspect ratios for a polished creative-gallery feel.

Infinite Scrolling
Automatic background fetching of new content as the user scrolls—no visible “loading” jumps.

Skeleton Loaders
Graceful skeleton placeholders for both the initial load and while fetching more data.

Routing & Dynamic Pages

Click on any video to navigate to /g/{generation_id}.

Supports direct deep-link access (e.g. opening /g/123 in a new tab).

State & Data Management

Uses React Query for caching, synchronization, and pagination.

Dummy API with offset & limit simulates real-world requests.

🛠 Tech Stack

React 18 – Functional components with Hooks

React Router v6 – Client-side routing

React Query – Data fetching & caching

Tailwind CSS – Utility-first styling

Intersection Observer – Detects scroll position for infinite loading

# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git

# 2️⃣ Navigate into the project folder
cd <repo-name>

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm start
