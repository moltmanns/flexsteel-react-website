import Navbar from "./Custom/Flexsteel-Navbar";
import FlexsteelFooter from "./Custom/Flexsteel-Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="text-5xl">Hello</div>
      </main>
      <FlexsteelFooter />
    </div>
  );
}
