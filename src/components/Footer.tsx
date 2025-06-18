import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function About() {
  return (
    <div className="bg-white text-black">
      <Navbar />

      {/* Hero personality line */}
      <section className="bg-[#4F00FF] text-white py-28 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-light leading-snug max-w-5xl mx-auto">
          Straightforward. Warm. Curious. Electric.
        </h1>
      </section>

      {/* Big ideas intro */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <h2 className="text-7xl font-light text-[#4F00FF]">BIG<span className="text-black">ideas.</span></h2>
        <div className="text-lg space-y-6">
          <p>In a chaotic world, great brands can be ignored. We’re here to help.</p>
          <p>
            We switch brands on by understanding how they connect with people. Some call it research; we call it rigorous naivety. Exploring without arrogance or assumption to build a genuine picture of the real world.
          </p>
          <p>So we can unearth insights that help awaken brand potential.</p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-light mb-6">Our mission is to <span className="font-normal">awaken potential.</span></h2>
          <p className="text-lg text-gray-700 mb-4">
            Our creativity ignites powerful brand ideas. Helping great brands to be seen and heard. To become and remain relevant for generations to come.
          </p>
          <p className="text-lg text-gray-700">
            We bring brilliant brands closer to their audience by hiring great people. Letting them flourish. Giving them the freedom to unleash their own potential.
          </p>
        </div>
        <img
          src="/lovable-uploads/people-talking.jpg" // replace with your actual team image
          alt="Team collaborating"
          className="rounded-xl shadow-xl"
        />
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-semibold mb-12">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
          {[
            { name: "Rohan Dhirwani", role: "Founder & CEO", image: "/lovable-uploads/team-rohan.png" },
            { name: "John Doe", role: "Creative Lead", image: "/lovable-uploads/team-john.png" },
            { name: "Jane Smith", role: "Head of Strategy", image: "/lovable-uploads/team-jane.png" },
            { name: "Alicia", role: "Senior Designer", image: "/lovable-uploads/team-alicia.png" },
          ].map((person, idx) => (
            <div key={idx} className="text-center">
              <img
                src={person.image}
                alt={person.name}
                className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
              />
              <h3 className="text-lg font-medium text-[#4F00FF]">{person.name}</h3>
              <p className="text-sm text-gray-600">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-6 text-center">
        <button className="inline-flex items-center border border-[#4F00FF] text-[#4F00FF] rounded-full px-8 py-4 text-lg font-medium hover:bg-[#4F00FF] hover:text-white transition">
          Come join the team
          <span className="bg-[#4F00FF] text-white rounded-full w-10 h-10 flex items-center justify-center ml-4">
            →
          </span>
        </button>
      </section>

      <Footer />
    </div>
  );
}
