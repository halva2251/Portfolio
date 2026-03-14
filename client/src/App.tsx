import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Personal from "./pages/Personal";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        {/* Ambient background blobs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.035] blur-[140px]"
            style={{
              background: "var(--color-accent)",
              top: "-5%",
              left: "-10%",
              animation: "drift1 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.025] blur-[120px]"
            style={{
              background: "#34d399",
              bottom: "-10%",
              right: "-8%",
              animation: "drift2 30s ease-in-out infinite",
            }}
          />
        </div>

        <Navbar />
        <main className="max-w-4xl mx-auto w-full px-6 py-4 flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(80px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.95); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-60px, 40px) scale(1.05); }
          66% { transform: translate(50px, -60px) scale(0.9); }
        }
      `}</style>
    </BrowserRouter>
  );
};

export default App;
