import React from "react";

function PGSidebar() {
  const list = [
    "Check Docker Version",
    "List Running Containers",
    "List All Containers",
    "Pull an Image from Docker Hub",
    "Run a Docker Container",
    "Run a Docker Container in Detached Mode",
    "Stop a Running Container",
    "Start a Stopped Container",
  ];
  return (
    <div className="max-w-sm">
      <h3>Practice Plots</h3>

      <div className="relative">
        <div className="overlay absolute right-0 h-full w-3/12 top-0 from-black/0 to-black/100 bg-gradient-to-r"></div>
        <ul>
          {list.map((item) => (
            <li key={item}>
              {">"} {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PGSidebar;
