import React, { useState, useEffect } from "react";

const buzzwords = [
  "synergizing",
  "leveraging",
  "optimizing",
  "implementing",
  "strategizing",
  "innovating",
  "disrupting",
  "streamlining",
  "revolutionizing",
  "transforming",
];

const subjects = [
  "cross-platform initiatives",
  "paradigm shifts",
  "core competencies",
  "best practices",
  "growth strategies",
  "digital transformations",
  "value propositions",
  "market dynamics",
  "customer experiences",
  "business ecosystems",
];

const outcomes = [
  "maximize ROI",
  "drive engagement",
  "enhance productivity",
  "accelerate growth",
  "ensure compliance",
  "optimize performance",
  "foster innovation",
  "scale operations",
  "boost efficiency",
  "achieve synergy",
];

export const TaskGenerator: React.FC = () => {
  const [task, setTask] = useState("");

  const generateTask = () => {
    const buzzword = buzzwords[Math.floor(Math.random() * buzzwords.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    return `${buzzword} ${subject} to ${outcome}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTask(generateTask());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
      <p className="text-lg font-medium text-purple-800 capitalize">
        {task || generateTask()}
      </p>
      <p className="mt-2 text-sm text-purple-600 italic">
        * Randomly generating important-sounding tasks...
      </p>
    </div>
  );
};
