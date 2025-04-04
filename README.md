# GitHub PR Monitor

A React application that monitors GitHub repositories to identify contributors with failed pull requests.

## Features

- Search for any GitHub repository by entering the owner/repo or full URL
- Displays failed pull requests with contributor information
- Shows GitHub usernames, full names, emails, and commit information
- Modern, responsive UI with a bright theme

## Tech Stack

- React
- TypeScript
- Vite
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- GitHub API token (optional, but recommended to avoid rate limits)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/jamesarnold0816/git-monitor.git
   cd git-monitor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your GitHub token:
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

## Usage

1. Enter a GitHub repository in one of these formats:
   - `owner/repo` (e.g., facebook/react)
   - Full URL (e.g., https://github.com/facebook/react)
   
2. Click "Fetch Failed PRs" to see the results

## License

MIT