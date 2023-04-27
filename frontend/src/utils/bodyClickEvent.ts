const bodyClickEvent = (f: (e: MouseEvent) => void) => {
  return () => {
    document.body.addEventListener("click", f);
    
    return () => {
      window.removeEventListener("click", f);
    };
  };
};

export default bodyClickEvent;
