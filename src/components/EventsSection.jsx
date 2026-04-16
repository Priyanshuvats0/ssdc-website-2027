import React from "react";

// Moved data outside the component for better performance
const events = [
  {
    id: 1,
    title: "Athlos 03",
    type: "Contest",
    description:
      "Ready to test your coding skills? Join the upcoming coding contest and put your problem solving abilities to the test. Compete with fellow students and challenge yourself!",
    date: "March 17, 2026",
    time: "08:00 PM",
    participation: "Individual",
    prize: "₹10,000+ & Goodies",
    image: "/images/events/athlos.png",
  },
  {
    id: 2,
    title: "Intro to Competitive Programming",
    type: "Workshop",
    description:
      "Kickstart your CP journey! Learn the fundamentals of time complexity, the C++ Standard Template Library (STL), and basic data structures to start solving problems efficiently.",
    date: "February 20, 2026",
    time: "05:00 PM",
    participation: "Open to All",
    prize: "Mentorship",
    image: "/images/events/cp.png",
  },
  {
    id: 3,
    title: "Advanced CP Strategies",
    type: "Workshop",
    description:
      "Master advanced algorithms, dynamic programming, and graph theory to ace your upcoming coding interviews and dominate highly competitive coding contests.",
    date: "March 05, 2026",
    time: "06:30 PM",
    participation: "Intermediate",
    prize: "Certificates",
    image: "/images/events/workshop.png",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="bg-black text-white py-16 px-6 border-b-2 border-gray-600">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">Upcoming & Past Events</h2>
        <p className="text-gray-400 mb-12">Discover our latest workshops, contests, and coding challenges.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#0a0a0a] rounded-2xl shadow-lg overflow-hidden border border-gray-800 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 text-left group flex flex-col"
            >
              {/* Event Image */}
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Event Content */}
              <div className="p-6 flex flex-col flex-grow justify-start items-start">
                <span className="inline-block bg-blue-900/30 text-blue-400 border border-blue-800/50 text-xs px-3 py-1 rounded-full mb-4">
                  {event.type}
                </span>
                
                <h3 className="text-xl font-semibold mb-2 text-white">{event.title}</h3>
                
                {/* line-clamp-3 ensures descriptions stay the same height even if text length varies */}
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                {/* Clean, icon-free data table layout */}
                <div className="mt-auto w-full space-y-2 text-sm text-gray-300 bg-[#111111] p-4 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-200">{event.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium text-gray-200">{event.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Format:</span>
                    <span className="font-medium text-gray-200">{event.participation}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-800">
                    <span className="text-gray-500">Prizes:</span>
                    {/* Using your terminal green color for the prize to make it pop! */}
                    <span className="font-medium text-[#4AF626]">{event.prize}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;