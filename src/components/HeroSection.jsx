import { motion } from "framer-motion";
import { DotLottiePlayer } from '@dotlottie/react-player';

const TypingLine = ({ text, delay = 0 }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.pre
      className="whitespace-pre-wrap font-thin text-[#4AF626] text-sm sm:text-base font-mono"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.pre>
  );
};

const HeroSection = () => {
  // Moving terminal output to variables keeps the JSX clean 
  // and preserves the exact line breaks without needing <br /> tags.
  const npmOutput = `> fancy-output@1.0.0 postinstall /private/tmp/fancy-output
> node -e "console.log('\\n Successfully installed! You are ready to code, eat, and repeat!\\n')"`;

  const pipOutput = `Collecting learn
Downloading learn-0.1.0-py3-none-any.whl (2.5 kB)`;

  return (
    <div id="home" className="h-auto min-h-[80vh] border-b-2 border-gray-800 pt-10 pb-8">
      
      {/* Terminal Header */}
      <div className="w-full bg-gray-800 px-4 py-2 flex gap-3 h-10 items-center rounded-t-lg shadow-md border border-gray-700">
        <div className="flex gap-2">
          {/* Fixed macOS dot order and changed to span for better semantics */}
          <span className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></span>
        </div>
        <span className="text-sm text-gray-300 font-mono tracking-wide">you@ssdc:~</span>
      </div>

      {/* Hero Content */}
      <div className="pt-6 flex flex-col lg:flex-row gap-8 lg:gap-12 bg-black border-x border-b border-gray-800 rounded-b-lg p-6 shadow-xl">
        <div className="lg:w-1/2 flex flex-col gap-8">
        
          {/* NPM Install Section */}
          <section className="order-2 lg:order-1 font-mono">
            <TypingLine text="you@ssdc:~$ npm install code, eat, repeat" delay={0} />
            <motion.pre
              className="whitespace-pre-wrap font-thin sm:text-sm tracking-tight pl-2 pt-2 text-[#60a5faef]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.1 }}
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
              transition={{ delay: 3.3, duration: 0.1 }}
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

        {/* Hero Image/GIF */}
        {/* <div className="lg:w-1/2 flex justify-center lg:justify-end items-center">
          <img
            className="max-w-[200px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[450px] h-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
            src="/gif/landingGif.gif"
            alt="Animated illustration of a developer"
          />
        </div> */}
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