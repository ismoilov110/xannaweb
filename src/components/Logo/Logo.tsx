export default function Logo({ className = "h-10 w-auto" }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* LOOKME text */}
      <text
        x="10"
        y="35"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="28"
        fill="#F28BA8"
        letterSpacing="1"
      >
        LOOKME
      </text>
      
      {/* by XANNA text */}
      <text
        x="12"
        y="50"
        fontFamily="Arial, sans-serif"
        fontWeight="400"
        fontSize="10"
        fill="#8C6F76"
        letterSpacing="2"
      >
        by XANNA
      </text>
      
      {/* Decorative element - makeup brush or lipstick icon */}
      {/* <g transform="translate(165, 10)">
        <circle cx="10" cy="10" r="8" fill="#FDE6EC" />
        <path
          d="M10 6 L10 14 M6 10 L14 10"
          stroke="#F28BA8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g> */}
    </svg>
  );
}