import React from "react";

const WeatherLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        margin: 0
      }}
    >
      <svg
        viewBox="0 0 500 300"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "100%",
          height: "100%",
          display: "block"
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* FULL HEIGHT BACKGROUND */}
        <rect width="500" height="300" fill="#87CEEB">
          <animate
            attributeName="fill"
            values="#87CEEB;#1E3A8A;#87CEEB"
            dur="12s"
            repeatCount="indefinite"
          />
        </rect>

        {/* SUN */}
        <circle cx="250" cy="80" r="35" fill="#FDB813" opacity="0">
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.2;0.5;0.6"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>

        {/* MOON */}
        <g opacity="0">
          <circle cx="250" cy="80" r="30" fill="#F1F5F9" />
          {/* <circle cx="265" cy="70" r="30" fill="#a8b0c5" /> */}
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes="0;0.5;0.6;0.9;1"
            dur="12s"
            repeatCount="indefinite"
          />
        </g>

        {/* CLOUD 1 */}
        <g>
          <ellipse cx="0" cy="100" rx="40" ry="20" fill="#ffffff" />
          <circle cx="-20" cy="85" r="20" fill="#ffffff" />
          <circle cx="20" cy="85" r="20" fill="#ffffff" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="600 0"
            to="-200 0"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>

        {/* CLOUD 2 */}
        <g>
          <ellipse cx="0" cy="130" rx="50" ry="22" fill="#f8fafc" />
          <circle cx="-25" cy="115" r="22" fill="#f8fafc" />
          <circle cx="25" cy="115" r="22" fill="#f8fafc" />
          <animateTransform
            attributeName="transform"
            type="translate"
            from="700 0"
            to="-250 0"
            dur="8s"
            repeatCount="indefinite"
          />
        </g>

        {/* TEXT */}
        <text
          x="250"
          y="220"
          textAnchor="middle"
          fontFamily="Arial"
          fontSize="15"
          fill="#ffffff"
        >
          Loading Weather DashBoard.......
        </text>
      </svg>
    </div>
  );
};

export default WeatherLoader;