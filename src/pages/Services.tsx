import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export default function Services() {
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
      <main className="bg-black text-white flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] px-6 text-center">
        <img
          src="/twc-logo.png"
          alt="Tipple Works Co."
          className="w-[300px] md:w-[440px] lg:w-[560px] max-w-[86vw] h-auto mb-8"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleDeckClick} className="bg-white text-black rounded-full px-8 py-3.5 text-base">
            View Our Deck
          </button>
          <button onClick={handleShare} className="bg-white text-black rounded-full px-8 py-3.5 text-base">
            Share
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
