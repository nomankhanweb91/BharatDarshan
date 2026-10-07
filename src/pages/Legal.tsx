import React from 'react';

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, subtitle, children }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
    <div>
      <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
        Legal Notice & Policies
      </span>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>

    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-6">
      {children}
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Last Updated: October 2026 | Bharat Darshan"
    >
      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
        <p className="text-slate-600">
          Bharat Darshan collects personal contact information (such as your name, mobile phone number, email address, destination interest, and travel requirements) only when you voluntarily submit a travel enquiry or request tour details via our website or direct communication channels.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
        <p className="text-slate-600">
          The information collected is used solely to respond to your itinerary inquiries, provide customized budget estimations, facilitate direct WhatsApp communication regarding your journey, and improve our tourism guides. We do not sell, rent, or trade your personal contact details to third-party telemarketers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">3. Third-Party Services & Google AdSense</h2>
        <p className="text-slate-600">
          Our website uses Google AdSense (publisher ca-pub-8528510551006901) to display advertisements. Google uses cookies, including the DoubleClick cookie, to serve ads to users based on their prior visits to our website or other websites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">4. Data Security & Storage</h2>
        <p className="text-slate-600">
          We take reasonable administrative and technical precautions to safeguard the personal information submitted through our forms. If you wish to delete or update your submitted enquiry, please contact support@bharatdarshan.online.
        </p>
      </section>
    </LegalLayout>
  );
};

export const Terms: React.FC = () => {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Last Updated: October 2026 | Bharat Darshan"
    >
      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p className="text-slate-600">
          By accessing and using Bharat Darshan (bharatdarshan.online), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should refrain from using the website.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">2. Nature of Platform & Lead Enquiry System</h2>
        <p className="text-slate-600">
          Bharat Darshan operates primarily as a tourism discovery, itinerary planning, and travel enquiry portal. Submitting an enquiry or receiving an estimated budget does not constitute a guaranteed booking or confirmation of hotel, transport, or flight reservation until verified and agreed upon by the authorized operating parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">3. Rate & Schedule Fluctuations</h2>
        <p className="text-slate-600 font-medium text-slate-800">
          &quot;Travel information, prices and availability are subject to change.&quot;
        </p>
        <p className="text-slate-600">
          Estimated starting prices, hotel tariffs, monument visiting charges, and vehicle rentals displayed across Bharat Darshan are approximate estimates subject to seasonal surge, fuel prices, and state regulatory amendments.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">4. Intellectual Property</h2>
        <p className="text-slate-600">
          All original textual guides, curated itineraries, layout structures, and brand marks are the intellectual property of Bharat Darshan. Photography is used under appropriate creative licenses or editorial review.
        </p>
      </section>
    </LegalLayout>
  );
};

export const Disclaimer: React.FC = () => {
  return (
    <LegalLayout
      title="Website Disclaimer"
      subtitle="Last Updated: October 2026 | Bharat Darshan"
    >
      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">1. Informational & Travel Advisory Notice</h2>
        <p className="text-slate-600">
          The information contained on this website is for general informational and trip planning purposes only. While Bharat Darshan strives to keep transportation hubs, railway timetables, airport proximity, and monument visiting guidelines verified and up to date, we make no representations or warranties of any kind, express or implied, regarding completeness or accuracy.
        </p>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 font-medium">
          Travel information, prices and availability are subject to change without prior notice based on weather conditions, seasonal demand, local festival arrangements, or government advisories.
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">2. Places of Worship & Cultural Etiquette</h2>
        <p className="text-slate-600">
          Religious destinations across India have individual trust management rules, specific dress codes, sanctum restrictions, and variable queue management. Travelers are advised to consult official shrine trusts or local coordinators for special darshan protocols.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">3. External Links & Advertisements</h2>
        <p className="text-slate-600">
          Bharat Darshan may display advertisements served by Google AdSense and links to third-party services. We do not endorse or assume responsibility for content, services, or privacy policies of third-party platforms.
        </p>
      </section>
    </LegalLayout>
  );
};

export const CookiePolicy: React.FC = () => {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="Last Updated: October 2026 | Bharat Darshan"
    >
      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">1. What Are Cookies?</h2>
        <p className="text-slate-600">
          Cookies are small text files stored on your computer or mobile device when you visit a website. They allow the site to remember your preferences (such as search criteria and visited pages) and facilitate smooth site operation.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">2. Cookies We Use</h2>
        <p className="text-slate-600">
          We use functional cookies to store local trip enquiry drafts and Google AdSense advertising cookies to display relevant, non-intrusive advertisements according to standard web practices.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-slate-900">3. Managing Cookie Preferences</h2>
        <p className="text-slate-600">
          You can configure your browser to block or delete cookies at any time. Please note that disabling cookies may affect certain interactive site features.
        </p>
      </section>
    </LegalLayout>
  );
};
