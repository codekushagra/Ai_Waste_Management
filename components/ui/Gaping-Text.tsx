import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function GapingText({ text }: { text: string }) {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
      >
        <AnimatePresence>
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { opacity: 0, x: -18 },
                animate: {
                  opacity: 1,
                  x: 0,
                  paddingRight: "1.5px",
                },
              }}
              transition={{ duration: 0.01 }}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
