import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <Image
      src="/tharunpp-svg.svg"
      alt="Tharunpp Logo"
      width={size}
      height={size}
      className={className}
      style={{ display: "inline-block", borderRadius: "6px" }}
      priority
    />
  );
}
