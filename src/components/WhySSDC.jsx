import React from "react";

// 1. Moved the data array OUTSIDE the component so it doesn't re-render unnecessarily
const moto = [
  {
    icon: "/vector/ThirdCard/learn.png", // Added forward slash
    title: "Learn",
    des: "Master modern technologies through hands-on projects and workshops",
  },
  {
    icon: "/vector/ThirdCard/inovate.png", 
    title: "Innovate",
    des: "Build solutions that impact thousands of students",
  },
  {
    icon: "/vector/ThirdCard/connect.png", 
    title: "Connect",
    des: "Join a vibrant community of passionate developers",
  },
  {
    icon: "/vector/ThirdCard/grow.png", 
    title: "Grow",
    des: "Launch your tech career with industry exposure",
  },
];

const WhySSDC = () => {
  return (
    // Changed pb-18 to pb-20 and added border-gray-800
    <div className="w-full flex flex-col gap-10 justify-center mt-16 border-b-2 border-gray-800 pb-20">
      <h1 className="text-center text-white font-bold tracking-wide py-2 text-4xl">
        Why SSDC?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        {moto.map((item, index) => (
          <WhyssdcCard
            icon={item.icon}
            title={item.title}
            des={item.des}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

const WhyssdcCard = ({ icon, title, des }) => {
  return (
    <div className="w-[296px] h-[206px] flex flex-col gap-3 justify-start items-start 
                    bg-[#1e293b33] p-5 rounded-[12px] 
                    border border-[#334155] 
                    hover:border-[#3B82F6] 
                    hover:bg-[#1e293b66] 
                    hover:shadow-lg 
                    transition-all duration-300 
                    cursor-pointer group hover:scale-105">
      <img
        src={icon}
        alt={title} // Better accessibility
        className="size-[32px] transition-transform duration-300 group-hover:rotate-6"
      />
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      <p className="text-sm text-gray-300">{des}</p>
    </div>
  );
};

export default WhySSDC;