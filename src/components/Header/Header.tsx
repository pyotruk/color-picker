import "./Header.scss";

export default function Header(props: {
  color: string,
  toggleIsPicking: () => void,
}) {
  return (
      <header>
        <i onClick={props.toggleIsPicking}></i>
        <span>{ props.color }</span>
      </header>
  );
}
