import App from "@/components/App";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Navbar />
      <App />
    </div>
  )
}
