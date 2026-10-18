import outdoor3 from "./Sources/outdoor3.jpg";
import living from "./Sources/living.jpg";
import dining_table from "./Sources/dining table.jpg";

export function About() {
  return (
    <section className="pt-14 md:pt-18 pb-6 md:pb-8 bg-white text-[#132E20]" id="house">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Lead-in with Scroll Reveal */}
        <div className="reveal max-w-2xl mb-8 md:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#1A432E] font-bold block mb-2">
            The Property &amp; Setting
          </span>
          <h2 className="font-['Newsreader'] text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Built for cool highland evenings, home cooking, and peaceful sleep.
          </h2>
        </div>

        {/* Asymmetric Content Block: Wide Photo + Text Column */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-8 md:mb-10">
          
          {/* Main Panorama Image (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-[#1A432E]/15 shadow-sm aspect-[16/10] bg-[#F4F8F5]">
              <img
                src={outdoor3}
                alt="Nalaka Rest private villa illuminated in the evening"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="font-['Newsreader'] italic text-xs text-[#4B6354] pl-1">
              Nalaka Rest illuminated on a cool Nuwara Eliya evening.
            </p>
          </div>

          {/* Real Story Text Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 pt-2">
            <div className="space-y-4 text-sm md:text-base text-[#4B6354] leading-relaxed">
              <p>
                Nuwara Eliya sits at 1,860 meters above sea level. It is cold here compared to the rest of the island — temperatures routinely dip below 14°C at night, and eucalyptus and pine perfume the air.
              </p>
              <p>
                We set up Nalaka Rest so you have an entire private house to yourself. Whether you are traveling as an extended Sri Lankan family or visiting the central hill country from abroad, the property gives you independence: your own gate, private parking, and no shared corridors.
              </p>
              <p>
                You can brew your own morning pot of tea in the kitchen, sit on the lawn while the mist moves through the valley, and spend quiet evenings together without the rush of a commercial hotel.
              </p>
            </div>

            {/* Host Note Box */}
            <div className="bg-[#F4F8F5] p-5 rounded-xl border-l-4 border-[#1A432E] space-y-1">
              <span className="font-['Newsreader'] text-base font-semibold text-[#132E20] block">
                A Note from the Host
              </span>
              <p className="text-xs text-[#4B6354] leading-relaxed">
                &ldquo;We live nearby and are always reachable on WhatsApp. If you need firewood, milk from the local dairy, or help finding a reliable tuk-tuk into Nuwara Eliya town, just let us know.&rdquo;
              </p>
            </div>
          </div>

        </div>

        {/* 2 Photographic Vignettes: Living Room & Dining with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#1A432E]/10 stagger-group">
          
          <div style={{ "--stagger-i": 0 } as React.CSSProperties} className="reveal-item space-y-3">
            <div className="rounded-xl overflow-hidden border border-[#1A432E]/15 aspect-[4/3] bg-[#F4F8F5]">
              <img
                src={living}
                alt="Main living room of Nalaka Rest with comfortable seating"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="font-['Newsreader'] text-xl font-medium text-[#132E20]">The Living Hall</h3>
            <p className="text-xs text-[#4B6354] leading-relaxed">
              Sofa seating for everyone with big windows that catch natural light. Heated in the evening when the mountain air cools down.
            </p>
          </div>

          <div style={{ "--stagger-i": 1 } as React.CSSProperties} className="reveal-item space-y-3">
            <div className="rounded-xl overflow-hidden border border-[#1A432E]/15 aspect-[4/3] bg-[#F4F8F5]">
              <img
                src={dining_table}
                alt="Wood dining table at Nalaka Rest"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="font-['Newsreader'] text-xl font-medium text-[#132E20]">Family Dining Table</h3>
            <p className="text-xs text-[#4B6354] leading-relaxed">
              Seats up to 6 people right next to the kitchen. Set up for long family breakfasts and leisurely home-cooked dinners.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
