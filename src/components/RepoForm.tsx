import React, { useState, FormEvent } from 'react';

interface RepoFormProps {
  onSubmit: (owner: string, repo: string) => void;
  isLoading: boolean;
}

const RepoForm = ({ onSubmit, isLoading }: RepoFormProps) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const parseRepoUrl = (url: string): { owner: string; repo: string } | null => {
    // Handle full GitHub URLs
    const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubUrlRegex);
    
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace('.git', '')
      };
    }
    
    // Handle owner/repo format
    const simpleRegex = /^([^\/]+)\/([^\/]+)$/;
    const simpleMatch = url.match(simpleRegex);
    
    if (simpleMatch) {
      return {
        owner: simpleMatch[1],
        repo: simpleMatch[2].replace('.git', '')
      };
    }
    
    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    const parsedRepo = parseRepoUrl(repoUrl);
    
    if (!parsedRepo) {
      setError('Invalid repository format. Please use "owner/repo" or a GitHub URL.');
      return;
    }
    
    onSubmit(parsedRepo.owner, parsedRepo.repo);
  };

  return (
    <div className="repo-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="repoUrl">Repository URL or owner/repo</label>
          <input
            type="text"
            id="repoUrl"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="e.g., facebook/react or https://github.com/facebook/react"
            disabled={isLoading}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Failed PRs'}
        </button>
      </form>
    </div>
  );
};

export default RepoForm; 