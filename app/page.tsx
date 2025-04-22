import {
  ArrowRight,
  Leaf,
  Recycle,
  Users,
  Coins,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnimatedGlobe() {
  return (
    // <div className="relative w-32 h-32 mx-auto mb-8">
    //   <div className='absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse'></div>
    //   <div className='absolute inset-2 rounded-full bg-green-400 opacity-40 animate-ping'></div>
    //   <div className='absolute inset-4 rounded-full bg-green-300 opacity-60 animate-spin'></div>
    //   <div className='absolute inset-6 rounded-full bg-green-200 opacity-80 animate-bounce'></div>
    //   <Leaf className='absolute inset-0 m-auto h-16 w-16 text-green-600 animate-pulse' />
    // </div>

    //
    // {/* <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">

    //       <div className="absolute inset-0 rounded-full bg-green-500 opacity-10 animate-pulse"></div>

    //       <div className="absolute w-24 h-24 bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-lg animate-spin-slow"></div>

    //       <div className="absolute -top-2 left-6 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float"></div>
    //       <div className="absolute -bottom-2 right-6 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float delay-200"></div>

    //       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-green-600 rounded-t-lg shadow-md animate-grow"></div>

    //       <Leaf className="absolute inset-0 m-auto h-10 w-10 text-green-700 animate-pulse" />
    //     </div> */}

    <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-green-400 opacity-10 animate-pulse"></div>
      <div className="absolute inset-2 rounded-full bg-green-300 opacity-15 animate-pulse delay-500"></div>

      <div className="absolute w-32 h-32 bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-2xl animate-spin-slow before:absolute before:w-full before:h-full before:rounded-full before:bg-white before:opacity-10 before:animate-ping"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-1 h-1 bg-green-200 rounded-full opacity-70 animate-twinkle"></div>
        <div className="absolute w-1 h-1 bg-green-300 rounded-full opacity-80 animate-twinkle delay-200 left-6 top-6"></div>
        <div className="absolute w-1 h-1 bg-green-400 rounded-full opacity-90 animate-twinkle delay-400 right-8 bottom-4"></div>
      </div>

      <div className="absolute -top-4 left-8 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float rotate-[30deg]"></div>
      <div className="absolute -bottom-4 right-8 w-6 h-6 bg-green-500 rounded-full shadow-md animate-float delay-300 rotate-[60deg]"></div>
      <div className="absolute top-2 right-10 w-4 h-4 bg-green-400 rounded-full shadow-md animate-float delay-500 rotate-[15deg]"></div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-16 bg-green-600 rounded-t-lg shadow-lg animate-grow"></div>
      <div className="absolute bottom-3 left-[35%] w-5 h-5 bg-green-500 rounded-full animate-leaf"></div>
      <div className="absolute bottom-3 right-[35%] w-5 h-5 bg-green-500 rounded-full animate-leaf"></div>
      <div className="absolute bottom-0 left-[42%] w-1 h-4 bg-green-700 rounded-full animate-roots"></div>
      <div className="absolute bottom-0 right-[42%] w-1 h-4 bg-green-700 rounded-full animate-roots delay-300"></div>

      <Leaf className="absolute inset-0 m-auto h-14 w-14 text-green-700 animate-pulse" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto bg-[#212121]  px-4 py-16">
      <section className="text-center mb-30">
        <AnimatedGlobe />
        <h1 className="text-6xl font-bold mb-6 text-neutral-200 tracking-tight">
          {" "}
          <span className="text-indigo-600">AI</span> <span className="text-blue-600">Powered </span>
          <span className="text-green-600">Waste </span> <span className="text-yellow-600">Management</span> <span className="text-rose-600">System</span>
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed mb-8">
          {" "}
  Join our initiative to make waste management more efficient and successful!
</p>

        <Button className=" bg-green-600 hover:bg-green-700 cursor-pointer text-white text-lg py-6 px-10 ">
          Found Waste ?
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <FeatureCard
          icon={Leaf}
          title="Eco-Friendly"
          description="We are commited to reduce waste and promote sustainable development"
        />

        <FeatureCard
          icon={Coins}
          title="Get Incentive"
          description="Earn pennies by reporting subsidual waste anywhere !"
        />

        <FeatureCard
          icon={Coins}
          title="Community-Driven"
          description="Earn pennies by reporting subsidual waste anywhere !"
        />
      </section>

      <section className="bg-white p-10 rounded-3xl shadow-lg mb-20">
        <h2 className="text-center font-bold text-4xl text-gray-800">
          <span className="text-green-600">Cleanup</span> Data
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <ImpactCard title="Waste Collected" value={"14 Kg"} icon={Recycle} />
          <ImpactCard title="Report Submitted" value={"14"} icon={MapPin} />
          <ImpactCard title="Tokens Earned" value={53} icon={Coins} />
          <ImpactCard title="CO2 Offset" value={"29 Kg"} icon={Leaf} />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8  rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center text-center">
      <div className="bg-green-100 p-4 rounded-full mb-6">
        <Icon className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ImpactCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md">
      <Icon className="h-10 w-10 text-green-500 mb-4" />
      <p className="text-3xl font-bold mb-2 text-gray-800">{value}</p>
      <p className="text-sm tetx-gray-600 ">{title}</p>
      {""}
    </div>
  );
}
