import { SignIn } from "@clerk/nextjs";


export default function Login() {
  return (
    <div className="flex items-center justify-center w-full min-h-svh">
      <SignIn path="/sign-in" />
    </div>
  );
}