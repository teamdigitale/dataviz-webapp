import Header from './layout/Header';
import Footer from './layout/Footer';
function Layout({ children }: any) {
  return (
    <div data-theme="italia" className="w-screen h-screen flex flex-col">
      <Header />
      <div className="p-5 flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
