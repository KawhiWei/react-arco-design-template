import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

document.body.setAttribute('arco-theme', 'dark');
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
