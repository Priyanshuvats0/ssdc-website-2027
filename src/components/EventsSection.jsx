import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";

const EventsSection =()=> {
  const events = [
    {
      id: 1,
      title: "AI Square Speedathon 2025",
      description:
        "Speed is your weapon, AI is your ally—can you outpace the rest in this Dev Contest?",
      date: "March 11, 2025",
      location: "IIT Delhi",
      participants: "100+ Participants",
      prize: "₹50K+",
      image: "/images/speedathon.png", 
    },
    {
      id: 2,
      title: "AI Square Speedathon 2025",
      description:
        "Speed is your weapon, AI is your ally—can you outpace the rest in this Dev Contest?",
      date: "March 11, 2025",
      location: "IIT Delhi",
      participants: "100+ Participants",
      prize: "₹50K+",
      image: "/images/speedathon.png",
    },
    {
      id: 3,
      title: "AI Square Speedathon 2025",
      description:
        "Speed is your weapon, AI is your ally—can you outpace the rest in this Dev Contest?",
      date: "March 11, 2025",
      location: "IIT Delhi",
      participants: "100+ Participants",
      prize: "₹50K+",
      image: "/images/speedathon.png",
    },
  ];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/event");
    window.scrollTo(0, 0); 
  };

  return (
    <section  id="events" className="bg-black text-white py-16 px-6 border-b-2">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Upcoming and Past Events</h2>
        <p className="text-gray-400 mb-10">some text or tagline.........</p>

        <div className="grid md:grid-cols-3 gap-8">
           {/* {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))} */}
        {/* Previous code pls dont remove it */}
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#0a0a0a] rounded-2xl shadow-lg overflow-hidden border border-gray-800 hover:shadow-xl transition"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-44 object-cover"
                />
                
              </div>
              <div className="p-5 flex flex-col justify-start items-start">
                <span className="inline-block bg-blue-900 text-blue-200 text-xs px-3 py-1 rounded-full mb-2">
                  Competition
                </span>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{event.description}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <img src="/vector/Events/calendar.png" alt="calendar" className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/vector/Events/location.png" alt="location" className="w-4 h-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/vector/Events/users.png" alt="users" className="w-4 h-4" />
                    {event.participants}
                  </div>
                </div>
                <div className="mt-5">
                  <button className="flex items-center gap-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl">
                    <img src="/vector/Events/external.png" alt="external" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
           <div className="text-center mt-16">
   
        <button
      onClick={handleClick}
      className="bg-blue-600/80 backdrop-blur-md text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto hover:bg-blue-500/90 transition shadow-lg hover:cursor-pointer"
    >
      
      View More
    </button>
      </div>
      </div>
    </section>
  );
}


export default EventsSection;