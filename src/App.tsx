import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventOverview } from './components/EventOverview';
import { EventSchedule } from './components/EventSchedule';
import { ActivitiesShowcase } from './components/ActivitiesShowcase';
import { RegistrationForm } from './components/RegistrationForm';
import { AttendeeDirectory } from './components/AttendeeDirectory';
import { MerdekaWishesWall } from './components/MerdekaWishesWall';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { EventPassModal } from './components/EventPassModal';
import { AttendanceDashboard } from './components/AttendanceDashboard';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CountdownBanner } from './components/CountdownBanner';
import { attendanceDb } from './services/attendanceDb';
import { EVENT_DETAILS } from './data/eventData';
import { EmployeeRegistration } from './types';

const STORAGE_KEY_CURRENT_REG = 'uthm_merdeka_my_reg_2026';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [registrations, setRegistrations] = useState<EmployeeRegistration[]>(() => attendanceDb.getAll());

  // Current user's registration (if already submitted in this session or browser)
  const [currentRegistration, setCurrentRegistration] = useState<EmployeeRegistration | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_REG);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return null;
  });

  // Selected pass for modal preview (either current user's or inspected attendee)
  const [selectedPassAttendee, setSelectedPassAttendee] = useState<EmployeeRegistration | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [preselectedActivity, setPreselectedActivity] = useState<string | null>(null);

  // Subscribe to persistent database changes in real-time
  useEffect(() => {
    const unsubscribe = attendanceDb.subscribe((records) => {
      setRegistrations(records);
    });
    return () => unsubscribe();
  }, []);

  // Sync current registration
  useEffect(() => {
    try {
      if (currentRegistration) {
        localStorage.setItem(STORAGE_KEY_CURRENT_REG, JSON.stringify(currentRegistration));
      }
    } catch (e) {
      // ignore
    }
  }, [currentRegistration]);

  const handleRegisterSuccess = (newReg: EmployeeRegistration) => {
    setCurrentRegistration(newReg);
    setSelectedPassAttendee(newReg);
    setIsPassModalOpen(true);
  };

  const handleSelectActivity = (activityTitle: string) => {
    setPreselectedActivity(activityTitle);
    const registerElem = document.getElementById('register');
    if (registerElem) {
      registerElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMyPass = () => {
    setSelectedPassAttendee(currentRegistration);
    setIsPassModalOpen(true);
  };

  const handleViewAttendeePass = (attendee: EmployeeRegistration) => {
    setSelectedPassAttendee(attendee);
    setIsPassModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        currentRegistration={currentRegistration}
        onOpenMyPass={handleOpenMyPass}
        registeredCount={registrations.length}
        capacity={EVENT_DETAILS.capacity}
        onOpenDashboard={() => {
          setCurrentView((prev) => (prev === 'home' ? 'dashboard' : 'home'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentView={currentView}
      />

      {/* Prominent Live Event Countdown Banner */}
      {currentView === 'home' && (
        <CountdownBanner
          onRsvpClick={() => {
            const regElem = document.getElementById('register');
            if (regElem) regElem.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'dashboard' ? (
          <AttendanceDashboard
            attendees={registrations}
            onViewPass={handleViewAttendeePass}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {/* Hero Section with Celebratory Graphic & Countdown */}
            <HeroSection
              registeredCount={registrations.length}
              capacity={EVENT_DETAILS.capacity}
              onOpenRegister={() => {
                const regElem = document.getElementById('register');
                if (regElem) regElem.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Event Blueprint & Details */}
            <EventOverview />

            {/* Itinerary Schedule Timeline */}
            <EventSchedule />

            {/* Competitions, Cultural Games & Graphics */}
            <ActivitiesShowcase onSelectActivity={handleSelectActivity} />

            {/* Employee Registration Form */}
            <RegistrationForm
              onRegisterSuccess={handleRegisterSuccess}
              registeredCount={registrations.length}
              capacity={EVENT_DETAILS.capacity}
              preselectedActivity={preselectedActivity}
              onOpenDashboard={() => {
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Attendee Colleague Directory */}
            <AttendeeDirectory
              registrations={registrations}
              capacity={EVENT_DETAILS.capacity}
            />

            {/* Merdeka Wishes & Unity Wall */}
            <MerdekaWishesWall />

            {/* Frequently Asked Questions */}
            <FaqSection />
          </>
        )}
      </main>

      {/* Floating Direct WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer />

      {/* Digital Event Pass Modal */}
      {isPassModalOpen && (
        <EventPassModal
          registration={selectedPassAttendee || currentRegistration}
          onClose={() => {
            setIsPassModalOpen(false);
            setSelectedPassAttendee(null);
          }}
        />
      )}
    </div>
  );
}
