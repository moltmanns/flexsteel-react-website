import Navbar from "./Custom/Flexsteel-Navbar";
import FlexsteelFooter from "./Custom/Flexsteel-Footer";
import HeroSection from "./Custom/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <FlexsteelFooter />
    </div>
  );
}
