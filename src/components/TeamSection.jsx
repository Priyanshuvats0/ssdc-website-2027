import { useNavigate } from "react-router-dom";

const teamData = {
  faculty: [
    {
      name: "Hemant Chaurasia",
      role: "Dev&OS",
      img: "https://picsum.photos/id/1011/200/200",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Hemant Chaurasia",
      role: "Dev&OS",
      img: "https://picsum.photos/id/1012/200/200",
      linkedin: "#",
      github: "#",
    },
  ],
  mentors: [
    {
      name: "Hemant Chaurasia",
      role: "Dev&OS",
      img: "https://picsum.photos/id/1015/200/200",
      linkedin: "#",
      github: "#",
    },
    {
      name: "Hemant Chaurasia",
      role: "Dev&OS",
      img: "https://picsum.photos/id/1016/200/200",
      linkedin: "#",
      github: "#",
    },
  ],
};

export default function TeamSection() {
   const navigate = useNavigate();
  return (
    <section id="team" className="bg-black text-white py-16 ">
      <h2 className="text-4xl font-bold text-center mb-12">TEAM</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
    
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">
            Faculty Advisors
          </h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {teamData.faculty.map((person, i) => (
              <div
                key={i}
                className="bg-zinc-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 w-60 text-center transform transition hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-semibold">{person.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{person.role}</p>
                <div className="flex justify-center gap-4">
                  <a href={person.linkedin} target="_blank" rel="noreferrer">
                    <img
                      src="/vector/linkedin.svg"
                      alt="LinkedIn"
                      className="w-5 h-5 hover:opacity-80 transition"
                    />
                  </a>
                  <a href={person.github} target="_blank" rel="noreferrer">
                    <img
                      src="/vector/github.svg"
                      alt="GitHub"
                      className="w-5 h-5 hover:opacity-80 transition"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">Mentors</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            {teamData.mentors.map((person, i) => (
              <div
                key={i}
                className="bg-zinc-900/70 backdrop-blur-md rounded-xl shadow-lg p-6 w-60 text-center transform transition hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="text-lg font-semibold">{person.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{person.role}</p>
                <div className="flex justify-center gap-4">
                  <a href={person.linkedin} target="_blank" rel="noreferrer">
                    <img
                      src="/vector/linkedin.svg"
                      alt="LinkedIn"
                      className="w-5 h-5 hover:opacity-80 transition"
                    />
                  </a>
                  <a href={person.github} target="_blank" rel="noreferrer">
                    <img
                      src="/vector/github.svg"
                      alt="GitHub"
                      className="w-5 h-5 hover:opacity-80 transition"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div className="text-center mt-16">
   
        <button
      onClick={() => navigate("/team")}
      className="bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto hover:bg-blue-500/90 transition shadow-lg hover:cursor-pointer"
    >
      <img src="/vector/profile.png" alt="" />
      View More
    </button>
      </div>
    </section>
  );
}
