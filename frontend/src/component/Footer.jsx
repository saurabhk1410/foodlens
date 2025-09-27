import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Left Logo Image */}
          <div className="flex justify-center xl:justify-start mt-12 xl:mt-0">
            <img
              src="https://i.postimg.cc/Znd63ZzC/pngtree-clink-glasses-to-celebrate-beer-cheers-oktoberfest-png-image-8377065-removebg-preview.png"
              className="w-56"
              alt="FoodLens Celebration Logo"
              loading="lazy"
            />
          </div>

          {/* Footer Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Product Links */}
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/features"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="/pricing"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="/case-studies"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/reviews"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/about"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/careers"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Legal Links */}
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/privacy"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/terms"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="/cookies"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Brand & Social Links */}
              <div className="space-y-8 mt-8 md:mt-0">
                {/* Brand */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://i.postimg.cc/nLprcQxw/image-1-removebg-preview.png"
                      className="w-12"
                      alt="FoodLens Logo"
                      loading="lazy"
                    />
                    <span className="text-xl font-bold text-white">
                      Food<span className="text-gray-400">Lens</span>
                    </span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-6 justify-center">
                  {/* Facebook */}
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"
                        clipRule="evenodd"
                      />
                      <circle cx="12" cy="12" r="3.333" />
                    </svg>
                  </a>

                  {/* Twitter */}
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2025 FoodLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
