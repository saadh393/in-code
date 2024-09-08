import React from "react";

function PGArguments() {
  const list = [
    {
      arg: "-a:",
      description: "List all containers (running and stopped).",
    },
    {
      arg: "-q:",
      description: "Only display numeric IDs of containers",
    },
    {
      arg: "-a:",
      description: "List all containers (running and stopped).",
    },
  ];
  return (
    <div className="max-w-sm">
      <h3>Available Arguments</h3>

      <div className="relative">
        <ul>
          {list.map((item) => (
            <li key={item.arg}>
              {item.arg} - {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PGArguments;
