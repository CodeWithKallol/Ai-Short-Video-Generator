import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-orange-400">Welcome, Kallol Bhattacharjee</h1>
      <Link href={'/dashboard'}>
      <Button variant="destructive">Dashboard</Button>
      </Link>
      <UserButton/>
    </div>
  );
}
