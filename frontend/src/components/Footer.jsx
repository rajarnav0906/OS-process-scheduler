import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black/95 text-gray-300 border-t border-gray-700 relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Branding */}
        <div>
          <h2 className="text-xl font-bold text-blue-400">OS Process Scheduler</h2>
          <p className="mt-2 text-sm text-gray-400">
            An interactive visualizer for Operating System scheduling algorithms.  
            Learn, simulate, and understand core concepts better.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-lg">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:yourmail@example.com"
              className="hover:text-blue-400"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400" onClick={() => window.scrollTo(0, 0)}>Home</Link>
            </li>
            <li>
              <Link to="/simulation" className="hover:text-blue-400" onClick={() => window.scrollTo(0, 0)}>Start Simulation</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">About Project</h3>
          <p className="text-sm text-gray-400">
            Built with MERN stack and styled using Tailwind CSS.  
            Created for learning and showcasing Operating System concepts interactively.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-gray-700 py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} OS Process Scheduler. All rights reserved.
      </div>
    </footer>
  );
}
