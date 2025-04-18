import Image from "next/image";
import Navbar from "./Custom/Flexsteel-Navbar";
import Footer from "./Custom/Flexsteel-Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="text-5xl">Hello</div>
    <Footer />
    </>
  );
}
