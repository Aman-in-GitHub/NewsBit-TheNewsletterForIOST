import Navbar from "./elements/Navbar";
import NewsTable from "./pages/NewsTable";
import Hero from "./pages/Hero";
import Newsletter from "./pages/Newsletter";

function App() {
  return (
    <>
      <Navbar />

      <main className="bg-light px-4 font-text dark:bg-dark lg:px-20 3xl:px-64">
        <Hero />
        <NewsTable />
        <Newsletter />
      </main>
    </>
  );
}

export default App;
