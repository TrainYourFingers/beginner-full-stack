import React from "react";

function Modal({ children }) {
  return (
    <section className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center bg-[#0000005c] z-20">
      {children}
    </section>
  );
}

export default Modal;
