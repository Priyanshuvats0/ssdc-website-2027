const teamData = {
  faculty: [
    {
      name: "Dr. Manoj Sachan",
      role: "Faculty Advisor",
      img: "/images/team/manoj sachan.png",
    },
    {
      name: "Er. Rahul Gautam",
      role: "Co-Faculty Advisor",
      img: "/images/team/rahul gautam.png",
    },
  ],
  mentors: [
    {
      name: "Arvind Kumar",
      role: "Mentor",
      img: "/images/team/arvind.png",
    },
    {
      name: "Marut Jindal",
      role: "Mentor",
      img: "/images/team/marut jindal.png",
    },
  ],
};

// Extracted Card Component for cleaner, more aesthetic code
const TeamCard = ({ person }) => (
  <div className="group relative bg-[#0a0a0a] rounded-2xl border border-white/5 p-8 w-64 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:bg-zinc-900/80 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
    
    {/* Profile Image with Hover Glow Effect */}
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <img
        src={person.img}
        alt={person.name}
        className="relative w-32 h-32 rounded-full object-cover border-2 border-zinc-800 group-hover:border-blue-400/80 transition-all duration-500 z-10 shadow-lg"
      />
    </div>

    {/* Name and Role Badge */}
    <h4 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
      {person.name}
    </h4>
    <div className="mt-3 bg-[#4AF626]/10 border border-[#4AF626]/20 px-3 py-1 rounded-full">
      <p className="text-[#4AF626] text-xs font-semibold tracking-wide uppercase">
        {person.role}
      </p>
    </div>
    
  </div>
);

export default function TeamSection() {
  return (
    <section id="team" className="bg-black text-white py-20 border-b border-gray-900">
      
      {/* Clean, Simple Header */}
      <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-widest text-white">
        TEAM
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto px-6">
    
        {/* Faculty Advisors Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-10 text-gray-400 uppercase tracking-widest flex items-center gap-4">
            <span className="w-12 h-[1px] bg-gray-700"></span>
            Faculty Advisors
            <span className="w-12 h-[1px] bg-gray-700"></span>
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {teamData.faculty.map((person, i) => (
              <TeamCard key={`faculty-${i}`} person={person} />
            ))}
          </div>
        </div>

        {/* Mentors Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-10 text-gray-400 uppercase tracking-widest flex items-center gap-4">
            <span className="w-12 h-[1px] bg-gray-700"></span>
            Mentors
            <span className="w-12 h-[1px] bg-gray-700"></span>
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {teamData.mentors.map((person, i) => (
              <TeamCard key={`mentor-${i}`} person={person} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}