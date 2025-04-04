import React, { useState } from 'react'
import RepoForm from './components/RepoForm.tsx'
import PRResults from './components/PRResults.tsx'
import { PRAuthor } from './types.ts'
import { fetchFailedPRAuthors } from './services/github.ts'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<PRAuthor[]>([])

  const handleFormSubmit = async (owner: string, repo: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchFailedPRAuthors(owner, repo)
      setResults(data)
      if (data.length === 0) {
        setError('No failed PRs found for this repository. This could be because the repository doesn\'t have any failed PRs, or the GitHub API rate limit has been reached.')
      }
    } catch (err) {
      console.error('Error fetching PR data:', err)
      if (err instanceof Error) {
        if (err.message.includes('403')) {
          setError('GitHub API rate limit exceeded or authentication failed. Try adding a GitHub token in the .env file.')
        } else if (err.message.includes('404')) {
          setError('Repository not found. Please check the owner and repo name.')
        } else {
          setError(`Error: ${err.message}`)
        }
      } else {
        setError('An unknown error occurred')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>GitHub PR Monitor</h1>
      <p>Enter a GitHub repository to find contributors with failed PRs</p>
      
      <RepoForm onSubmit={handleFormSubmit} isLoading={loading} />
      
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading results...</div>
      ) : (
        results.length > 0 && <PRResults results={results} />
      )}
    </div>
  )
}

export default App 