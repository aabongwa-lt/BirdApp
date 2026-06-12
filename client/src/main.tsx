import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import BirdsDashboard from "./Birds/page.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path={"/"} element={<App/>}/>
              <Route path={"/birds"} element={<BirdsDashboard/>}/>
          </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)
