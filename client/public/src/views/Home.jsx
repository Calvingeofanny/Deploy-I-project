import BookCategories from "../components/BookCategories";
import BookBanner from "../components/BookBanner";
import PopulerBooks from "../components/PopulerBooks";

export default function Home() {
  return (
    <>
      <main className="flex-grow">
        <BookBanner />
        <PopulerBooks />
        <BookCategories />
      </main>
    </>
  );
}
