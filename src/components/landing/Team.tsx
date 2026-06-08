import { Reveal } from "./Reveal";
import { Github, Linkedin } from "lucide-react";
import wajihPhoto from "@/assets/team/wajih.jpg";
import haninPhoto from "@/assets/team/hanin.jpg";
import mariemPhoto from "@/assets/team/mariem.jpg";
import nesrinePhoto from "@/assets/team/nesrine.jpg";
import houssemPhoto from "@/assets/team/houssem.jpg";
import borhenPhoto from "@/assets/team/borhen.jpg";

const team = [
  {
    name: "Houssem Boughzen",
    photo: houssemPhoto,
    github: "https://github.com/boughizane",
    linkedin: "https://www.linkedin.com/in/boughizen-houssem/",
  },
  {
    name: "Hanin Bchir",
    photo: haninPhoto,
    github: "https://github.com/hanin-bchir",
    linkedin: "https://www.linkedin.com/in/haninbchir-engineer/",
  },
  {
    name: "Wajih Ben Haj Belgacem",
    photo: wajihPhoto,
    objectPosition: "center 20%",
    github: "https://github.com/wajih-ba",
    linkedin: "https://www.linkedin.com/in/wajih-ben-haj-belgacem-b9801233a/",
  },
  {
    name: "Maryam Chouchane",
    photo: mariemPhoto,
    github: "",
    linkedin: "https://www.linkedin.com/in/maryem-chouchane-0ba428385/",
  },
  {
    name: "Nesrine Miled",
    photo: nesrinePhoto,
    github: "https://github.com/nesrinemil",
    linkedin: "https://www.linkedin.com/in/nesrine-miled-a82579409/",
  },
  {
    name: "Borhen Bouznif",
    photo: borhenPhoto,
    github: "https://github.com/bourhen77",
    linkedin: "https://www.linkedin.com/in/bourhen-bouznif-901b5a203/",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--purple)] font-medium">
            Meet the team
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">
            Six builders. One <span className="text-gradient">vision</span>.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.07}>
              <div className="group glass-strong rounded-2xl p-6 hover:-translate-y-1 transition-all hover:shadow-[var(--shadow-elegant)]">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-2xl">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-full w-full object-cover"
                      style={m.objectPosition ? { objectPosition: m.objectPosition } : undefined}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-display font-semibold">{m.name}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 text-muted-foreground">
                  {m.github && (
                    <a
                      href={m.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg glass hover:text-foreground transition-colors"
                      aria-label={`${m.name} GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg glass hover:text-foreground transition-colors"
                    aria-label={`${m.name} LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
