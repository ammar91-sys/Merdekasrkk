import React, { useState } from 'react';
import { User, Mail, Building, MapPin, Shirt, Utensils, Award, Users, CheckCircle, AlertCircle, Sparkles, Send } from 'lucide-react';
import { DEPARTMENTS, LOCATIONS, CONTESTS } from '../data/eventData';
import { EmployeeRegistration } from '../types';
import { triggerMerdekaConfetti } from '../utils/confetti';

interface RegistrationFormProps {
  onRegisterSuccess: (registration: EmployeeRegistration) => void;
  registeredCount: number;
  capacity: number;
  preselectedActivity?: string | null;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegisterSuccess,
  registeredCount,
  capacity,
  preselectedActivity,
}) => {
  // Form State
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [officeLocation, setOfficeLocation] = useState<EmployeeRegistration['officeLocation']>('Kuala Lumpur HQ');
  const [attendanceType, setAttendanceType] = useState<'in-person' | 'virtual'>('in-person');
  const [dietaryPreference, setDietaryPreference] = useState<EmployeeRegistration['dietaryPreference']>('halal');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [shirtSize, setShirtSize] = useState<EmployeeRegistration['shirtSize']>('L');
  const [activities, setActivities] = useState<string[]>(
    preselectedActivity ? [preselectedActivity] : ['Busana Warisan Best Dressed']
  );
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');

  // UI state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update preselected activity if user clicks "Sign Up in RSVP" from activities section
  React.useEffect(() => {
    if (preselectedActivity && !activities.includes(preselectedActivity)) {
      setActivities((prev) => [...prev, preselectedActivity]);
    }
  }, [preselectedActivity]);

  const toggleActivity = (activityTitle: string) => {
    setActivities((prev) =>
      prev.includes(activityTitle)
        ? prev.filter((item) => item !== activityTitle)
        : [...prev, activityTitle]
    );
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!employeeName.trim()) {
      errs.employeeName = 'Please enter your full name as per company record.';
    }

    if (!employeeId.trim()) {
      errs.employeeId = 'Please enter your employee ID (e.g., SRKK-1042).';
    }

    if (!email.trim()) {
      errs.email = 'Please provide your work email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (plusOne && !plusOneName.trim()) {
      errs.plusOneName = 'Please enter your plus-one / spouse name.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate random sequential ticket number and table
    const randomSeq = Math.floor(100 + Math.random() * 900);
    const tables = [
      'Table 1 (Bunga Raya)',
      'Table 2 (Jalur Gemilang)',
      'Table 3 (Wau Bulan)',
      'Table 4 (Harimau Malaya)',
      'Table 5 (Gasing Emas)',
      'Table 6 (Keris Warisan)',
      'Table 7 (Tanjak Diraja)',
    ];
    const assignedTable = attendanceType === 'in-person'
      ? tables[Math.floor(Math.random() * tables.length)]
      : 'Virtual Teams Broadcast Lounge';

    const newReg: EmployeeRegistration = {
      id: `reg-${Date.now()}`,
      employeeName: employeeName.trim(),
      employeeId: employeeId.trim().toUpperCase(),
      email: email.trim().toLowerCase(),
      department,
      officeLocation,
      attendanceType,
      dietaryPreference,
      dietaryNotes: dietaryNotes.trim() || undefined,
      shirtSize,
      activities,
      plusOne,
      plusOneName: plusOne ? plusOneName.trim() : undefined,
      registrationDate: new Date().toISOString().split('T')[0],
      ticketNumber: `SRKK-MDK-${randomSeq}`,
      tableNumber: assignedTable,
    };

    setTimeout(() => {
      triggerMerdekaConfetti();
      onRegisterSuccess(newReg);
      setIsSubmitting(false);
    }, 400);
  };

  const shirtSizes: Array<EmployeeRegistration['shirtSize']> = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

  return (
    <section id="register" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Frame in Geometric Balance Theme */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
          {/* Top Signature Blue Geometric Header */}
          <div className="bg-blue-900 p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Glowing orbs */}
            <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-red-600 rounded-full opacity-25 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center">
                    <img
                      src="/images/uthm-logo.png"
                      alt="Universiti Tun Hussein Onn Malaysia (UTHM)"
                      className="h-7 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="inline-block px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-2xs">
                    RSVP & Event Badge Issuance
                  </div>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
                  Employee Attendance <br className="hidden sm:inline" />
                  <span className="text-yellow-400">Registration</span>
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm max-w-lg leading-relaxed font-medium">
                  Secure your ballroom seat, select your commemorative Merdeka polo shirt size, and sign up for festive heritage competitions!
                </p>
              </div>

              {/* Live Capacity Meter in Slate-900 Block */}
              <div className="bg-slate-900/90 p-5 rounded-[1.5rem] border border-blue-800 shrink-0 text-center sm:text-right shadow-md">
                <div className="text-[10px] uppercase tracking-[0.2em] text-yellow-400 font-bold">
                  Ballroom Seating
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
                  {registeredCount} / {capacity}
                </div>
                <div className="text-[11px] text-blue-200 mt-0.5 font-medium">
                  {capacity - registeredCount} seats remaining
                </div>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">
            {/* Step 1: Employee Particulars */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>1. Employee Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employee-name-input"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="e.g. Nurul Izzati Binti Razali"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                      errors.employeeName
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 bg-slate-50/50'
                    }`}
                  />
                  {errors.employeeName && (
                    <p className="text-xs text-red-500 mt-1">{errors.employeeName}</p>
                  )}
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employee-id-input"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. SRKK-1088"
                    className={`w-full px-4 py-3 rounded-xl border text-sm uppercase focus:outline-none transition-all ${
                      errors.employeeId
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 bg-slate-50/50'
                    }`}
                  />
                  {errors.employeeId && (
                    <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      id="employee-email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@srkk.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 bg-slate-50/50'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Department / Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="employee-dept-select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Location & Attendance Mode */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span>2. Location & Attendance Mode</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Office Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Base Office Location
                  </label>
                  <select
                    id="employee-location-select"
                    value={officeLocation}
                    onChange={(e) => setOfficeLocation(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Attendance Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Attendance Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttendanceType('in-person')}
                      className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        attendanceType === 'in-person'
                          ? 'bg-blue-900 border-blue-900 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      🏢 In-Person (Nexus KL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttendanceType('virtual')}
                      className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        attendanceType === 'virtual'
                          ? 'bg-blue-900 border-blue-900 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      💻 Virtual (Teams Live)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Commemorative Swag & Dietary */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span>3. Commemorative Merdeka Polo & Dietary</span>
              </h3>

              <div className="space-y-5">
                {/* Shirt Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select SRKK Merdeka Polo Shirt Size
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Unisex Fit (100% Cotton Piqué)
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {shirtSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setShirtSize(size)}
                        className={`py-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                          shirtSize === size
                            ? 'bg-yellow-400 text-slate-900 border-yellow-400 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Dietary Requirement (Grand Buffet)
                    </label>
                    <select
                      id="dietary-select"
                      value={dietaryPreference}
                      onChange={(e) => setDietaryPreference(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                    >
                      <option value="halal">Halal (Standard Malaysian Banquet)</option>
                      <option value="vegetarian">Vegetarian (Strict)</option>
                      <option value="vegan">Vegan / Plant-based</option>
                      <option value="no-beef">No Beef / Hindu-friendly</option>
                      <option value="regular">No Restrictions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Allergy or Food Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder="e.g. Peanut allergy, gluten intolerant"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Activities & Plus-One */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>4. Contests & Guest Opt-In</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                    Participate in Competitions (Check all that apply):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CONTESTS.map((contest) => {
                      const isChecked = activities.includes(contest.title);
                      return (
                        <label
                          key={contest.id}
                          className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-yellow-50/60 border-yellow-400 shadow-2xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleActivity(contest.title)}
                            className="mt-0.5 rounded text-blue-900 focus:ring-blue-900 h-4 w-4"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-slate-900 block">
                              {contest.title}
                            </span>
                            <span className="text-slate-500 font-medium">{contest.subtitle}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Plus-One Toggle */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="plus-one-checkbox"
                      checked={plusOne}
                      onChange={(e) => setPlusOne(e.target.checked)}
                      className="rounded text-blue-900 focus:ring-blue-900 h-4 w-4"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900">
                        I am bringing a Plus-One / Spouse (Family Companion)
                      </span>
                      <span className="text-slate-500 block font-medium">
                        Complimentary additional seat and dinner buffet included.
                      </span>
                    </div>
                  </label>

                  {plusOne && (
                    <div className="mt-3 pl-7">
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Plus-One / Spouse Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="plus-one-name-input"
                        value={plusOneName}
                        onChange={(e) => setPlusOneName(e.target.value)}
                        placeholder="e.g. Faridah Binti Osman"
                        className={`w-full max-w-md px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                          errors.plusOneName
                            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-100 bg-slate-50/50'
                        }`}
                      />
                      {errors.plusOneName && (
                        <p className="text-xs text-red-500 mt-1">{errors.plusOneName}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submission Banner & Action */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Digital QR E-Ticket issued upon submission</span>
              </div>

              <button
                type="submit"
                id="submit-registration-btn"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-black py-4 px-8 rounded-xl hover:bg-yellow-300 transition-colors uppercase tracking-widest text-xs shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">🌀</span>
                    <span>Issuing Digital Pass...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit RSVP & Get Digital Pass</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
