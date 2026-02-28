import React from "react";
import { Award, Diamond, Users, Gem, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">About Shiv Gems</h1>
            <p className="text-xl">A Legacy of Brilliance Since 2002</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">A Legacy of Brilliance</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2002 and carried forward by three generations of artisans, Shiv Gems has evolved 
                from a humble family business into a **trusted name in the diamond industry**. Our expertise 
                spans across **natural diamonds, lab-grown diamonds, and certified diamonds**, blending time-honored 
                craftsmanship with modern innovation.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">20+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100K+</div>
                  <div className="text-gray-600">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">Certified</div>
                  <div className="text-gray-600">Ethically Sourced</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1600267185393-e158a98703de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Diamond crafting"
                className="rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Diamond selection"
                className="rounded-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Offerings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Expertise & Diverse Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <Diamond className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Natural Diamonds</h3>
              <p className="text-gray-600">
                Expertly polished diamonds, ranging from -00 to 15 carats, with unmatched brilliance.
              </p>
            </div>
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lab-Grown Diamonds</h3>
              <p className="text-gray-600">
                Eco-friendly, sustainable alternatives crafted with precision and ethical sourcing.
              </p>
            </div>
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
              <Gem className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Diamonds</h3>
              <p className="text-gray-600">
                Independently verified for authenticity, superior craftsmanship, and ethical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diamond Collection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Round Brilliant",
              "Princess Cut",
              "Cushion Cut",
              "Emerald Cut",
              "Asscher Cut",
              "Oval Cut",
              "Marquise Cut",
              "Pear Cut",
              "Heart Shape",
              "Radiant Cut",
              "Baguette & Trillion Cuts",
            ].map((cut, index) => (
              <div
                key={index}
                className="p-4 text-center bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-700">{cut}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Excellence */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Commitment to Excellence & Ethics</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            At Shiv Gems, we uphold the highest standards of sustainability, ethical sourcing, and quality. Our mission is 
            to make luxury **inclusive, ethical, and accessible**, ensuring every piece not only shines but also carries 
            integrity and responsibility.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            "Diamonds for Everyone"—we envision a future where luxury is inclusive and accessible. Whether you seek a timeless 
            classic or a modern twist, Shiv Gems transforms dreams into radiant realities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
