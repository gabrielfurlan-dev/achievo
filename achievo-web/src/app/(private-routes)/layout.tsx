import { SignedIn } from '@clerk/nextjs'

type Props = {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <SignedIn>
      {props.children}
    </SignedIn>
  )
}