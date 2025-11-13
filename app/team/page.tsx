// 'use client'

// import { Mail, Briefcase, Code } from 'lucide-react'
// import Image from 'next/image'

// interface TeamMember {
//   id: number
//   name: string
//   rollNumber: string
//   course: string
//   designation: string
//   image: string
// }

// // Placeholder team members - update with actual data
// const teamMembers: TeamMember[] = [
//   {
//     id: 1,
//     name: "Kushagra Chaturvedi",
//     rollNumber: "202210101150018",
//     course: "B.Tech CSE(DS+AI)",
//     designation: "Team Lead || Frontend || Backend",
//     image: "/kushagra.jpg", // Replace with actual image path
//   },
//   {
//     id: 2,
//     name: "Sankalp Jaiswal",
//     rollNumber: "202210101150005",
//     course: "B.Tech CSE(DS+AI)",
//     designation: "Frontend || Backend",
//     image: "/kushagra.jpg", // Replace with actual image path
//   },
//   {
//     id: 3,
//     name: "Suryansh Vaish",
//     rollNumber: "202210101150020",
//     course: "B.Tech CSE(DS+AI)",
//     designation: "Frontend",
//     image: "/kushagra.jpg", // Replace with actual image path
//   },
//   {
//     id: 4,
//     name: "Anushka Aggarwal",
//     rollNumber: "202210101150039",
//     course: "B.Tech CSE(DS+AI)",
//     designation: "Documentation",
//     image: "/kushagra.jpg", // Replace with actual image path
//   },
// ]

// export default function TeamPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
//       {/* Hero Section */}
//       <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto text-center">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//             Meet Our Team
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             B.Tech  CSE Students passionate about building innovative solutions and making a positive impact through technology
//           </p>
//         </div>
//       </section>

//       {/* Team Members Grid */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member) => (
//               <div
//                 key={member.id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
//               >
//                 {/* Image Container */}
//                 <div className="relative w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
//                   <Image
//                     src={member.image}
//                     alt={member.name}
//                     width={400}
//                     height={400}
//                     className="w-full h-full object-cover"
//                     priority={false}
//                   />
//                 </div>

//                 {/* Info Container */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-1">
//                     {member.name}
//                   </h3>

//                   <div className="space-y-3 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <span className="font-medium text-gray-700 mr-2">Roll No:</span>
//                       <span>{member.rollNumber}</span>
//                     </div>

//                     <div className="flex items-center">
//                       <Briefcase className="w-4 h-4 mr-2 text-green-600" />
//                       <span>{member.course}</span>
//                     </div>

//                     <div className="flex items-center">
//                       <Code className="w-4 h-4 mr-2 text-blue-600" />
//                       <span>{member.designation}</span>
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <p className="text-xs text-gray-500 text-center">
//                       Member #{member.id}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
         

          

//       {/* Team Stats */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Final Year Project Highlights</h2>
//           <div className="grid md:grid-cols-3 gap-8 text-center">
//             <div className="p-6">
//               <div className="text-4xl font-bold text-green-600 mb-2">
//                 {teamMembers.length}
//               </div>
//               <p className="text-gray-600 font-medium">B.Tech 4th Year Students</p>
//             </div>
//             <div className="p-6">
//               <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
//               <p className="text-gray-600 font-medium">Common Goal</p>
//             </div>
//             <div className="p-6">
//               <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
//               <p className="text-gray-600 font-medium">Learning Opportunities</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


"use client";

import { Mail, Briefcase, Code } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  rollNumber: string;
  course: string;
  designation: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Kushagra Chaturvedi",
    rollNumber: "202210101150018",
    course: "B.Tech CSE(DS+AI)",
    designation: "Team Lead || Frontend || Backend",
    image: "/kushagra.jpg",
  },
  {
    id: 2,
    name: "Sankalp Jaiswal",
    rollNumber: "202210101150005",
    course: "B.Tech CSE(DS+AI)",
    designation: "Frontend || Backend",
    image: "/kushagra.jpg",
  },
  {
    id: 3,
    name: "Suryansh Vaish",
    rollNumber: "202210101150020",
    course: "B.Tech CSE(DS+AI)",
    designation: "Frontend || Framer Motion",
    image: "/kushagra.jpg",
  },
  {
    id: 4,
    name: "Anushka Aggarwal",
    rollNumber: "202210101150039",
    course: "B.Tech CSE(DS+AI)",
    designation: "Documentation",
    image: "/kushagra.jpg",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            B.Tech CSE Students passionate about building innovative solutions and making a positive impact through technology
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
              >
                <div className="relative w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">
                        Roll No:
                      </span>
                      <span>{member.rollNumber}</span>
                    </div>

                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-green-600" />
                      <span>{member.course}</span>
                    </div>

                    <div className="flex items-center">
                      <Code className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{member.designation}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Member #{member.id}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Properly separated section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Final Year Project Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {teamMembers.length}
              </div>
              <p className="text-gray-600 font-medium">
                B.Tech 4th Year Students
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
              <p className="text-gray-600 font-medium">Common Goal</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">∞</div>
              <p className="text-gray-600 font-medium">Learning Opportunities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
