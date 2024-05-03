import Image from "next/image";

type Props = {
  params: {
    lang: string;
  }
}

export default function Home(props: Props) {
  return (
    <div>
      <main>
        <h1>Welcome to Achievo!</h1>
        <p>
          {
            props.params.lang
          }
        </p>
      </main>
    </div>
  );
}
