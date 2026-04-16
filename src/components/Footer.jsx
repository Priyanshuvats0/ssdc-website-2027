import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  // Array of your official social links
  const socialLinks = [
    {
      name: "instagram",
      url: "https://www.instagram.com/ssdc.sliet/",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/company/sliet-software-developement-club/",
    },
    {
      name: "github",
      url: "https://github.com/ssdc-sliet",
    },
  ];

  return (
    <footer id="contact" className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
    
        {/* Brand Section */}
        <div>
          <h2 className="text-white text-lg font-semibold">SSDC SLIET</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Building a culture of software development and innovation.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white text-lg font-semibold">Contact</h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              {/* Made the email clickable so it opens their mail app */}
              <a href="mailto:sliet.ssdc@gmail.com" className="hover:text-blue-500 transition">
                sliet.ssdc@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              <span>148106</span>
            </li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-white text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-3">
            {socialLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 transition flex items-center justify-center"
              >
                <img
                  src={`/vector/${platform.name}.svg`}
                  alt={platform.name}
                  className="w-5 h-5"
                />
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Stay updated with our latest news, events, and projects!
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        <p>© 2026 SSDC. All rights reserved.</p>
      </div>
    </footer>
  );
}