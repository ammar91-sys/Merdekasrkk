export const generateIcsFile = () => {
  const eventDetails = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SRKK Group//Merdeka Celebration 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:SRKK Jiwa Merdeka 2026 Celebration',
    'DESCRIPTION:SRKK 69th National Day Celebration: Busana Warisan Runway, Sukan Rakyat, Merdeka Mega Quiz, and Santapan Perdana Buffet.',
    'LOCATION:Connexion Conference & Event Centre (CCEC) @ Nexus Bangsar South, KL',
    'DTSTART:20260828T060000Z',
    'DTEND:20260828T113000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([eventDetails], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'SRKK-Jiwa-Merdeka-2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getGoogleCalendarUrl = () => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  const text = encodeURIComponent('SRKK Jiwa Merdeka 2026 Celebration');
  const dates = '20260828T060000Z/20260828T113000Z';
  const details = encodeURIComponent(
    'SRKK Annual Merdeka Celebration: Cultural Performances, Sukan Rakyat, Busana Warisan Runway, Buffet Feast & Grand Lucky Draw.\nDress Code: Traditional Cultural Attire or Jalur Gemilang Colors.'
  );
  const location = encodeURIComponent('Connexion Conference & Event Centre @ Nexus Bangsar South, Kuala Lumpur');

  return `${baseUrl}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
};
