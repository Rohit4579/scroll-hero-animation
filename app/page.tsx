import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Extra section to enable scroll */}
      <section className="h-[200vh] flex items-center justify-center bg-black">
        <h2 className="text-gray-500 text-2xl">
          Scroll Back Up
        </h2>
      </section>
    </>
  );
}