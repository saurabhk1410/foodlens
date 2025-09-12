import {
  Layers,
  Sparkles,
  Bookmark,
  Star,
  Command,
  Cuboid,
} from "lucide-react";

// do npm i lucide-react to use the icons and uncomment icons

export default function FeatureSection() {
  const features = [
  {
    title: "Personalized Search",
    desc: "At Realty Intel, we understand that every client has unique needs.",
    icon: <Command className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Premium listings",
    desc: "At Realty Intel, explore a wide range of high-quality properties.",
    icon: <Sparkles className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Expert AI guidance",
    desc: "Get AI searches to navigate the complexities of real estate.",
    icon: <Layers className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Seamless process",
    desc: "Enjoy a smooth property journey with our pro+ dedicated team.",
    icon: <Star className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Trusted expertise",
    desc: "Leverage years of experience to make confident property decisions.",
    icon: <Bookmark className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
  {
    title: "Tailored solutions",
    desc: "Experience services specifically to meet your lifestyle.",
    icon: <Cuboid className="w-16 h-16 text-orange-500" strokeWidth={1.25} />,
  },
];

  
  return (
    <section className=" py-20 px-4 md:px-20 bg-orange-100">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-xl uppercase text-gray-500 font-medium mb-2">
          Features
        </h3>
        <h2 className="text-4xl font-semibold tracking-tighter text-gray-900 mb-12">
          Why we stand out in finding your <span className="text-orange-500">perfect</span> home
        </h2>
       <div className="grid grid-cols-2 md:grid-cols-3 border-t-2 border-l-2 border-slate-500">
  {features.map((feature, index) => (
    <div
      key={index}
      className="border-r-2 border-b-2 border-slate-500 p-6 md:p-8 flex flex-col items-center text-center"
    >
      <div className="mb-4">{feature.icon}</div>
      <h4 className="text-lg md:text-2xl tracking-tighter font-semibold text-gray-900 mb-2">
        {feature.title}
      </h4>
      <p className="text-[10px] hidden md:block md:text-sm text-gray-700 font-semibold">{feature.desc}</p>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}