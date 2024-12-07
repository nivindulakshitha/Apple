import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppWithProfiler from './App.jsx'

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://f7509c0211d038c2b7e484f79a4f0d4a@o4507900182331392.ingest.us.sentry.io/4508423948271616",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect
    }),
    Sentry.replayIntegration(),
  ],
  
  tracesSampleRate: 1.0, 
  
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0, 
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWithProfiler />
  </StrictMode>,
)
