import React from "react";
import PGSidebar from "../../components/Playground/PGSidebar";
import PGArguments from "../../components/Playground/PGArguments";
import TypeBox from "../../components/TypeBox/TypeBox";
import PGround from "@/components/Playground/PGround";

function Playground() {
  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        <PGSidebar />
        <PGround />
        <PGArguments />
      </div>
    </section>
  );
}

export default Playground;
