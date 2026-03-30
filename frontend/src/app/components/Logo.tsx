interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/tharunpp-svg.svg"
      alt="Tharunpp Logo"
      width={size}
      height={size}
      className={className}
      style={{ display: "inline-block", borderRadius: "6px", flexShrink: 0 }}
    />
  );
}
