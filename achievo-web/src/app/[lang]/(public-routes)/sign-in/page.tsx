


type Props = {
  params: {
    lang: string;
  }
}

export default function Login(props: Props) {
  return (
    <div>
      <h1>Login</h1>
      <p>
        {
          props.params.lang
        }
      </p>
    </div>
  );
}