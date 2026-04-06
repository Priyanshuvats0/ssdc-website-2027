import { motion } from "framer-motion";

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
      className="whitespace-pre-wrap font-thin text-[#4AF626] text-sm sm:text-base"
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
  return (
    <div id="home" className="h-auto min-h-[80vh] border-b-2 pt-36 pb-8">
    
      <div className="w-full bg-gray-700 px-4 py-2 flex gap-3 h-10 items-center rounded-t-md">
        <div className="flex gap-2">
          <section className="w-3 h-3 bg-green-500 rounded-full"></section>
          <section className="w-3 h-3 bg-yellow-500 rounded-full"></section>
          <section className="w-3 h-3 bg-red-500 rounded-full"></section>
        </div>
        <span className="text-sm">you@ssdc</span>
      </div>

      
      <div className="pt-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/2 flex flex-col gap-8">
        
          <section className="order-2 lg:order-1">
            <TypingLine text="you@ssdc:~$ npm install code, eat, repeat" delay={0} />
            <motion.pre
              className="whitespace-pre-wrap font-thin sm:text-sm tracking-tighter pl-2 text-[#60a5faef]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.1 }}
            >
              &lt; fancy-output@1.0.0 postinstall /private/tmp/fancy-output &gt;
              node -e "console.log('\n\n🎉 Successfully installed! You are ready
              to code, eat, and repeat!\n\n')" + fancy-output@1.0.0 added 1
              package from 1 contributor and audited 1 package in 0.532s
            </motion.pre>
          </section>

        
          <section className="order-3 lg:order-2">
            <TypingLine text="you@ssdc:~$ pip install learn, grow" delay={2} />
            <motion.pre
              className="whitespace-pre-wrap tracking-tighter sm:text-sm pl-2 text-[#60a5faef]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.3, duration: 0.1 }}
            >
              Collecting learn <br /> Downloading learn-0.1.0-py3-none-any.whl (2.5 kB)
              Collecting grow Downloading grow-0.1.0-py3-none-any.whl (2.5 kB)
              Installing collected packages: learn, grow Successfully installed
              learn-0.1.0 grow-0.1.0
            </motion.pre>
          </section>

      
          <section
            className="ml-0 lg:ml-8 mt-12 text-center lg:text-left order-1 lg:order-3"
          >
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-wide">
              SSDC Welcomes You
            </h1>

            <p className="text-gray-300 tracking-tighter mt-8 leading-tight sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0">
              The only coding club in our college! Dedicated to Information
              Technology. We are a group of passionate students who are
              exploring the exciting world of coding and technology.
            </p>
          </section>
        </div>

        {/* GIF */}
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <img
            className="max-w-[200px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[454px] h-auto lg:ml-52"
            src="/gif/landingGif.gif"
            alt="Landing GIF"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
