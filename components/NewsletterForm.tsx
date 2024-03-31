"use client";
import { FormEvent, useRef, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { getPlaneKeyframes } from "@/lib/getPlaneKeyframes";
import { getTrailsKeyframes } from "@/lib/getTrailsKeyframes";

export default function NewsletterForm() {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { to, fromTo, set } = gsap;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = value;
    const button = buttonRef.current;

    if (!email || !button) return;

    if (!active) {
      setActive(true);
    }

    to(button, {
      keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setValue),
    });

    to(button, {
      keyframes: getTrailsKeyframes(button),
    });
  };

  return (
    <div className="flex flex-col space-y-8 md:w-[400px]">
      <form
        onSubmit={handleSubmit}
        className="newsletter-form mt-10 animate-fade-in-3"
      >
        <div className="group flex items-center gap-x-4 py-1 pl-4 pr-1 rounded-[9px] bg-[#090D11] hover:bg-[#15141B] shadow-outline-gray hover:shadow-transparent focus-within:bg-[#15141B] focus-within:!shadow-outline-gray-focus transition-all duration-300">
          <EnvelopeIcon className="hidden sm:inline w-6 h-6 text-[#4B4C52] group-focus-within:text-white group-hover:text-white transition-colors duration-300" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 text-white text-sm sm:text-base outline-none placeholder-[#4B4C52] group-focus-within:placeholder-white bg-transparent placeholder:transition-colors placeholder:duration-300"
          />
          <button
            ref={buttonRef}
            className={`disabled:!bg-[#17141F] disabled:grayscale-[65%] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base`}
            disabled={!value}
            type="submit"
          >
            <span className="default">Subscribe</span>
            <span className="success">
              <svg viewBox="0 0 16 16">
                <polyline points="3.75 9 7 12 13 5"></polyline>
              </svg>
              Done
            </span>
            <svg className="trails" viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className="plane">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
