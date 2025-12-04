import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SearchContext from './Components/SearchContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Contexts from './Components/Contexts.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SearchContext>
      <Contexts>
        <App />
      </Contexts>
    </SearchContext>
    </BrowserRouter>
    
  </StrictMode>,
)
