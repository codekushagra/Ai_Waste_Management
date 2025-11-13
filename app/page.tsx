// "use client";
// import {
//   ArrowRight,
//   Leaf,
//   Recycle,
//   Users,
//   Coins,
//   MapPin,
//   ChevronRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import GapingText from "@/components/ui/Gaping-Text";

// export function AnimatedGlobe() {
//   return (
//     // <div className="relative w-32 h-32 mx-auto mb-8">
//     //   <div className='absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse'></div>
//     //   <div className='absolute inset-2 rounded-full bg-green-400 opacity-40 animate-ping'></div>
//     //   <div className='absolute inset-4 rounded-full bg-green-300 opacity-60 animate-spin'></div>
//     //   <div className='absolute inset-6 rounded-full bg-green-200 opacity-80 animate-bounce'></div>
//     //   <Leaf className='absolute inset-0 m-auto h-16 w-16 text-green-600 animate-pulse' />
//     // </div>

//     //
//     // {/* <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">

//     //       <div className="absolute inset-0 rounded-full bg-green-500 opacity-10 animate-pulse"></div>

//     //       <div className="absolute w-24 h-24 bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-lg animate-spin-slow"></div>

//     //       <div className="absolute -top-2 left-6 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float"></div>
//     //       <div className="absolute -bottom-2 right-6 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float delay-200"></div>

//     //       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-green-600 rounded-t-lg shadow-md animate-grow"></div>

//     //       <Leaf className="absolute inset-0 m-auto h-10 w-10 text-green-700 animate-pulse" />
//     //     </div> */}

//     <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
//       <div className="absolute inset-0 rounded-full bg-green-400 opacity-10 animate-pulse"></div>
//       <div className="absolute inset-2 rounded-full bg-green-300 opacity-15 animate-pulse delay-500"></div>

//       <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-2xl animate-spin-slow before:absolute before:w-full before:h-full before:rounded-full before:bg-white before:opacity-10 before:animate-ping"></div>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="absolute w-1 h-1 bg-green-200 rounded-full opacity-70 animate-twinkle"></div>
//         <div className="absolute w-1 h-1 bg-green-300 rounded-full opacity-80 animate-twinkle delay-200 left-6 top-6"></div>
//         <div className="absolute w-1 h-1 bg-green-400 rounded-full opacity-90 animate-twinkle delay-400 right-8 bottom-4"></div>
//       </div>

//       <div className="absolute -top-4 left-8 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float rotate-[30deg]"></div>
//       <div className="absolute -bottom-4 right-8 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float delay-300 rotate-[60deg]"></div>
//       <div className="absolute top-2 right-10 w-4 h-4 bg-green-400 rounded-full shadow-md animate-float delay-500 rotate-[15deg]"></div>

//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-16 bg-green-600 rounded-t-lg shadow-lg animate-grow"></div>
//       <div className="absolute bottom-3 left-[35%] w-5 h-5 bg-green-500 rounded-full animate-leaf"></div>
//       <div className="absolute bottom-3 right-[35%] w-5 h-5 bg-green-500 rounded-full animate-leaf"></div>
//       <div className="absolute bottom-0 left-[42%] w-1 h-4 bg-green-700 rounded-full animate-roots"></div>
//       <div className="absolute bottom-0 right-[42%] w-1 h-4 bg-green-700 rounded-full animate-roots delay-300"></div>

//       <Leaf className="absolute inset-0 m-auto h-14 w-14 text-green-700 animate-pulse" />
//     </div>
//   );
// }

// export default function Home() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, filter: "blur(10px)" }}
//       animate={{ opacity: 1, filter: "blur(0px)" }}
//       transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
//       className="container mx-auto bg-white px-4 py-16"
//     >
//       <section className="text-center mb-30">
//         <AnimatedGlobe />
//         <h1 className="text-6xl font-bold  font-mono mb-6 pb-1.5 tracking-tight bg-gradient-to-r from-purple-400 via-sky-400  to-emerald-400 text-transparent bg-clip-text">
//           <GapingText text="AI Powered Waste Management System" />
//         </h1>

//         <p className="text-xl text-gray-500 font-mono max-w-2xl mx-auto leading-relaxed mb-8">
//           {" "}
//           Join our initiative to make waste management more efficient and
//           successful!
//         </p>

//         <Link href={"/report"}>
//           <motion.div whileTap={{ scale: 0.95 }}>
//             <Button className=" bg-green-500 hover:bg-green-600 cursor-pointer text-white text-lg py-6 px-10 ">
//               Found Waste ?
//             </Button>
//           </motion.div>
//         </Link>
//       </section>

//       <section className="grid md:grid-cols-3 gap-8 mb-20">
//         <FeatureCard
//           icon={Leaf}
//           title="Eco-Friendly"
//           description="We are commited to reduce waste and promote sustainable development"
//         />

//         <FeatureCard
//           icon={Coins}
//           title="Get Incentive"
//           description="Earn pennies by reporting subsidual waste anywhere !"
//         />

//         <FeatureCard
//           icon={Coins}
//           title="Community-Driven"
//           description="Earn pennies by reporting subsidual waste anywhere !"
//         />
//       </section>

//       <section className="bg-white p-10 rounded-3xl shadow-lg mb-20">
//         <h2 className="text-center font-bold text-4xl text-gray-800 mb-2.5">
//           <span className="text-green-600">Cleanup</span> Data
//         </h2>
//         <div className="grid md:grid-cols-4 gap-6">
//           <ImpactCard title="Waste Collected" value={"14 Kg"} icon={Recycle} />
//           <ImpactCard title="Report Submitted" value={"14"} icon={MapPin} />
//           <ImpactCard title="Tokens Earned" value={53} icon={Coins} />
//           <ImpactCard title="CO2 Offset" value={"29 Kg"} icon={Leaf} />
//         </div>
//       </section>
//     </motion.div>
//   );
// }

// function FeatureCard({
//   icon: Icon,
//   title,
//   description,
// }: {
//   icon: React.ElementType;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div
//       className="bg-white p-8  rounded-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center text-center"
//       style={{
//         boxShadow: `rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;`,
//       }}
//     >
//       <div className="bg-green-100 p-4 rounded-full mb-6">
//         <Icon className="h-8 w-8 text-green-600" />
//       </div>
//       <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
//       <p className="text-gray-600 leading-relaxed">{description}</p>
//     </div>
//   );
// }

// function ImpactCard({
//   title,
//   value,
//   icon: Icon,
// }: {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
// }) {
//   return (
//     <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md">
//       <Icon className="h-10 w-10 text-green-500 mb-4" />
//       <p className="text-3xl font-bold mb-2 text-gray-800">{value}</p>
//       <p className="text-sm tetx-gray-600 ">{title}</p>
//       {""}
//     </div>
//   );
// }


// original code till 13 nov
// "use client";

// import {
//   Leaf,
//   Recycle,
//   Coins,
//   MapPin,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import GapingText from "@/components/ui/Gaping-Text";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast"; // ✅ make sure react-hot-toast is installed



// export default function Home() {
//   const router = useRouter();

//   const handleFoundWasteClick = () => {
//     const userEmail = localStorage.getItem("userEmail");

//     if (userEmail) {
//       router.push("/report"); // ✅ Go to report page
//     } else {
//       toast.error("Please log in to report waste."); // 🚫 Block access
//     }
//   };

// // ✅ Local component, not exported
// function AnimatedGlobe() {
//   return (
//     <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
//       <div className="absolute inset-0 rounded-full bg-green-400 opacity-10 animate-pulse"></div>
//       <div className="absolute inset-2 rounded-full bg-green-300 opacity-15 animate-pulse delay-500"></div>

//       <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-2xl animate-spin-slow before:absolute before:w-full before:h-full before:rounded-full before:bg-white before:opacity-10 before:animate-ping"></div>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="absolute w-1 h-1 bg-green-200 rounded-full opacity-70 animate-twinkle"></div>
//         <div className="absolute w-1 h-1 bg-green-300 rounded-full opacity-80 animate-twinkle delay-200 left-6 top-6"></div>
//         <div className="absolute w-1 h-1 bg-green-400 rounded-full opacity-90 animate-twinkle delay-400 right-8 bottom-4"></div>
//       </div>

//       <div className="absolute -top-4 left-8 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float rotate-[30deg]"></div>
//       <div className="absolute -bottom-4 right-8 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float delay-300 rotate-[60deg]"></div>
//       <div className="absolute top-2 right-10 w-4 h-4 bg-green-400 rounded-full shadow-md animate-float delay-500 rotate-[15deg]"></div>

//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-16 bg-green-600 rounded-t-lg shadow-lg animate-grow"></div>
//       <div className="absolute bottom-3 left-[35%] w-5 h-5 bg-green-500 rounded-full animate-leaf"></div>
//       <div className="absolute bottom-3 right-[35%] w-5 h-5 bg-green-500 rounded-full animate-leaf"></div>
//       <div className="absolute bottom-0 left-[42%] w-1 h-4 bg-green-700 rounded-full animate-roots"></div>
//       <div className="absolute bottom-0 right-[42%] w-1 h-4 bg-green-700 rounded-full animate-roots delay-300"></div>

//       <Leaf className="absolute inset-0 m-auto h-14 w-14 text-green-700 animate-pulse" />
//     </div>
//   );
// }

// // ✅ Default export (the actual page)
// export default function Home() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, filter: "blur(10px)" }}
//       animate={{ opacity: 1, filter: "blur(0px)" }}
//       transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
//       className="container mx-auto bg-white px-4 py-16"
//     >
//       <section className="text-center mb-30">
//         <AnimatedGlobe />
//         <h1 className="text-6xl font-bold font-mono mb-6 pb-1.5 tracking-tight bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">
//           <GapingText text="AI Powered Waste Management System" />
//         </h1>

//         <p className="text-xl text-gray-500 font-mono max-w-2xl mx-auto leading-relaxed mb-8">
//           Join our initiative to make waste management more efficient and successful!
//         </p>

//         <Link href="/report">
//           <motion.div whileTap={{ scale: 0.95 }}>
//             <Button onClick={handleFoundWasteClick} className="bg-green-500 hover:bg-green-600 cursor-pointer text-white text-lg py-6 px-10">
//               Found Waste?
//             </Button>
//           </motion.div>
//         </Link>
//       </section>

//       <section className="grid md:grid-cols-3 gap-8 mb-20">
//         <FeatureCard
//           icon={Leaf}
//           title="Eco-Friendly"
//           description="We are commited to reduce waste and promote sustainable development"
//         />
//         <FeatureCard
//           icon={Coins}
//           title="Get Incentive"
//           description="Earn pennies by reporting subsidual waste anywhere!"
//         />
//         <FeatureCard
//           icon={Coins}
//           title="Community-Driven"
//           description="Earn pennies by reporting subsidual waste anywhere!"
//         />
//       </section>

//       <section className="bg-white p-10 rounded-3xl shadow-lg mb-20">
//         <h2 className="text-center font-bold text-4xl text-gray-800 mb-2.5">
//           <span className="text-green-600">Cleanup</span> Data
//         </h2>
//         <div className="grid md:grid-cols-4 gap-6">
//           <ImpactCard title="Waste Collected" value={"14 Kg"} icon={Recycle} />
//           <ImpactCard title="Report Submitted" value={"14"} icon={MapPin} />
//           <ImpactCard title="Tokens Earned" value={53} icon={Coins} />
//           <ImpactCard title="CO2 Offset" value={"29 Kg"} icon={Leaf} />
//         </div>
//       </section>
//     </motion.div>
//   );
// }

// // Utility components
// function FeatureCard({
//   icon: Icon,
//   title,
//   description,
// }: {
//   icon: React.ElementType;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div
//       className="bg-white p-8 rounded-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center text-center"
//       style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
//     >
//       <div className="bg-green-100 p-4 rounded-full mb-6">
//         <Icon className="h-8 w-8 text-green-600" />
//       </div>
//       <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
//       <p className="text-gray-600 leading-relaxed">{description}</p>
//     </div>
//   );
// }

// function ImpactCard({
//   title,
//   value,
//   icon: Icon,
// }: {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
// }) {
//   return (
//     <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md">
//       <Icon className="h-10 w-10 text-green-500 mb-4" />
//       <p className="text-3xl font-bold mb-2 text-gray-800">{value}</p>
//       <p className="text-sm text-gray-600">{title}</p>
//     </div>
//   );
// }

"use client";

import {
  Leaf,
  Recycle,
  Coins,
  MapPin,
  TrendingUp,
  Zap,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import GapingText from "@/components/ui/Gaping-Text";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getImpactStats } from "@/utils/db/actions";

// ✅ Animated Globe component
function AnimatedGlobe() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-72 h-72 mx-auto flex items-center justify-center"
    >
      <div className="absolute inset-0 rounded-full bg-green-400 opacity-15 animate-pulse"></div>
      <div className="absolute inset-3 rounded-full bg-green-300 opacity-10 animate-pulse delay-500"></div>
      <div className="absolute inset-6 rounded-full bg-green-200 opacity-5 animate-pulse delay-1000"></div>

      <div className="absolute w-40 h-40 bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-2xl animate-spin-slow"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-1.5 h-1.5 bg-green-200 rounded-full opacity-70 animate-twinkle"></div>
        <div className="absolute w-1.5 h-1.5 bg-green-300 rounded-full opacity-80 animate-twinkle delay-200 left-8 top-8"></div>
        <div className="absolute w-1.5 h-1.5 bg-green-400 rounded-full opacity-90 animate-twinkle delay-400 right-10 bottom-6"></div>
      </div>

      <div className="absolute -top-6 left-10 w-7 h-7 bg-green-500 rounded-full shadow-lg animate-float"></div>
      <div className="absolute -bottom-6 right-10 w-7 h-7 bg-green-500 rounded-full shadow-lg animate-float delay-300"></div>
      <div className="absolute top-4 right-12 w-5 h-5 bg-green-400 rounded-full shadow-md animate-float delay-500"></div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-20 bg-gradient-to-t from-green-700 to-green-600 rounded-t-lg shadow-lg animate-grow"></div>
      <div className="absolute bottom-4 left-[35%] w-6 h-6 bg-green-500 rounded-full animate-leaf"></div>
      <div className="absolute bottom-4 right-[35%] w-6 h-6 bg-green-500 rounded-full animate-leaf"></div>
      <div className="absolute bottom-0 left-[42%] w-1.5 h-5 bg-green-800 rounded-full animate-roots"></div>
      <div className="absolute bottom-0 right-[42%] w-1.5 h-5 bg-green-800 rounded-full animate-roots delay-300"></div>

      <Leaf className="absolute inset-0 m-auto h-16 w-16 text-green-700 animate-pulse drop-shadow-lg" />
    </motion.div>
  );
}

// ✅ FeatureCard component (Enhanced)
function FeatureCard({
  icon: Icon,
  title,
  description,
  color = "green",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
}) {
  const colorMap = {
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-cyan-500",
    purple: "from-purple-400 to-pink-500",
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-300 group"
    >
      <div className={`bg-gradient-to-br ${colorMap[color as keyof typeof colorMap]} p-5 rounded-xl mb-6 w-fit shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-700 leading-relaxed text-base font-medium">{description}</p>
    </motion.div>
  );
}

// ✅ ImpactCard component (Enhanced)
function ImpactCard({
  title,
  value,
  icon: Icon,
  color = "green",
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color?: string;
}) {
  const colorClass = `text-${color}-500`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-lg bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200 transition-all`}
    >
      <Icon className={`h-10 w-10 text-${color}-600 mb-4`} />
      <p className="text-3xl font-bold mb-2 text-gray-900">{value}</p>
      <p className="text-sm text-gray-700 font-medium">{title}</p>
    </motion.div>
  );
}

// ✅ Step card for How It Works
function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: number * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="flex flex-col items-center bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 h-full">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-2xl mb-6 shadow-lg ring-4 ring-green-100">
          {number}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
        <p className="text-gray-700 text-center text-base font-medium leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ✅ Stat box component
function StatBox({ value, label }: { value: string | number; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg border border-gray-200 text-center"
    >
      <p className="text-3xl font-bold text-green-600 mb-2">{value}</p>
      <p className="text-gray-600 text-sm">{label}</p>
    </motion.div>
  );
}

// ✅ Main Page
export default function Home() {
  const router = useRouter();
  const [stats, setStats] = useState({
    wasteCollected: 0,
    reportsSubmitted: 0,
    tokensEarned: 0,
    co2Offset: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const impactStats = await getImpactStats();
        setStats(impactStats);
      } catch (error) {
        console.error("Error fetching impact stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleFoundWasteClick = () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      router.push("/report");
    } else {
      toast.error("Please log in to report waste.");
    }
  };

  const handleCollectClick = () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      router.push("/collect");
    } else {
      toast.error("Please log in to collect waste.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-8 lg:pt-12 pb-40 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6 tracking-wide">
                  ✨ Revolutionizing Waste Management
                </span>
                <h1 className="text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent leading-tight">
                  <GapingText text="SwachhAI" />
                </h1>
                <p className="text-3xl font-bold text-gray-900 mb-6">
                  Turn Waste Into Wealth
                </p>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed max-w-xl font-medium">
                Experience the future of waste management. Report waste responsibly, collect efficiently, earn real rewards, and build a sustainable future with AI-powered intelligence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleFoundWasteClick}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-base font-semibold px-10 py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
                  >
                    Report Waste <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleCollectClick}
                    size="lg"
                    className="text-base font-semibold px-10 py-7 rounded-xl border-2 border-green-600 text-green-700 bg-white hover:bg-green-50 transition-all duration-300 w-full sm:w-auto shadow-md"
                  >
                    Collect Waste <Recycle className="ml-3 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row gap-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-700" />
                  </div>
                  <span className="text-gray-700 font-medium">Web3 Secured</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-700" />
                  </div>
                  <span className="text-gray-700 font-medium">AI-Powered Verification</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Animated Globe */}
            <motion.div
              initial={{ x: 60, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <AnimatedGlobe />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">SwachhAI?</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Combining cutting-edge AI technology with real environmental responsibility to create meaningful impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard
              icon={Zap}
              title="AI Verification"
              description="Advanced AI technology instantly verifies waste authenticity with 85%+ accuracy, reducing manual errors"
              color="blue"
            />
            <FeatureCard
              icon={Coins}
              title="Earn Real Rewards"
              description="Get tokens for every waste collection and exchange them for real rewards, incentivizing participation"
              color="green"
            />
            <FeatureCard
              icon={Users}
              title="Community Impact"
              description="Join a global movement making waste management smarter and greener with measurable environmental benefits"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              How It <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              A simple 4-step journey towards sustainability and earning rewards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 mb-12 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            
            <StepCard number={1} title="Report" description="Discover and report waste locations with clear photos and detailed information" />
            <StepCard number={2} title="Collect" description="Trained collectors pick up waste and perform initial physical verification" />
            <StepCard number={3} title="Verify" description="AI analyzes waste or manual verification by experts confirms authenticity" />
            <StepCard number={4} title="Earn" description="Receive tokens instantly and redeem for rewards and incentives" />
          </div>
        </div>
      </section>

      {/* Impact Stats Section - HIGHLY VISIBLE */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-green-50 to-white border-t-4 border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent leading-tight">
              Our Global Impact
            </h2>
            <p className="text-2xl text-gray-800 max-w-3xl mx-auto font-bold leading-relaxed">
              Real numbers, real change. See the measurable difference we're making together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Waste Collected Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-100 p-10 rounded-2xl border-2 border-yellow-400 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-5 rounded-full shadow-lg">
                  <Recycle className="h-10 w-10 text-yellow-900" />
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center mb-3">
                  <Loader className="h-10 w-10 text-yellow-600 animate-spin" />
                </div>
              ) : (
                <p className="text-6xl font-black text-yellow-700 mb-2 text-center">{stats.wasteCollected}</p>
              )}
              <p className="text-base text-yellow-900 text-center font-semibold mb-2">Kg Waste Collected</p>
              <p className="text-sm text-gray-700 text-center font-medium">Environmental progress accumulating</p>
            </motion.div>

            {/* Reports Submitted Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-100 p-10 rounded-2xl border-2 border-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-5 rounded-full shadow-lg">
                  <MapPin className="h-10 w-10 text-blue-900" />
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center mb-3">
                  <Loader className="h-10 w-10 text-blue-600 animate-spin" />
                </div>
              ) : (
                <p className="text-6xl font-black text-blue-700 mb-2 text-center">{stats.reportsSubmitted}</p>
              )}
              <p className="text-base text-blue-900 text-center font-semibold mb-2">Waste Reports</p>
              <p className="text-sm text-gray-700 text-center font-medium">Community members engaged</p>
            </motion.div>

            {/* Tokens Earned Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-purple-50 to-pink-100 p-10 rounded-2xl border-2 border-purple-400 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-5 rounded-full shadow-lg">
                  <Award className="h-10 w-10 text-purple-900" />
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center mb-3">
                  <Loader className="h-10 w-10 text-purple-600 animate-spin" />
                </div>
              ) : (
                <p className="text-6xl font-black text-purple-700 mb-2 text-center">{stats.tokensEarned}</p>
              )}
              <p className="text-base text-purple-900 text-center font-semibold mb-2">Tokens Earned</p>
              <p className="text-sm text-gray-700 text-center font-medium">Rewards actively distributed</p>
            </motion.div>

            {/* CO2 Offset Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-10 rounded-2xl border-2 border-green-500 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-5 rounded-full shadow-lg">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center mb-3">
                  <Loader className="h-10 w-10 text-green-600 animate-spin" />
                </div>
              ) : (
                <p className="text-6xl font-black text-green-700 mb-2 text-center">{stats.co2Offset}</p>
              )}
              <p className="text-base text-green-900 text-center font-semibold mb-2">Kg CO2 Offset</p>
              <p className="text-sm text-gray-700 text-center font-medium">Carbon footprint reduced</p>
            </motion.div>
          </div>

          {/* Impact Summary */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-12 rounded-2xl shadow-2xl text-center border border-green-400"
          >
            <p className="text-3xl font-black mb-4 leading-tight">Together, we're building a sustainable future</p>
            <p className="text-xl text-green-100 font-semibold leading-relaxed max-w-3xl mx-auto">Join thousands of users transforming waste management into environmental action and economic opportunity</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
              Ready to Make a <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Difference?</span>
            </h2>
            <p className="text-2xl text-gray-800 mb-12 max-w-3xl mx-auto font-semibold leading-relaxed">
              Start your journey towards a cleaner, greener future today. Join thousands of users revolutionizing waste management with purpose and passion.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-base font-semibold px-12 py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    Learn More About Us <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="text-base font-semibold px-12 py-7 rounded-xl border-2 border-green-600 text-green-700 bg-white hover:bg-green-50 transition-all duration-300 shadow-md"
                >
                  <Link href="/team" className="flex items-center gap-2">
                    Meet Our Team <Users className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
