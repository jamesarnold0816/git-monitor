import React from 'react';
import { PRAuthor } from '../types';

interface PRResultsProps {
  results: PRAuthor[];
}

const PRResults: React.FC<PRResultsProps> = ({ results }) => {
  return (
    <div className="pr-results">
      <h2>Failed PR Contributors</h2>
      
      {results.length === 0 ? (
        <p>No failed PRs found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>GitHub Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Commit SHA</th>
            </tr>
          </thead>
          <tbody>
            {results.map((author) => (
              <tr key={`${author.commit}`}>
                <td>
                  <a 
                    href={`https://github.com/${author.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {author.github}
                  </a>
                </td>
                <td>{author.full_name}</td>
                <td>{author.email}</td>
                <td>
                  <code>{author.commit.slice(0, 7)}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PRResults; 