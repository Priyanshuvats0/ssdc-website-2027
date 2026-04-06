const DescriptionSection = () => {
  const fullText = `SLIET Software Development Club (SSDC), is a Departmental Club of
  Computer Science & Engineering, SLIET Longowal. This club was founded
  by CSE - 2017 undergrads. The team currently comprises of 40+
  developers. The team aims to brush up the coding skills in young
  enthusiasts, with major goals to crack the latest Coding Contests,
  Challenges & Interviews without any reluctance landing them in some
  decent technical job prospects. In due course of grooming it's pupils,
  the club focuses on project-oriented approach in diverse (Web
  Development, App Development, Machine Learning, Cybersecurity, etc) to
  ensure holistic development of it's members. Furthermore, the club
  organises workshops and monthly coding competitions for college students
  as well which in turn helps us discover young wizards in IT fields.`;

  const shortText = `SLIET Software Development Club (SSDC), is a Departmental Club of
  Computer Science & Engineering, SLIET Longowal. This club was founded
  by CSE - 2017 undergrads. The team currently comprises of 40+ developers.`;

  return (
    <div id="about" className="w-full flex flex-col md:flex-row items-center justify-between mt-16 border-b-2 pb-16 gap-10">
    
      <div className="w-fit mx-10">
        <img src="vector/Loading.png" alt="..." className="p-2 rounded-xl" />
        <div className="flex justify-between text-2xl font-semibold gap-8 pl-12 pr-12 ">
          <div className="text-center text-3xl -mt-5">
            10+
            <div className="text-gray-600 leading-tight text-sm mt-2">
              Projects <br /> worked
            </div>
          </div>
          <div className="text-center text-3xl -mt-5">
            07+
            <div className="text-gray-600 leading-tight text-sm mt-2">
              Years of <br /> Establishment
            </div>
          </div>
        </div>
      </div>

    
      <div className="w-full md:w-1/2 px-6 md:px-0 md:mr-32">
    
        <p className="block md:hidden text-center text-base leading-relaxed">
          {shortText}
        </p>

        <p className="hidden md:block text-center md:text-lg leading-relaxed">
          {fullText}
        </p>
      </div>
    </div>
  );
};

export default DescriptionSection;
