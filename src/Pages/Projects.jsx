import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsCatalog } from "../data/projects";

const stats = [
  { label: "Projects", value: projectsCatalog.length },
  { label: "Shipped", value: projectsCatalog.filter((project) => project.status === "Shipped").length },
  { label: "In progress", value: projectsCatalog.filter((project) => project.status === "In Progress").length },
];

const statusTone = {
  Shipped: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
  "In Progress": "text-cyan-200 border-cyan-400/20 bg-cyan-400/10",
  Prototype: "text-amber-200 border-amber-400/20 bg-amber-400/10",
  Concept: "text-violet-200 border-violet-400/20 bg-violet-400/10",
};

const Projects = () => {
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
              SSDC / Projects
            </div>

            <h1 className="mt-6 font-['Bebas_Neue'] text-5xl leading-none sm:text-7xl lg:text-8xl">
              Projects that
              <span className="block text-cyan-300">show what we build.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              This page is set up with dummy project data for now. It is ready to grow into a
              real showcase of student-built tools, apps, and club experiments.
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
              href="#all-projects"
              className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              Explore projects
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

      <section id="all-projects" className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70">
                Featured work
              </p>
              <h2 className="mt-2 font-['Bebas_Neue'] text-4xl sm:text-5xl">
                {projectsCatalog.length} dummy projects
              </h2>
            </div>
            <div className="hidden sm:block font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/30">
              Replace these with real builds later
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projectsCatalog.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <div className="relative h-44 overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,210,255,0.35),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
                  <div className="absolute inset-0 flex items-end justify-between p-5">
                    <span className={`rounded-full border px-3 py-1 text-[0.62rem] font-mono uppercase tracking-[0.22em] ${statusTone[project.status]}`}>
                      {project.status}
                    </span>
                    <span className="text-[0.62rem] font-mono uppercase tracking-[0.22em] text-white/30">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.62rem] font-mono uppercase tracking-[0.18em] text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="text-[0.62rem] font-mono uppercase tracking-[0.22em] text-white/30">
                      Impact
                    </div>
                    <div className="mt-2 text-sm text-cyan-200/90">{project.impact}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/70">
            Next step
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl">
                Ready to swap the dummy projects for real ones?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">
                I can connect this page to real project data, add detail pages, or make filters for
                category, status, and tech stack.
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

export default Projects;
