interface TextDisplayProps {
  text: string;
}

function TextDisplay({ text }: TextDisplayProps) {
  return (
    <div className="px-4 py-2">
      <p className="wrap-break-word whitespace-pre-wrap">{text}</p>
    </div>
  );
}

export default TextDisplay;
