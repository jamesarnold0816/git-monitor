import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app-wrapper">
      <header>
        <img src="https://github.githubassets.com/favicons/favicon-dark.png" alt="GitHub" className="logo" />
        <h1 className="title">GitHub PR Monitor</h1>
      </header>
      <main>
        <App />
      </main>
      <footer>
        <p>Made with 💙 for GitHub users</p>
      </footer>
    </div>
  </React.StrictMode>,
) 