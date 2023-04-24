import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="w-full">
      <div>
        <Header />
      </div>
      <main className="w-full pt-16 px-0">
        <div className="mx-auto">{children}</div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}
