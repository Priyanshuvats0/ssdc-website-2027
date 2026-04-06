import { workshops, events } from "../data/events";
import EventSection from "../components/EventSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const EventPage = () => (
  <>
  <Navbar/>
  <div className="bg-[#181a20] min-h-screen p-8 pt-28">
    <h1 className="text-3xl font-bold text-center text-white mb-2">Upcoming and Past Events</h1>
    <p className="text-center text-gray-400 mb-8">some text or tagline..........</p>
    <EventSection title="Workshops" events={workshops} />
  </div>
  <Footer/>
  </>
);

export default EventPage;
