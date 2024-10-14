import { useState, FormEvent, ChangeEvent } from "react";
import { toast, Toaster } from "react-hot-toast";
import { SearchBarProps } from "./SearchBar.types";

import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Cannot be empty!"); 
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <header className={css.container}>
      <form onSubmit={handleSubmit} className={css.wraper}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange} 
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
}
