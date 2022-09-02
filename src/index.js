import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './apps/App'

// Armazena uma referência de DOM virtual para efetuar as renderização
const root = ReactDOM.createRoot(document.getElementById('root'))

// Aplica as renderização, alterando o arquivo index.hml na pasta public
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)