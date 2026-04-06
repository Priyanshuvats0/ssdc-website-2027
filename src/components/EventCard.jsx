import { Link } from "react-router-dom";
const EventCard = ({ event }) => (
  <div
    className="relative bg-[#1d2027] overflow-hidden shadow-md w-[370px] h-[520px] mx-8 my-6 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-blue-400/30"
    style={{
      borderRadius: '12px',
      border: '1px solid rgba(59, 130, 246, 0.10)'
    }}
  >
    <div className="relative w-full h-56">
      <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          opacity: 0.8,
          background: 'linear-gradient(180deg, rgba(23, 37, 84, 0.20) 0%, rgba(23, 37, 84, 0.00) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  <div className="px-4 pt-4 pb-2 text-white relative">
      <span
        className="text-base font-medium px-4 py-1 bg-[#293141] rounded-[25px] border border-[rgba(59,130,246,0.10)] text-[#93C5FD] inline-block"
      >
        {event.type}
      </span>
      <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
      <p className="text-base font-medium mt-1 text-[#9CA3AF]">{event.description}</p>
      <div className="flex flex-col gap-2 mt-3 text-[#9CA3AF]">
        <div className="flex items-center text-sm font-semibold gap-2">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-11 8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12z" />
            </svg>
            {event.date}
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.21-1.79-4-4-4z" />
            </svg>
            {event.location}
          </span>
        </div>
  <div className="flex items-center text-sm font-semibold gap-2">
          <span className="flex items-center gap-1">
            <span className="inline-block text-purple-300">👥</span>
            {event.participants}
          </span>
        </div>
      </div>
      <div className="flex mt-6">
        <Link
          to={`/event/${event.id}`}
          className="bg-blue-500 rounded-full flex items-center justify-center w-14 h-10 hover:bg-blue-600 transition-colors border-none outline-none shadow-lg"
          title="View Details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 14L22 2.5M17.5 2.5H22v4.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8a3 3 0 0 1 3-3h5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 8v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-5" />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

export default EventCard;
