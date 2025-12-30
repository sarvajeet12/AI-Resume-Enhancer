import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-body-bg">
      <Navbar />
      <div className="flex flex-col md:flex-row pt-16">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 mt-8 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

