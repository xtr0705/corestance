import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ value, duration = 1.2 }) {
  const motionValue = useMotionValue(0);

  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
    });

    return () => controls.stop();
  }, [value]);

  return <span>{rounded}</span>;
}

export default AnimatedNumber;