import { motion } from "motion/react";
import gregoryLake from "./Experienceplace/Gregorylake.jpg";
import victoriaPark from "./Experienceplace/victoriapark.jpg";
import pedroTeaEstate from "./Experienceplace/pedroteastate.jpg";
import bomburuElla from "./Experienceplace/bomburuella.jpg";
import pidurutalagala from "./Experienceplace/piduruthalagala.jpg";
import shanthipura from "./Experienceplace/Shanthipura.jpg";
import kandeEla from "./Experienceplace/kandeela.jpg";
import seethaAmman from "./Experienceplace/seethakovila.jpg";
import hortonPlains from "./Experienceplace/hortanplace.jpg";

const experiences = [
  {
    title: "Gregory Lake",
    desc: "Enjoy boat rides, lakeside walks, and breathtaking mountain views at Nuwara Eliya's most iconic attraction.",
    image: gregoryLake,
    link: "https://en.wikipedia.org/wiki/Lake_Gregory_(Nuwara_Eliya)"
  },
  {
    title: "Victoria Park",
    desc: "A beautifully landscaped park famous for colorful flower gardens, birdwatching, and peaceful strolls.",
    image: victoriaPark,
    link: "https://en.wikipedia.org/wiki/Victoria_Park,_Nuwara_Eliya"
  },
  {
    title: "Pedro Tea Estate",
    desc: "Discover the art of Ceylon tea production while exploring scenic tea plantations and factory tours.",
    image: pedroTeaEstate,
    link: "https://www.google.com/search?q=pedro+tea+estate+wikipedia&sca_esv=25795b5d4f09c1a9&biw=1536&bih=674&sxsrf=ANbL-n4o3JX-0ceRTP3TIYfK2Oe525_avw%3A1780582424377&ei=GIghaoDSFruuseMP-bCX2Q4&oq=Pedro+Tea+Estate+wiki&gs_lp=Egxnd3Mtd2l6LXNlcnAiFVBlZHJvIFRlYSBFc3RhdGUgd2lraSoCCAAyBhAAGBYYHjIIEAAYgAQYogQyBRAAGO8FMgUQABjvBTIIEAAYgAQYogQyCBAAGIAEGKIESOQWUMUBWKMScAF4AJABAJgB6wGgAfoJqgEDMi02uAEByAEA-AEBmAIGoALQCMICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIIEAAYgAQYywGYAwCIBgGQBgqSBwUxLjAuNaAHmBmyBwMyLTW4B8sIwgcFMC4yLjTIBxWACAE&sclient=gws-wiz-serp"
  },
  {
    title: "Bomburu Ella Falls",
    desc: "Sri Lanka's widest waterfall, surrounded by lush forests and scenic hiking trails.",
    image: bomburuElla,
    link: "https://en.wikipedia.org/wiki/Bomburu_Ella"
  },
  {
    title: "Pidurutalagala",
    desc: "Visit Sri Lanka's highest mountain peak and enjoy spectacular panoramic views of the hill country.",
    image: pidurutalagala,
    link: "https://en.wikipedia.org/wiki/Pidurutalagala"
  },
  {
    title: "Shanthipura View Point",
    desc: "Experience stunning sunrise and sunset views from Sri Lanka's highest village.",
    image: shanthipura,
    link: "https://www.google.com/search?q=shanthipura+view+point+wikipedia&biw=1536&bih=674&sca_esv=25795b5d4f09c1a9&sxsrf=ANbL-n42VZueTdON5y3zKA-f5cJYWMyJ5Q%3A1780582621036&ei=3Yghaqz9AaCjseMP45WBwAk&oq=Shanthipura+View+Point+wiki&gs_lp=Egxnd3Mtd2l6LXNlcnAiG1NoYW50aGlwdXJhIFZpZXcgUG9pbnQgd2lraSoCCAAyBRAhGKABMgUQIRigAUjtGFC0A1i7FHABeAGQAQCYAf4BoAG0CKoBBTAuMS40uAEByAEA-AEBmAIGoALJCMICChAAGEcY1gQYsAPCAg0QABiABBiKBRhDGLADwgIIEAAYgAQYywHCAgYQABgWGB7CAgUQABjvBcICCBAAGIAEGKIEmAMAiAYBkAYKkgcFMS4xLjSgB5IPsgcFMC4xLjS4B8UIwgcFMC41LjHIBwyACAE&sclient=gws-wiz-serp"
  },
  {
    title: "Kande Ela Reservoir",
    desc: "A tranquil escape featuring picturesque waters, surrounding hills, and peaceful natural scenery.",
    image: kandeEla,
    link: "https://www.google.com/search?q=Kande+Ela+Reservoir&biw=1536&bih=674&sca_esv=25795b5d4f09c1a9&sxsrf=ANbL-n5VFcCCUlXdfuHY2hqd-gVhiHeNAA%3A1780582628995&ei=5Ighaq64PJ6gnesPm8aHsA0&ved=0ahUKEwiuuuCY4-2UAxUeUGcHHRvjAdYQ4dUDCBA&uact=5&oq=Kande+Ela+Reservoir&gs_lp=Egxnd3Mtd2l6LXNlcnAiE0thbmRlIEVsYSBSZXNlcnZvaXIyBxAAGIAEGBMyCBAAGBYYHhgTMggQABgWGB4YEzIIEAAYFhgeGBMyCBAAGBYYHhgTMggQABgWGB4YEzIIEAAYgAQYogQyCBAAGIAEGKIEMgUQABjvBTIIEAAYgAQYogRIiBZQ1w5Y1w5wAXgBkAEAmAGMAqABjAKqAQMyLTG4AQPIAQD4AQL4AQGYAgKgApkCwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHBTEuMC4xoAepBbIHAzItMbgHkwLCBwMyLTLIBwiACAE&sclient=gws-wiz-serp"
  },
  {
    title: "Seetha Amman Temple",
    desc: "A sacred Hindu temple associated with the Ramayana legend and surrounded by beautiful landscapes.",
    image: seethaAmman,
    link: "https://en.wikipedia.org/wiki/Seetha_Amman_Temple"
  },
  {
    title: "Horton Plains National Park",
    desc: "Explore dramatic cliffs, cloud forests, and the famous World's End viewpoint.",
    image: hortonPlains,
    link: "https://en.wikipedia.org/wiki/Horton_Plains_National_Park"
  }
];

export function Experiences() {
  return (
    <section className="py-24 bg-[#121212] text-[#F9F6F0]" id="experiences">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h4 className="text-[#D4AF37] font-['Montserrat'] tracking-widest uppercase text-sm mb-4">Discover Sri Lanka</h4>
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display']">Nearby Attractions</h2>
          </div>
          <button className="mt-6 md:mt-0 text-[#F9F6F0] border-b border-[#D4AF37] pb-1 font-['Montserrat'] text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
            View All Places
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <motion.a
              key={idx}
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer block"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-['Playfair_Display'] text-white mb-2">{exp.title}</h3>
                <p className="text-white/70 font-['Montserrat'] text-sm font-light opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {exp.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
