import React, { useEffect, useRef } from "react";

// Wraps raw HTML and asks MathJax (v2) to typeset it after render
export default function MathJaxContent({ html }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.MathJax && window.MathJax.Hub && containerRef.current) {
      try {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, containerRef.current]);
      } catch (e) {
        // fail silently; content will still show as plain text
        console.error("MathJax typeset error", e);
      }
    }
  }, [html]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
}
