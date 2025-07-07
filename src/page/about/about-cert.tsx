import { useState } from "react";
import { CERTS, EDUCATION } from "./about-contents";

export default function Certs() {
  const [more, setMore] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-2">자격</p>
        <div className="grid md:grid-cols-3 gap-3 p-5 bg-zinc-950/40 rounded-xl">
          {[...(!more ? CERTS.slice(0, 6) : CERTS)].map((cert, idx) => (
            <p
              key={`${cert}:${idx}`}
              className="  text-xs md:text-sm flex gap-2 items-center text-zinc-300"
            >
              <span className="inline-block size-1 bg-teal-300/40 rounded-full" />
              {cert}
            </p>
          ))}
        </div>

        {!more && (
          <>
            <button
              onClick={() => setMore(true)}
              className="hover:text-teal-400 text-xs  text-teal-300 cursor-pointer mt-3"
            >
              더보기 ( 외 {CERTS.length - 6}개 )
            </button>
          </>
        )}
      </div>

      <div>
        <p className="mb-2">교육</p>
        <div className="flex flex-col gap-2 bg-zinc-950/40 p-5 rounded-xl">
          {EDUCATION.map((edu, idx) => (
            <div key={`${edu.year}:${idx}`} className="flex items-center gap-2">
              <span className="inline-block size-1 bg-teal-300/40 rounded-full" />
              <span className="text-sm">{edu.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
