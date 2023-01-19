import "./Header.scss";

export default function Header(props: {
  color: string,
}) {
  return (
      <header>
        <i></i>
        <span>{ props.color }</span>
      </header>
  );
}
