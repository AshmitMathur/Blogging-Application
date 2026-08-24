import React from "react";
import { assets, footer_data } from "../Assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
    const getPath = (link) => {
        const paths = {
            "Home": "/",
            "Latest Blogs": "/",
            "Write a Blog": "/write",
            "My Blogs": "/profile",
            "About Us": "/",
            "Contact Us": "/",
            "FAQs": "/",
            "Privacy Policy": "/",
        };

        return paths[link] || "/";
    };

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 dark:bg-gray-950">
            
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30">

                {/* Logo & Description */}
                <div className="max-w-md">
                    <img
                        src={assets.logo}
                        alt="Blogging AI Logo"
                        className="w-32 sm:w-44 dark:invert"
                    />

                    <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-300">
                        Share your ideas, discover new perspectives, and
                        connect with a community of passionate writers.
                        Start writing and let your ideas reach the world.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-8">
                    {footer_data.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 mb-4">
                                {section.title}
                            </h3>

                            <ul className="text-sm space-y-2">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        {section.title === "Community" ? (
                                            <a
                                                href="#"
                                                className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
                                            >
                                                {link}
                                            </a>
                                        ) : (
                                            <Link
                                                to={getPath(link)}
                                                className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
                                            >
                                                {link}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Copyright */}
            <div className="py-5 text-center text-sm text-gray-500 dark:text-gray-300">
                © 2026 Blogging AI. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;