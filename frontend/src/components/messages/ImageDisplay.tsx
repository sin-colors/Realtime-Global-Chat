interface ImageDisplayProps {
  image: { url: string; publicId: string };
  fromMe: boolean;
  key?: React.Key | null | undefined;
  // ref?: React.Ref<HTMLInputElement> | undefined;
}

function ImageDisplay({ image, fromMe }: ImageDisplayProps) {
  const altWord = fromMe ? "送信した画像" : "受信した画像";
  return (
    <img
      src={image.url}
      alt={altWord}
      className="h-auto w-full max-w-62.5 cursor-pointer transition-opacity hover:opacity-90"
      onClick={() => window.open(image.url, "_blank")}
    />
  );
}

export default ImageDisplay;
