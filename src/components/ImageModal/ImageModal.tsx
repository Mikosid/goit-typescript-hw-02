import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { TypeImageCard } from "../App/App.types";

Modal.setAppElement("#root");

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageData: TypeImageCard | null;
}

export default function ImageModal({
  isOpen,
  onRequestClose,
  imageData,
}: ImageModalProps): JSX.Element | null {
  if (!imageData) return null;

  const {
    urls: { regular },
    alt_description,
    likes,
    user: { name },
  } = imageData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img src={regular} alt={alt_description} className={css.image} />
        <div className={css.details}>
          <p>
            <strong>Author:</strong> {name}
          </p>
          <p>
            <strong>Likes:</strong> {likes}
          </p>
        </div>
      </div>
    </Modal>
  );
}
