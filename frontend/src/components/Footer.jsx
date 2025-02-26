import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#222924] border-t text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Services Section */}
          <div>
            <h3 className="font-semibold text-white mb-2">Services</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-white hover:underline">
                  Personal Training
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Personal Classes
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Personal Diet
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-white mb-2">Company</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-white hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-white mb-2">Support</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-white hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="font-semibold text-white mb-2">Address</h3>
            <p className="text-white-600">
              1358 W Valley Pkwy #1018,
              <br />
              Escondido, CA 92029
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        {/* Footer Bottom */}
        <div className="mt-6 border-gray-300 pt-4 text-sm text-white text-center">
          <p>© COPYRIGHT 2025. ALL RIGHTS RESERVED.</p>
          <p className="font-semibold">Website Design by My Training Club</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
