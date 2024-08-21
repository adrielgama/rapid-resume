import React from 'react'

function PrivacyPolicy() {
  return (
    <div className="px-2">
      <p className="mt-2 text-xs italic text-gray-800 dark:text-zinc-500">
        This Privacy Policy describes how we handle your personal information
        when you use our service. By using our service, you agree to the
        collection and use of information in accordance with this policy.
      </p>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        1. Information We Collect
      </h2>
      <ul className="ml-6 list-disc text-sm text-gray-500 dark:text-gray-400">
        <li>
          <strong>Personal Data</strong>: While using our service, we may ask
          you to provide us with certain personally identifiable information,
          such as your name, email address, and any other data you choose to
          provide.
        </li>
        <li>
          <strong>Usage Data</strong>: We may collect information on how our
          service is accessed and used. This may include your IP address,
          browser type, browser version, the pages of our service that you
          visit, the time and date of your visit, and other diagnostic data.
        </li>
      </ul>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        2. How We Use Your Information
      </h2>
      <ul className="ml-6 list-disc text-sm text-gray-500 dark:text-gray-400">
        <li>
          <strong>To provide and maintain our service</strong>: We use your
          information to deliver the service you have requested, such as
          generating PDFs based on the data you provide.
        </li>
        <li>
          <strong>To communicate with you</strong>: We may use your contact
          information to send updates, respond to inquiries, or provide
          technical support.
        </li>
      </ul>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        3. Data Security
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        We take data security seriously and implement reasonable measures to
        protect your information. However, no method of transmission over the
        internet or method of electronic storage is 100% secure, so we cannot
        guarantee its absolute security.
      </p>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        4. Changes to This Privacy Policy
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        5. Contact Us
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        If you have any questions about this Privacy Policy, please contact us
        at: adrielgama@gmail.com
      </p>
    </div>
  )
}

export default PrivacyPolicy
