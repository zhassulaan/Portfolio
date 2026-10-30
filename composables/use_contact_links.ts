// Shared by the header, hero, Hire section and footer so they use the same
// links. Without a booking page configured, the booking button opens a
// pre-filled email instead.
export function useContactLinks() {
  const { public: config } = useRuntimeConfig();

  const email = config.contactEmail;
  const booking_url = config.bookingUrl;
  const has_booking_page = !!booking_url;

  const subject = encodeURIComponent('Intro call');
  const body = encodeURIComponent('Hi Zhassulan,\n\nI would like to schedule a short intro call. A few times that work for me:\n\n');
  const call_request_href = `mailto:${email}?subject=${subject}&body=${body}`;

  return {
    email,
    mailto_href: `mailto:${email}`,
    has_booking_page,
    booking_href: has_booking_page ? booking_url : call_request_href,
    booking_opens_new_tab: has_booking_page,
  };
}
