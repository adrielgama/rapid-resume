import React from 'react'

function CookiePolicy() {
  return (
    <div className="px-2">
      <p className="mt-2 text-xs italic text-gray-800 dark:text-gray-500">
        By using our website, you agree to the use of cookies in accordance with
        this Cookie Policy. Please read it carefully.
      </p>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        1. What Are Cookies?
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Cookies are small text files that are placed on your device when you
        visit a website. They are widely used to make websites work more
        efficiently, as well as to provide information to the site owners.
      </p>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        2. How We Use Cookies
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        We use cookies to improve your experience on our site, such as
        remembering your preferences and repeat visits. Some cookies are
        essential for the functioning of our site, while others help us to
        improve your experience by providing insights into how the site is being
        used.
      </p>

      <h2 className="mt-6 text-xl font-bold text-dark-blue dark:text-gray-100">
        3. Types of Cookies We Use
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Necessary Cookies:</strong> These cookies are essential for the
        website to function and cannot be switched off in our systems. They are
        usually set in response to actions made by you, such as setting your
        privacy preferences, logging in, or filling out forms.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Performance Cookies:</strong> These cookies allow us to count
        visits and traffic sources so we can measure and improve the performance
        of our site. They help us to know which pages are the most and least
        popular and see how visitors move around the site.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Functional Cookies:</strong> These cookies enable the website to
        provide enhanced functionality and personalization. They may be set by
        us or by third-party providers whose services we have added to our
        pages.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Targeting Cookies:</strong> These cookies may be set through our
        site by our advertising partners. They may be used by those companies to
        build a profile of your interests and show you relevant adverts on other
        sites.
      </p>
    </div>
  )
}

export default CookiePolicy
