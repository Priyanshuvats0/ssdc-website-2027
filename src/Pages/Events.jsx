import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EventCard from "../components/EventsV2/EventCard";
import { eventsCatalog } from "../data/eventsCatalog";

const makeIcon = (event) => {
  if (event.type === "Contest") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3L13.5 8.5L19.5 9.3L15 13.5L16.2 19.5L11 16.5L5.8 19.5L7 13.5L2.5 9.3L8.5 8.5L11 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3 17L8 12L12 15L19 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
};

const groups = [
  {
    title: "Contests",
    items: eventsCatalog.filter((event) => event.type === "Contest"),
  },
  {
    title: "Workshops",
    items: eventsCatalog.filter((event) => event.type === "Workshop"),
  },
];

const stats = [
  { label: "Total events", value: eventsCatalog.length },
  { label: "Contests", value: eventsCatalog.filter((event) => event.type === "Contest").length },
  { label: "Workshops", value: eventsCatalog.filter((event) => event.type === "Workshop").length },
];

export const Events = () => {
  return (
    <div className="bg-[#03040a] text-white">
      <section
        className="relative overflow-hidden border-b border-white/10 px-4 sm:px-6 lg:px-10 pt-28 pb-16"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(0,210,255,0.14), transparent 35%), radial-gradient(circle at top right, rgba(0,120,255,0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 50%)",
        }}
      >
        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-[0.62rem] font-mono uppercase tracking-[0.28em] text-cyan-200/80">
              SSDC / Events
            </div>

            <h1 className="mt-6 font-['Bebas_Neue'] text-5xl leading-none sm:text-7xl lg:text-8xl">
              All the events
              <span className="block text-cyan-300">in one place.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Browse the contests and workshops we’ve hosted. This page pulls from the same
              event data used on the homepage, so it stays consistent as the club grows.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
              >
                <div className="font-mono text-[0.64rem] uppercase tracking-[0.25em] text-white/35">
                  {stat.label}
                </div>
                <div className="mt-3 text-4xl font-semibold text-white">
                  {String(stat.value).padStart(2, "0")}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#all-events"
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              Explore events
            </a>
            <Link
              to="/"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section id="all-events" className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-6xl space-y-14">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70">
                    {group.title}
                  </p>
                  <h2 className="mt-2 font-['Bebas_Neue'] text-4xl sm:text-5xl">
                    {group.items.length} {group.items.length === 1 ? "event" : "events"}
                  </h2>
                </div>
                <div className="hidden sm:block font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/30">
                  Latest club activity
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((event) => (
                  <EventCard key={event.id} event={{ ...event, icon: makeIcon(event) }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70">
            Want the next event?
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl">
                We can keep this page updated as your event list grows.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">
                If you want, I can also add a search bar, category filters, or a dedicated
                details page for each event.
              </p>
            </div>
            <Link
              to="/team"
              className="inline-flex items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/5 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
