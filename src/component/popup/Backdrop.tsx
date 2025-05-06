import React from "react";

const BackDrop: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div
      className="fixed w-full h-full bg-zinc-950/50 inset-0 z-100 md:hidden block"
      onClick={onClick}
      style={{
        backdropFilter: "blur(2px)",
      }}
    />
  );
};

export default BackDrop;
