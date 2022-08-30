import Link from "next/link";

export function Logo () {
  return (
    <Link href="/">
      <h1 className="font-logo text-[28px] text-white cursor-pointer">
        DopeShoe
      </h1>
    </Link>
  )
}