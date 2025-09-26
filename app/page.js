import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-orange-400">Welcome, Kallol Bhattacharjee</h1>
      <Button variant="destructive">Submit</Button>
      <UserButton/>
    </div>
  );
}
