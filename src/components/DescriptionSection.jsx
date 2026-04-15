const DescriptionSection = () => {
  const fullText = `SLIET Software Development Club (SSDC), is a Departmental Club of
  Computer Science & Engineering, SLIET Longowal. This club was founded
  by CSE - 2017 undergrads. The team currently comprises of 40+
  developers. The team aims to brush up the coding skills in young
  enthusiasts, with major goals to crack the latest Coding Contests,
  Challenges & Interviews without any reluctance landing them in some
  decent technical job prospects. In due course of grooming its pupils,
  the club focuses on a project-oriented approach in diverse fields (Web
  Development, App Development, Machine Learning, Cybersecurity, etc.) to
  ensure holistic development of its members. Furthermore, the club
  organises workshops and monthly coding competitions for college students
  as well which in turn helps us discover young wizards in IT fields.`;

  const shortText = `SLIET Software Development Club (SSDC), is a Departmental Club of
  Computer Science & Engineering, SLIET Longowal. This club was founded
  by CSE - 2017 undergrads. The team currently comprises of 40+ developers.`;

  return (
    <div id="about" className="w-full flex flex-col md:flex-row items-center justify-between mt-16 border-b-2 border-gray-800 pb-16 gap-10">
    
      <div className="w-fit mx-10">
        {/* Added the forward slash here */}
        <img src="/vector/Loading.png" alt="..." className="p-2 rounded-xl" />
        <div className="flex justify-between text-2xl font-semibold gap-8 pl-12 pr-12 ">
          <div className="text-center text-3xl -mt-5">
            10+
            {/* Changed gray-600 to gray-400 for better contrast */}
            <div className="text-gray-400 leading-tight text-sm mt-2">
              Projects <br /> worked
            </div>
          </div>
          <div className="text-center text-3xl -mt-5">
            07+
            {/* Changed gray-600 to gray-400 for better contrast */}
            <div className="text-gray-400 leading-tight text-sm mt-2">
              Years of <br /> Establishment
            </div>
          </div>
        </div>
      </div>

    
      <div className="w-full md:w-1/2 px-6 md:px-0 md:mr-32">
    
        <p className="block md:hidden text-center text-base leading-relaxed text-gray-300">
          {shortText}
        </p>

        {/* Added text-gray-300 so the paragraph isn't pure white */}
        <p className="hidden md:block text-left md:text-lg leading-relaxed text-gray-300">
          {fullText}
        </p>
      </div>
    </div>
  );
};

export default DescriptionSection;