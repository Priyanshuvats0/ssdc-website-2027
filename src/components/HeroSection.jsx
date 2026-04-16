import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DotLottiePlayer } from '@dotlottie/react-player';

// --- NEW AUTHENTIC TERMINAL TYPING EFFECT ---
const TypingLine = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    const startTimeout = setTimeout(() => {
      setShowCursor(true); 
      
      const typeChar = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(typeChar, 30); 
        } else {
          setShowCursor(false); 
        }
      };
      typeChar();
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <div className="font-mono text-[#4AF626] text-sm sm:text-base break-all sm:break-normal">
      <span>{displayedText}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-2 h-4 sm:h-5 bg-[#4AF626] ml-1 -mb-0.5"
        />
      )}
    </div>
  );
};

const HeroSection = () => {
  const npmOutput = `> fancy-output@1.0.0 postinstall /private/tmp/fancy-output
> node -e "console.log('\\n Successfully installed! You are ready to code, eat, and repeat!\\n')"`;

  const pipOutput = `Collecting learn
Downloading learn-0.1.0-py3-none-any.whl (2.5 kB)`;

  return (
    <div id="home" className="h-auto min-h-[80vh] border-b-2 border-gray-600 pt-10 pb-8">
      
      {/* Terminal Header - Changed to a sleek dark charcoal (#1a1a1a) */}
      <div className="w-full bg-[#1a1a1a] px-4 py-2 flex gap-3 h-10 items-center rounded-t-lg shadow-md border border-gray-800 border-b-0">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></span>
        </div>
        <span className="text-sm text-gray-400 font-mono tracking-wide">you@ssdc:~</span>
      </div>

      {/* Hero Content - Changed to a deep midnight off-black (#0d0d0d) */}
      <div className="pt-6 flex flex-col lg:flex-row gap-8 lg:gap-12 bg-[#0d0d0d] border border-gray-800/80 rounded-b-lg p-6 shadow-2xl">
        <div className="lg:w-1/2 flex flex-col gap-8">
        
          {/* NPM Install Section */}
          <section className="order-2 lg:order-1 font-mono">
            <TypingLine text="you@ssdc:~$ npm install code, eat, repeat" delay={0} />
            <motion.pre
              className="whitespace-pre-wrap font-thin sm:text-sm tracking-tight pl-2 pt-2 text-[#60a5faef]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.01 }} 
            >
              {npmOutput}
            </motion.pre>
          </section>

          {/* PIP Install Section */}
          <section className="order-3 lg:order-2 font-mono">
            <TypingLine text="you@ssdc:~$ pip install learn, grow" delay={2} />
            <motion.pre
              className="whitespace-pre-wrap font-thin tracking-tight sm:text-sm pl-2 pt-2 text-[#60a5faef]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.01 }}
            >
              {pipOutput}
            </motion.pre>
          </section>

          {/* Welcome Text */}
          <section className="ml-0 lg:ml-4 mt-8 text-center lg:text-left order-1 lg:order-3">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide text-white">
              SSDC Welcomes You
            </h1>
            <p className="text-gray-400 tracking-normal mt-6 leading-relaxed sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0">
              The only coding club in our college! Dedicated to Information Technology. 
              We are a group of passionate students who are exploring the exciting world of coding and technology.
            </p>
          </section>
        </div>

        {/* Hero Image/Lottie */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end items-center">
          <DotLottiePlayer
            src="/animations/hero.lottie"
            autoplay
            loop
            className="brightness-85 drop-shadow-2xl"
            style={{ height: '100%', width: '100%', maxWidth: '450px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;