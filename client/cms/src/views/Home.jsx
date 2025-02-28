import ButtonAddBook from "../components/ButtonAddBook";
import CardBooks from "../components/CardBooks";

export default function Home() {
  return (
    <>
      <main className="flex-grow">
        {/* Book Management Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">All Books</h2>
            <ButtonAddBook />
          </div>
          <CardBooks />
        </section>
      </main>
    </>
  );
}
