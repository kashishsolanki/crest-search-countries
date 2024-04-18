# Crest Data Systems - Search Countries Practical

This is a completed practical test for Crest Data Systems Interview Round 1, which is developed with react and typescript along with vite. Also had API integration for [REST Countries API](https://restcountries.com/). I'm adding all details about features and tech stack I have used and also how we can setup and test this application in local.

### Features
- SearchBox with debounce to wait until user finish typing
- Table with Pagination and Sorting
- API Integration
- No/minimum use of third party API or tool integration to make it raw and clean.
- Handled edge cases

### Tech Stacks
- React
- Typescript
- Vite
- Eslint
- React Hooks
- Tailwind CSS
- Vite TsConfig Paths

### Prerequisites

- Node.js( > v18.17.0) and npm (or yarn) installed on your system.

### Installation

1. Clone the repository:
```
git clone <repo_url>
```
2. Navigate into the repository:
```
cd crest-search-countries
```
3. Install Dependencies:
```
npm install
# or
yarn install
```

### Run the application
```
npm run dev
# or
yarn dev
```
- Visit http://localhost:5173 in your browser to view the application.

### Linting and Formatting
This project uses ESLint for linting and code formatting. To run linting scripts, use the following commands:
```
# Run ESLint
npm run lint
# or
yarn lint
```

### Package description

- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "typescript": "^5.2.2",
- "vite": "^5.2.0"
