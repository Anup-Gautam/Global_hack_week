import React, { useState, useEffect } from "react";
import { LightbulbIcon } from "lucide-react";

const productivityTips = [
  {
    tip: "Try the 2-minute rule: If it takes less than 2 minutes, do it now.",
    category: "Time Management",
  },
  {
    tip: "Break large tasks into smaller, manageable chunks.",
    category: "Task Management",
  },
  {
    tip: "Use the Pomodoro Technique: 25 minutes of focus, then a 5-minute break.",
    category: "Focus",
  },
  {
    tip: "Remove distractions before starting important tasks.",
    category: "Environment",
  },
  {
    tip: "Start your day by completing your most challenging task.",
    category: "Planning",
  },
  {
    tip: "Take regular breaks to maintain mental freshness.",
    category: "Wellbeing",
  },
  {
    tip: "Set specific goals instead of vague objectives.",
    category: "Goal Setting",
  },
  {
    tip: "Keep a done list alongside your to-do list.",
    category: "Motivation",
  },
  {
    tip: "Schedule your tasks based on your energy levels throughout the day.",
    category: "Energy Management",
  },
  {
    tip: "Practice mindfulness to improve focus and reduce stress.",
    category: "Mental Health",
  },
];

export const ProductivityTip: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(productivityTips[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomTip =
        productivityTips[Math.floor(Math.random() * productivityTips.length)];
      setCurrentTip(randomTip);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
        <LightbulbIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
        <div>
          <p className="text-green-800 font-medium">{currentTip.tip}</p>
          <span className="text-sm text-green-600">
            Category: {currentTip.category}
          </span>
        </div>
      </div>
    </div>
  );
};
