
export default function TermsPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-8">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Introduction</h2>
      <p>Welcome to FairBid! These Terms of Service ("Terms") govern your use of our website and services. By accessing or using FairBid, you agree to be bound by these Terms.</p>

      <h2>2. User Accounts</h2>
      <p>To use certain features of FairBid, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

      <h2>3. Bidding and Auctions</h2>
      <p>All bids are binding. Once a bid is placed, it cannot be retracted except in very limited circumstances outlined in our Bidding Policy. Winning bidders are obligated to complete the transaction.</p>
      <p>Sellers are responsible for accurately describing items listed for auction and for fulfilling sales to winning bidders.</p>

      <h2>4. Prohibited Conduct</h2>
      <p>You agree not to engage in any of the following prohibited activities:</p>
      <ul>
        <li>Violating any laws or regulations.</li>
        <li>Infringing on the intellectual property rights of others.</li>
        <li>Posting false, inaccurate, misleading, defamatory, or libelous content.</li>
        <li>Distributing viruses or any other technologies that may harm FairBid or its users.</li>
        <li>Using any robot, spider, scraper, or other automated means to access our services for any purpose without our express written permission.</li>
      </ul>

      <h2>5. Fees and Payments</h2>
      <p>FairBid may charge fees for certain services, such as listing items or successful sales. Any applicable fees will be disclosed to you prior to incurring them. All fees are non-refundable.</p>

      <h2>6. Disclaimers and Limitation of Liability</h2>
      <p>FairBid is provided "as is" and "as available" without any warranties of any kind. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
      <p>To the fullest extent permitted by law, FairBid shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.</p>

      <h2>7. Termination</h2>
      <p>We may terminate or suspend your account and access to FairBid at our sole discretion, without prior notice or liability, for any reason, including if you breach these Terms.</p>

      <h2>8. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

      <h2>9. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of FairBid after any such changes constitutes your acceptance of the new Terms.</p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us through our <a href="/support">Support Page</a>.</p>
    </div>
  );
}
