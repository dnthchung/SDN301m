import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-copy-primary">Theme Switcher</h1>
      <div className="flex space-x-4">
        <button onClick={() => handleModeChange("light")} className="px-4 py-2 bg-cta text-cta-text rounded">
          Light Mode
        </button>
        <button onClick={() => handleModeChange("dark")} className="px-4 py-2 bg-cta text-cta-text rounded">
          Dark Mode
        </button>
        <button onClick={() => handleModeChange("red")} className="px-4 py-2 bg-cta text-cta-text rounded">
          Red Mode
        </button>
      </div>
      <div className="mt-8">
        <p className="text-copy-primary">This is a sample text to demonstrate the current theme.</p>
        <p className="text-copy-secondary">Change the theme using the buttons above.</p>
      </div>
    </div>
  );
};

export default App;
