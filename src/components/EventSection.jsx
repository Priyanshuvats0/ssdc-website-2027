import EventCard from "./EventCard";

const EventSection = ({ title, events }) => (
  <section className="mb-10">
    <div className="mb-4 flex">
      <span
        className="bg-[#13151a] text-[#60A5FA] ml-8 md:ml-16 lg:ml-24 flex items-center justify-center rounded-full border border-blue-400 text-xl font-semibold px-10 py-2 min-w-[120px] min-h-[48px]"
      >
        {title}
      </span>
    </div>
    <div className="flex flex-wrap justify-center mx-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  </section>
);

export default EventSection;
