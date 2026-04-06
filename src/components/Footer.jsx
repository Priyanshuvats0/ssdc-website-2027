import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
    
        <div>
          <h2 className="text-white text-lg font-semibold">SSDC SLIET</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Building a culture of software development and innovation.
          </p>
        </div>

      
        <div>
          <h3 className="text-white text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Events & Workshops
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500 transition">
                Our Team
              </a>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-white text-lg font-semibold">Contact</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              <span>Email@gmail.ac.in</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              <span>148106</span>
            </li>
          </ul>
        </div>

    
        <div>
          <h3 className="text-white text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            {["youtube", "instagram", "linkedin", "github"].map(
              (platform) => (
                <a
                  key={platform}
                  href="#"
                  className="p-2 rounded-full border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition"
                >
                  <img
                    src={`/vector/${platform}.svg`}
                    alt={platform}
                    className="w-5 h-5"
                  />
                </a>
              )
            )}
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Stay updated with our latest news, events, and projects!
          </p>
        </div>
      </div>

    
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>© 2025 SSDC. All rights reserved.</p>
        <p className="mt-1">
          Made with <span className="text-blue-500">❤</span> by{" "}
          <span className="text-white font-medium">SSDC SLIET</span>
        </p>
      </div>
    </footer>
  );
}
