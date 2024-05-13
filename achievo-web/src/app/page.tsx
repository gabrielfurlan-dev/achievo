//* Libraries imports
import Link from 'next/link';
import { auth, currentUser } from "@clerk/nextjs/server";


export default async function Home() {
  const user = await currentUser();

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-svh'>
      <main>
        <h1>Welcome to Achievo!{`, ${user?.firstName}`}</h1>
      </main>

      <div className='flex flex-col items-center justify-center gap-2'>
        <Link href="/sign-up">
          <span>Sign Up</span>
        </Link>

        <Link href="/sign-in">
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
}
