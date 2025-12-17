export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="text-gray-700 mb-4">
        This Cookie Policy explains how we use cookies and similar technologies
        to recognize you when you visit our website. It explains what these
        technologies are, why we use them, and your rights to control our use of
        them.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What are cookies?</h2>
      <p className="text-gray-700 mb-4">
        Cookies are small text files that are placed on your device when you
        visit a website. They are widely used to make websites work efficiently
        and to provide information to the website owners.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Why do we use cookies?</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
        <li>To ensure the website functions properly</li>
        <li>To understand how users interact with our website</li>
        <li>To improve performance and user experience</li>
        <li>To provide personalised content and advertisements</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Types of cookies we use</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
        <li>
          <strong>Necessary cookies:</strong> Required for basic site
          functionality such as security, network management, and accessibility.
        </li>
        <li>
          <strong>Analytics cookies:</strong> Help us understand how visitors
          interact with the website (for example, Google Analytics).
        </li>
        <li>
          <strong>Marketing cookies:</strong> Used to deliver relevant
          advertisements and track ad performance.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your choices</h2>
      <p className="text-gray-700 mb-4">
        You can choose to accept all cookies, reject non-essential cookies, or
        allow only necessary cookies through the cookie consent banner displayed
        on our website. You can also change your preferences at any time by
        clearing cookies from your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to this policy</h2>
      <p className="text-gray-700 mb-4">
        We may update this Cookie Policy from time to time to reflect changes in
        technology, legislation, or our practices. Any updates will be posted on
        this page.
      </p>

      <p className="text-gray-500 text-sm mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
