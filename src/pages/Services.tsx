import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { TwcLockup } from "@/components/brand/TwcLockup";
import { usePointerVars } from "@/components/brand/usePointerVars";

export default function Services() {
  const stageRef = usePointerVars<HTMLElement>();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tipple Works Co.",
          text: "Check out Tipple Works Co.",
          url: "https://tippleworks.com/services",
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      navigator.clipboard.writeText("https://tippleworks.com/services");
      alert("Link copied to clipboard");
    }
  };

  const handleDeckClick = () => {
    window.open("https://drive.google.com/drive/folders/1oD8mWzAWKjpeHTk4_hvnyQf23eSE8Tuk", "_blank");
  };

  return (
    <>
      <Navbar />
      <CustomCursor />
      <main
        ref={stageRef}
        className="bg-black text-white flex flex-col justify-center items-center min-h-screen px-6 text-center"
      >
        <TwcLockup className="w-[88vw] max-w-[760px] mb-10" />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDeckClick}
            className="bg-white text-black rounded-full px-8 py-3.5 text-base transition-transform duration-500 hover:scale-[1.02]"
          >
            View Our Deck
          </button>
          <button
            onClick={handleShare}
            className="bg-white text-black rounded-full px-8 py-3.5 text-base transition-transform duration-500 hover:scale-[1.02]"
          >
            Share
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
