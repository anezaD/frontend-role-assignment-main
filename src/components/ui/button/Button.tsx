import "./styles.css"

export default function Button({ className, onClick, text }: {
  className?: string; 
  onClick: () => void;
  text: string;
}) {

  return <button className={className} onClick={onClick}>{text}</button>;

}
