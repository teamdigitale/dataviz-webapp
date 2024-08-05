import Header from './layout/Header';
import Footer from './layout/Footer';
function Layout({ children }: any) {
  return (
    <div data-theme="italia" className="w-screen h-screen layout">
      <Header />
      <div className="p-20">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
