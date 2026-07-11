import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import QrCodeTool from "@/pages/QrCodeTool";
import ImageTools from "@/pages/ImageTools";
import TextTools from "@/pages/TextTools";
import DevTools from "@/pages/DevTools";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr-code" element={<QrCodeTool />} />
            <Route path="/image-tools" element={<ImageTools />} />
            <Route path="/text-tools" element={<TextTools />} />
            <Route path="/dev-tools" element={<DevTools />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}