import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, MessageSquare, BookOpen, Globe, ShieldCheck, MessageCircle, LogIn, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const navItems = [
    { name: 'Overview', path: '/', icon: <Globe size={18} /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={18} /> },
    { name: 'Forum', path: '/forum', icon: <MessageCircle size={18} /> },
    { name: 'Documents', path: '/resources', icon: <BookOpen size={18} /> },
    { name: 'AI Assistant', path: '/assistant', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-ieee-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Area */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-white p-1.5 rounded-full">
                  <ShieldCheck className="text-ieee-blue h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-wide">IEEE P3394</span>
                  <span className="text-xs text-gray-300 font-light uppercase tracking-wider">Standard for AI</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-ieee-blue text-white shadow-sm'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Auth Section (Desktop) */}
            <div className="hidden md:flex items-center ml-4">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-sm text-gray-200 hover:text-white focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-ieee-blue flex items-center justify-center text-white border border-gray-400">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </button>

                  {/* Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <UserIcon size={16} className="mr-2" /> Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white text-ieee-blue text-sm font-medium hover:bg-gray-100 transition"
                >
                  <LogIn size={16} />
                  <span>Log In</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-ieee-dark border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-ieee-blue text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
              <div className="border-t border-gray-600 mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                     <NavLink
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <UserIcon size={18} />
                        <span>My Profile</span>
                      </NavLink>
                      <button
                        onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                        className="w-full text-left flex items-center space-x-3 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                      </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <LogIn size={18} />
                    <span>Log In</span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} IEEE P3394 Working Group. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                IEEE is a registered trademark of The Institute of Electrical and Electronics Engineers, Inc.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-ieee-blue transition">Contact Chair</a>
              <a href="#" className="text-gray-400 hover:text-ieee-blue transition">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;