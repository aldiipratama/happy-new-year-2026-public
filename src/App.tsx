import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Countdown } from "./pages/Countdown";
import { Moment } from "./pages/Moment";
import { Welcome } from "./pages/Welcome";
import { AudioProvider } from "./context/AudioContext";
import { InteractionProvider } from "./context/InteractionContext";
import { FlowProvider } from "./context/FlowContext";
import { AppLayout } from "./layout/AppLayout";
import { FlowGuard } from "./components/FlowGuard";

function App() {
  return (
    <FlowProvider>
      <InteractionProvider>
        <AudioProvider src="/backsound.mp3" volume={0.25}>
          <BrowserRouter>
            <AppLayout>
              <FlowGuard>
                <Routes>
                  <Route path="/" element={<Countdown />} />
                  <Route path="/moment" element={<Moment />} />
                  <Route path="/welcome" element={<Welcome />} />
                </Routes>
              </FlowGuard>
            </AppLayout>
          </BrowserRouter>
        </AudioProvider>
      </InteractionProvider>
    </FlowProvider>
  );
}

export default App;
