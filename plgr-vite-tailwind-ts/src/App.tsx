import { useState, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [darkMode]);

  return (
    <>
      <main className="py-10 h-screen">
        <h1 className="font-bold text-center mb-6 text-black dark:text-white">Dark / Light Mode Handler</h1>
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 border p-6 rounded-lg shadow-xl max-w-xs w-full">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Dark Mode</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est ipsum sed blanditiis iste molestias nemo nobis repellendus nisi dolorum itaque optio impedit cum voluptatem facilis minima,
              quasi laborum. Nihil, quaerat.
            </p>
            <button className="w-full text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-opacity-90">Sign Up</button>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={() => setDarkMode(!darkMode)} className="bg-purple-600 text-white py-2 px-4 rounded-lg">
            Toggle Dark Mode
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
