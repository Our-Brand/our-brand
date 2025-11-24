import { useState } from "react";

const WebsiteGenerator = () => {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    const baseUrl = "https://lovable.dev/?autosubmit=true";

    const hashPrompt = `chatinput=${encodeURIComponent(prompt)}`;

    const finalUrl = `${baseUrl}#${hashPrompt}`;
    console.log(finalUrl);
    window.open(finalUrl);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Lovable API Generator</h2>

      <input
        type="text"
        className="border p-2 w-full rounded text-black"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Lovable URL
      </button>
    </div>
  );
};

export default WebsiteGenerator;
