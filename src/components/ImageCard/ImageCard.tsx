interface ImageCardProps {
  alt: string;
  src: string;
  onClick: () => void;
}

export default function ImageCard({
  alt,
  src,
  onClick,
}: ImageCardProps): JSX.Element {
  return (
    <div>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
}
