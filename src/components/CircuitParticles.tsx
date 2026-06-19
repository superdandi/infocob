"use client";

const paths = [
  "M 341.3835 425.1339 L 341.3126 446.9117 L 344.6197 452.2673 L 366.8247 452.2674 L 370.0074 447.2581 L 370.0345 445.7056 L 370.0059 340.9937",
  "M 365.7079 341.3829 L 365.5109 441.2986 L 362.0126 446.6541 L 351.1774 446.7744 L 347.5644 440.9852 L 347.5858 413.1708 L 345.4999 410.9677 L 337.4548 410.8273 L 334.7815 413.2568 L 334.7093 426.2554",
  "M 354.5499 430.893 L 354.5639 412.3642 L 349.2781 404.8855 L 268.0443 404.8598 L 264.628 399.074 L 265.0309 341.0395",
  "M 352.7977 371.7157 L 352.8465 395.5074 L 349.3429 401.1724 L 272.1343 401.0622 L 268.3583 395.7343 L 268.7494 341.0395",
  "M 276.2908 341.0396 L 276.239 387.5572 L 279.6956 393.4562 L 336.5217 393.3652 L 339.8752 387.4303 L 339.8387 371.7989",
  "M 333.3286 363.5251 L 333.4368 383.9132 L 329.7785 389.5753 L 283.6301 389.6981 L 279.865 383.7514 L 279.6917 341.0396",
  "M 326.7196 371.1085 L 326.7284 380.5461 L 323.0728 386.0535 L 286.9466 385.887 L 283.6375 380.4126 L 284.0155 341.0396",
  "M 286.1902 413.017 L 265.6949 413.2386 L 261.0401 405.9956 L 261.1728 341.0395",
  "M 256.9773 341.0395 L 257.1214 414.6827 L 261.9322 421.2868 L 296.6867 421.1694",
  "M 286.8336 434.2443 L 282.7658 426.5768 L 256.7741 426.268 L 252.817 420.5481 L 253.5826 343.5212 L 251.1835 341.0394",
  "M 237.9361 348.1742 L 245.7553 348.4557 L 249.7758 354.0939 L 249.4275 423.8213 L 254.9312 432.2383 L 268.179 432.1799 L 275.2215 443.7492",
  "M 237.4481 359.5293 L 242.0831 359.6102 L 245.6157 364.7431 L 245.5388 427.2308 L 260.3824 451.0794",
  "M 230.8867 370.1987 L 229.1436 370.458 L 225.8013 375.7606 L 226.1089 391.3314 L 234.7536 405.9713 L 234.7945 436.8129 L 243.3837 451.0793",
];

interface ParticleConfig {
  pathIdx: number;
  count: number;
  dur: number;
}

const particles: ParticleConfig[] = [
  { pathIdx: 0, count: 3, dur: 14 },
  { pathIdx: 1, count: 2, dur: 11 },
  { pathIdx: 2, count: 2, dur: 10 },
  { pathIdx: 3, count: 2, dur: 12 },
  { pathIdx: 4, count: 2, dur: 9 },
  { pathIdx: 5, count: 2, dur: 13 },
  { pathIdx: 8, count: 2, dur: 8 },
  { pathIdx: 10, count: 2, dur: 11 },
];

export default function CircuitParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="220.8013 333.9288 168.4381 123.3387"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow-accent">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-brand">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(0, 791.1963) scale(1, -1)">
          <g fill="none" stroke="currentColor" strokeWidth="1.2" className="opacity-[0.04] dark:opacity-[0.06]">
            {paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {particles.map((p, pi) =>
            Array.from({ length: p.count }).map((_, ci) => (
              <circle
                key={`${pi}-${ci}`}
                r={pi % 2 === 0 ? 2.5 : 2}
                fill={pi % 2 === 0 ? "var(--color-brand, #ba112a)" : "var(--color-accent, #00d4ff)"}
                filter={pi % 2 === 0 ? "url(#glow-brand)" : "url(#glow-accent)"}
                className="opacity-0"
              >
                <animateMotion
                  path={paths[p.pathIdx]}
                  dur={`${p.dur}s`}
                  repeatCount="indefinite"
                  begin={`${ci * (p.dur / p.count)}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0.9;0.9;0"
                  keyTimes="0;0.1;0.3;0.7;0.9;1"
                  dur={`${p.dur}s`}
                  repeatCount="indefinite"
                  begin={`${ci * (p.dur / p.count)}s`}
                />
              </circle>
            ))
          )}
        </g>
      </svg>
    </div>
  );
}
