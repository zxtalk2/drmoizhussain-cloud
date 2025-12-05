"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/80">
      <div className="loader">
        <p className="loader-text">Loading</p>
        <span className="load"></span>
      </div>
      <style>{`
        .loader {
          width: 80px;
          height: 50px;
          position: relative;
        }

        .loader-text {
          position: absolute;
          top: 0;
          padding: 0;
          margin: 0;
          color: #a78bfa;
          animation: text_713 1.5s ease both infinite;
          font-size: .8rem;
          letter-spacing: 1px;
        }

        .load {
          background-color: #8a2be2;
          border-radius: 50px;
          display: block;
          height: 16px;
          width: 16px;
          bottom: 0;
          position: absolute;
          transform: translateX(64px);
          animation: loading_713 1.5s ease both infinite;
        }

        .load::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: #c4b5fd;
          border-radius: inherit;
          animation: loading2_713 1.5s ease both infinite;
        }

        @keyframes text_713 {
          0% {
            letter-spacing: 1px;
            transform: translateX(0px);
          }
          40% {
            letter-spacing: 2px;
            transform: translateX(26px);
          }
          80% {
            letter-spacing: 1px;
            transform: translateX(32px);
          }
          90% {
            letter-spacing: 2px;
            transform: translateX(0px);
          }
          100% {
            letter-spacing: 1px;
            transform: translateX(0px);
          }
        }

        @keyframes loading_713 {
          0% {
            width: 16px;
            transform: translateX(0px);
          }
          40% {
            width: 100%;
            transform: translateX(0px);
          }
          80% {
            width: 16px;
            transform: translateX(64px);
          }
          90% {
            width: 100%;
            transform: translateX(0px);
          }
          100% {
            width: 16px;
            transform: translateX(0px);
          }
        }

        @keyframes loading2_713 {
          0% {
            transform: translateX(0px);
            width: 16px;
          }
          40% {
            transform: translateX(0%);
            width: 80%;
          }
          80% {
            width: 100%;
            transform: translateX(0px);
          }
          90% {
            width: 80%;
            transform: translateX(15px);
          }
          100% {
            transform: translateX(0px);
            width: 16px;
          }
        }
      `}</style>
    </div>
  );
}
