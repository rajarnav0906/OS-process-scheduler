import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D1117] text-gray-300 border-t border-gray-700 relative z-10 font-mono">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        
        <div>
          <h2 className="text-xl font-bold text-cyan-400">
            OS Process Scheduler
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            An interactive visualizer for Operating System scheduling algorithms.  
            Learn, simulate, and understand core concepts better.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-5 text-lg">
            <a
              href="https://github.com/rajarnav0906"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/arnav-raj-04211a216/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/arnav_0906/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:2022ugpi009@nitjsr.ac.in"
              className="hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-cyan-400 transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/simulation"
                className="hover:text-cyan-400 transition-colors"
                onClick={() => window.scrollTo(0, 0)}
              >
                Start Simulation
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">
            About Project
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Built with MERN stack and styled using Tailwind CSS.  
            Designed for learning and showcasing Operating System concepts interactively.
          </p>
        </div>
      </div>

      
      <div className="text-center border-t border-gray-700 py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} OS Process Scheduler. All rights reserved.
      </div>
    </footer>
  );
}
