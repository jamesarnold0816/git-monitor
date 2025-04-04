import axios from 'axios';
import { PRAuthor } from '../types.ts';
// This import ensures TypeScript recognizes the env declaration
import '../vite-env.d.ts';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers = {
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
};

export async function fetchFailedPRAuthors(owner: string, repo: string): Promise<PRAuthor[]> {
    try {
    const prRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=30`, 
      { headers }
    );

    const contributors: PRAuthor[] = [];
    console.log(prRes);
    for (const pr of prRes.data) {
      if (pr.merged_at) continue;

      const sha = pr.head.sha;
      const statusRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/check-runs`, 
        { headers }
      );
      console.log(statusRes);
      const failed = statusRes.data.check_runs.some((check: any) => check.conclusion === 'failure');
      if (!failed) continue;

      // Get commit author info
      const commitRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, 
        { headers }
      );
      
      const author = commitRes.data.commit.author;

      contributors.push({
        github: pr.user.login,
        full_name: author.name,
        email: author.email,
        commit: sha,
        pr_number: pr.number,
      });
    }

    return contributors;
  } catch (error) {
    console.error('Error fetching PR authors:', error);
    throw error;
  }
} 
