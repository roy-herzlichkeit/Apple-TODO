import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionContext'
import { ErrorBoundary } from './components/ui'
import './styles.css'
import App from './App.jsx'

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-xl">Loading...</div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <TransitionProvider>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </TransitionProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
