import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <Image src="/assets/logo.png" width={25} height={40} alt="logo" />
    </Link>
  );
}
