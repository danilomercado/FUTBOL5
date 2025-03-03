import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-rgb(206, 206, 206)rounded-lg shadow-sm dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              {/* <img src="/src/assets/images.png" className="h-8" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                ArmaF5
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a
                  href="https://github.com/danilomercado"
                  className="hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="" className="hover:underline">
              ArmaF5™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
