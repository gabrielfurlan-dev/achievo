interface ListItemProps{
    text: string,
    key?: number,

}

export default function ListItem({text, key}: ListItemProps) {
  return (
    <li style={{listStyleType: 'circle'}} key={key}>{text}</li>
  );
}
