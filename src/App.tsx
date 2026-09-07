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
import { INITIAL_REGISTRATIONS, EVENT_DETAILS } from './data/eventData';
import { EmployeeRegistration } from './types';

const STORAGE_KEY_REGISTRATIONS = 'srkk_merdeka_registrations_2026';
const STORAGE_KEY_CURRENT_REG = 'srkk_merdeka_my_reg_2026';

export default function App() {
  // Load stored registrations or default
  const [registrations, setRegistrations] = useState<EmployeeRegistration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_REGISTRATIONS;
  });

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

  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [preselectedActivity, setPreselectedActivity] = useState<string | null>(null);

  // Sync registrations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      // ignore
    }
  }, [registrations]);

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
    // Add to registrations list
    setRegistrations((prev) => [newReg, ...prev]);
    setCurrentRegistration(newReg);
    setIsPassModalOpen(true);
  };

  const handleSelectActivity = (activityTitle: string) => {
    setPreselectedActivity(activityTitle);
    const registerElem = document.getElementById('register');
    if (registerElem) {
      registerElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        currentRegistration={currentRegistration}
        onOpenMyPass={() => setIsPassModalOpen(true)}
        registeredCount={registrations.length}
        capacity={EVENT_DETAILS.capacity}
      />

      {/* Main Sections */}
      <main className="flex-1">
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Digital Event Pass Modal */}
      {isPassModalOpen && (
        <EventPassModal
          registration={currentRegistration}
          onClose={() => setIsPassModalOpen(false)}
        />
      )}
    </div>
  );
}
