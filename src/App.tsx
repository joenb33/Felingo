import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeechProvider } from "@/context/SpeechContext";
import { Header } from "@/components/layout/Header";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { HomePage } from "@/pages/HomePage";
import { SessionPage } from "@/pages/SessionPage";
import { PanicPage } from "@/pages/PanicPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { DisclaimerPage } from "@/pages/DisclaimerPage";
import { Footer } from "@/components/layout/Footer";

export function App() {
  return (
    <ErrorBoundary>
      <SpeechProvider>
        <BrowserRouter>
          <div className="flex min-h-dvh flex-1 flex-col">
            <Header />
            <div className="flex min-h-0 flex-1 flex-col">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/session/:section" element={<SessionPage />} />
                <Route path="/panic" element={<PanicPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </SpeechProvider>
    </ErrorBoundary>
  );
}
