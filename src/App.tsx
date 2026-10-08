import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingForm } from './components/BookingForm';
import { SearchModal } from './components/SearchModal';

// Pages
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { DestinationDetails } from './pages/DestinationDetails';
import { Packages } from './pages/Packages';
import { PackageDetails } from './pages/PackageDetails';
import { Categories } from './pages/Categories';
import { ReligiousTours } from './pages/ReligiousTours';
import { States } from './pages/States';
import { StateDetails } from './pages/StateDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy, Terms, Disclaimer, CookiePolicy } from './pages/Legal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname || '/';
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDestination, setBookingDestination] = useState<string>('');
  const [bookingPackage, setBookingPackage] = useState<string>('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path.length > 1 ? path.replace(/\/+$/, '') : path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    const cleanPath = path.length > 1 ? path.replace(/\/+$/, '') : path;
    window.history.pushState({}, '', cleanPath);
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (destinationName = '', packageName = '') => {
    setBookingDestination(destinationName);
    setBookingPackage(packageName);
    setBookingModalOpen(true);
  };

  // Route parser
  const renderRoute = () => {
    const path = currentPath.length > 1 ? currentPath.replace(/\/+$/, '') : (currentPath || '/');

    // Exact routes
    if (path === '/' || path === '') {
      return (
        <Home
          onNavigate={navigateTo}
          onSelectDestination={(slug) => navigateTo(`/destinations/${slug}`)}
          onSelectPackage={(slug) => navigateTo(`/packages/${slug}`)}
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }

    if (path === '/destinations') {
      return (
        <Destinations
          onSelectDestination={(slug) => navigateTo(`/destinations/${slug}`)}
        />
      );
    }

    if (path.startsWith('/destinations/')) {
      const slug = path.replace('/destinations/', '');
      return (
        <DestinationDetails
          slug={slug}
          onNavigate={navigateTo}
          onSelectPackage={(pkgSlug) => navigateTo(`/packages/${pkgSlug}`)}
          onOpenBookingForDestination={(name) => handleOpenBooking(name, '')}
        />
      );
    }

    if (path === '/packages') {
      return (
        <Packages
          onSelectPackage={(slug) => navigateTo(`/packages/${slug}`)}
          onOpenBookingForPackage={(title) => handleOpenBooking('', title)}
        />
      );
    }

    if (path.startsWith('/packages/')) {
      const slug = path.replace('/packages/', '');
      return (
        <PackageDetails
          slug={slug}
          onNavigate={navigateTo}
          onOpenBookingForPackage={(title) => handleOpenBooking('', title)}
        />
      );
    }

    if (path === '/categories') {
      return (
        <Categories
          onSelectCategory={(slug) => {
            if (slug === 'religious-tours') {
              navigateTo('/categories/religious-tours');
            } else {
              navigateTo(`/categories/${slug}`);
            }
          }}
        />
      );
    }

    if (path === '/categories/religious-tours') {
      return (
        <ReligiousTours
          onSelectDestination={(slug) => navigateTo(`/destinations/${slug}`)}
          onSelectPackage={(slug) => navigateTo(`/packages/${slug}`)}
        />
      );
    }

    if (path.startsWith('/categories/')) {
      const catSlug = path.replace('/categories/', '');
      return (
        <Destinations
          initialCategory={catSlug}
          onSelectDestination={(slug) => navigateTo(`/destinations/${slug}`)}
        />
      );
    }

    if (path === '/states') {
      return <States onSelectState={(slug) => navigateTo(`/states/${slug}`)} />;
    }

    if (path.startsWith('/states/')) {
      const slug = path.replace('/states/', '');
      return (
        <StateDetails
          slug={slug}
          onNavigate={navigateTo}
          onSelectDestination={(destSlug) => navigateTo(`/destinations/${destSlug}`)}
        />
      );
    }

    if (path === '/about') {
      return (
        <About
          onNavigate={navigateTo}
          onOpenBooking={() => handleOpenBooking()}
        />
      );
    }

    if (path === '/contact') {
      return <Contact />;
    }

    if (path === '/privacy-policy') {
      return <PrivacyPolicy />;
    }

    if (path === '/terms-and-conditions') {
      return <Terms />;
    }

    if (path === '/disclaimer') {
      return <Disclaimer />;
    }

    if (path === '/cookie-policy') {
      return <CookiePolicy />;
    }

    // Default Fallback to Home
    return (
      <Home
        onNavigate={navigateTo}
        onSelectDestination={(slug) => navigateTo(`/destinations/${slug}`)}
        onSelectPackage={(slug) => navigateTo(`/packages/${slug}`)}
        onOpenBooking={() => handleOpenBooking()}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-700 selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 lg:pb-0">
        {renderRoute()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile Sticky Bottom Bar */}
      <MobileStickyBar
        onNavigate={navigateTo}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectDestination={(slug) => navigateTo(`/destinations/${slug}`)}
      />

      {/* Booking / Enquiry Modal */}
      {bookingModalOpen && (
        <BookingForm
          initialDestination={bookingDestination}
          initialPackage={bookingPackage}
          onClose={() => setBookingModalOpen(false)}
          isModal={true}
        />
      )}
    </div>
  );
}
