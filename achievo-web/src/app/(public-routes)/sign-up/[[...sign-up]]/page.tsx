import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-svh">
      <SignUp path="/sign-up" />
    </div>
  );
}