import { createPortal } from "react-dom";
import { useEffect, type MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function Modal({ movie, onClose }: ModalProps) {
  const { title, overview, release_date, vote_average, poster_path } = movie;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className={css.image}
          alt={movie.title}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>Release date: {release_date}</p>
          <p>Vote average: {vote_average}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
