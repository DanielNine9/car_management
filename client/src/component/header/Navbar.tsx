import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-white text-xl font-bold hover:text-gray-300 transition"
          >
            Cars
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link
                to="/news"
                className="text-white hover:text-gray-300 transition"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/hot"
                className="text-white hover:text-gray-300 transition"
              >
                Hot
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="text-white hover:text-gray-300 transition"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
