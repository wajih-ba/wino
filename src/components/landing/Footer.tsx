import { Linkedin, Mail, Wine } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10 mt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-lg text-[var(--teal)]">
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--teal)] text-white">
                <Wine className="h-5 w-5" />
              </span>
              Wino
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A modern desktop driving school management system, designed by a small team
              that cares about craft.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href="https://www.linkedin.com/company/nextvese/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:text-foreground text-muted-foreground transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:wiiinoo12345@gmail.com"
                className="p-2 rounded-lg glass hover:text-foreground text-muted-foreground transition"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Product</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-foreground text-muted-foreground transition">Features</a></li>
              <li><a href="#tech" className="hover:text-foreground text-muted-foreground transition">Tech Stack</a></li>
              <li><a href="https://github.com/nesrinemil/wino.git" className="hover:text-foreground text-muted-foreground transition">Download</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Company</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#team" className="hover:text-foreground text-muted-foreground transition">Team</a></li>
              <li><a href="mailto:wiiinoo12345@gmail.com" className="hover:text-foreground text-muted-foreground transition">wiiinoo12345@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Wino Team. All rights reserved.</div>
          <div>Built with passion using Qt Framework.</div>
        </div>
      </div>
    </footer>
  );
}
