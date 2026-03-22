// Removed framer-motion here to avoid double-animating since App.jsx now handles global PageTransitions
const AnimatedPage = ({ children }) => {
  return <>{children}</>;
};

export default AnimatedPage;