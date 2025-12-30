import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Sparkles, GalleryHorizontalEnd, Star, IdCard, User, PanelRightOpen, PanelLeftOpen } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setMobileOpen(desktop); // keep sidebar open on desktop, collapsed on mobile
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => setMobileOpen((prev) => !prev);

  const handleNavClick = () => {
    if (!isDesktop) setMobileOpen(false);
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
    { path: '/enhancement', label: 'Enhance', icon:  <Sparkles /> },
    { path: '/history', label: 'History', icon: <GalleryHorizontalEnd /> },
    { path: '/ratings', label: 'Ratings', icon: <Star /> },
    { path: '/subscription', label: 'Subscription', icon: <IdCard /> },
    { path: '/profile', label: 'Profile', icon: <User /> },
  ];

  return (
    <>
      {/* Mobile toggle button that rides with the sidebar edge */}
      {!isDesktop && (
        <motion.button
          onClick={handleToggle}
          aria-label="Toggle sidebar"
          initial={false}
          animate={{ x: mobileOpen ? 256 : 16 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="lg:hidden fixed top-16 left-0 z-50 flex h-10 w-10 items-center justify-center rounded-md bg-nav-bg/90 text-white shadow-lg backdrop-blur-md border border-white/10"
        >
          {mobileOpen ? <PanelLeftOpen size={20} /> : <PanelRightOpen size={20} />}
        </motion.button>
      )}

      {/* Overlay */}
      {!isDesktop && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      <motion.aside
        initial={{ x: isDesktop ? 0 : -220 }}
        animate={{ x: isDesktop ? 0 : mobileOpen ? 0 : -220 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className={`fixed lg:static top-14 left-0 z-40 bg-nav-bg/95 lg:bg-nav-bg lg:min-h-screen p-3 backdrop-blur-md lg:backdrop-blur-0 shadow-lg lg:shadow-none h-[calc(100vh-56px)] lg:h-auto overflow-y-auto ${
          isDesktop ? 'w-64' : mobileOpen ? 'w-64' : 'w-16'
        }`}
      >
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center space-x-3 px-3.5 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'gradient-yellow text-white'
                    : 'text-text-primary hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`font-medium text-xs whitespace-nowrap transition-opacity duration-150 ${
                    mobileOpen || isDesktop ? 'opacity-100' : 'opacity-0 lg:opacity-100 hidden lg:inline'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
