# Countries Explorer (React + Vite)

A simple countries browser with search, region filter, dark mode, country detail pages, and basic caching.

## Features
- Search by country name and capital (debounced input)
- Filter by region
- Country detail page with borders list and key facts
- Dark mode toggle
- Infinite scroll (“load more” on scroll)
- Loading spinners and friendly error states
- In-memory caching of `data.json` to reduce refetches

## Tech Stack
- React (Vite)
- React Router
- Tailwind CSS
- Framer Motion (page transitions)
- Local data: `public/data.json` (REST Countries dataset)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install
npm install### Run dev server
npm run devOpen the printed local URL (typically http://localhost:5173).

### Build
npm run build### Preview production build
npm run preview### Lint
npm run lint## Project Structure (key files)
- `src/App.jsx` — routes, layout, dark mode state, page transitions
- `src/SearchArea.jsx` — search input + region filter
- `src/Countries.jsx` — list page with search/filter, result count, infinite scroll
- `src/CountryDetail.jsx` — detail page per country (borders, currencies, languages, etc.)
- `src/utils/countryCache.js` — simple in-memory cache for `data.json`
- `src/Spinner.jsx` — loading indicator
- `public/data.json` — country dataset

## Data & Caching
- Data is loaded from `public/data.json`.
- `countryCache.js` caches the data in memory and refreshes after a short duration to avoid repeated fetches.

## Accessibility & UX
- Dark mode toggle is a keyboard-accessible button.
- Visible focus styles on interactive elements (configurable).
- Cards are links for keyboard navigation (Tab + Enter).
- Friendly empty/error states and retry buttons.

## Styling & Animations
- Tailwind utility classes.
- Framer Motion for page transitions.
- Custom spinners for loading states.

## Deployment
- Build with `npm run build`; deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## TODO / Ideas
- Persist cache in `localStorage`
- Add favorites/bookmarks
- Add sorting (name/population/area)
- Add map view or richer detail data
- Improve accessibility further (skip links, ARIA labels)

## License
Add your preferred license (e.g., MIT) if desired.

## Deploying your project

As mentioned above, there are many ways to host your project for free. Our recommended hosts are:

- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

You can host your site using one of these solutions or any of our other trusted providers. [Read more about our recommended and trusted hosts](https://medium.com/frontend-mentor/frontend-mentor-trusted-hosting-providers-bf000dfebe).

## Create a custom `README.md`

We strongly recommend overwriting this `README.md` with a custom one. We've provided a template inside the [`README-template.md`](./README-template.md) file in this starter code.

The template provides a guide for what to add. A custom `README` will help you explain your project and reflect on your learnings. Please feel free to edit our template as much as you like.

Once you've added your information to the template, delete this file and rename the `README-template.md` file to `README.md`. That will make it show up as your repository's README file.

## Submitting your solution

Submit your solution on the platform for the rest of the community to see. Follow our ["Complete guide to submitting solutions"](https://medium.com/frontend-mentor/a-complete-guide-to-submitting-solutions-on-frontend-mentor-ac6384162248) for tips on how to do this.

Remember, if you're looking for feedback on your solution, be sure to ask questions when submitting it. The more specific and detailed you are with your questions, the higher the chance you'll get valuable feedback from the community.

## Sharing your solution

There are multiple places you can share your solution:

1. Share your solution page in the **#finished-projects** channel of the [community](https://www.frontendmentor.io/community). 
2. Tweet [@frontendmentor](https://twitter.com/frontendmentor) and mention **@frontendmentor**, including the repo and live URLs in the tweet. We'd love to take a look at what you've built and help share it around.
3. Share your solution on other social channels like LinkedIn.
4. Blog about your experience building your project. Writing about your workflow, technical choices, and talking through your code is a brilliant way to reinforce what you've learned. Great platforms to write on are [dev.to](https://dev.to/), [Hashnode](https://hashnode.com/), and [CodeNewbie](https://community.codenewbie.org/).

We provide templates to help you share your solution once you've submitted it on the platform. Please do edit them and include specific questions when you're looking for feedback. 

The more specific you are with your questions the more likely it is that another member of the community will give you feedback.

## Got feedback for us?

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please email hi@frontendmentor.io.

This challenge is completely free. Please share it with anyone who will find it useful for practice.

**Have fun building!** 🚀
