import React, { useState } from "react";

const faqs = [
  {
    question: "What is your refund policy?",
    answer: "समाचार प्रस्तुतकर्ता, अर्थव्यवस्था, राजनीति और खेल से संबंधित नवीनतम समाचारों और घटनाक्रमों की जानकारी पेश करते हैं।.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact our support team via email or WhatsApp at any time.",
  },
  {
    question: "Do you offer trial accounts?",
    answer: "Yes, we provide a 7-day free trial with full features.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Text-to-Speech
  const speakText = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1; // speed
    msg.pitch = 1;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 cursor-pointer transition-all"
        >
          {/* Question Row */}
          <div
            className="flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>

            {/* Arrow icon */}
            <span className="text-xl">
              {activeIndex === index ? "▲" : "▼"}
            </span>
          </div>

          {/* Answer + Speaker Button */}
          {activeIndex === index && (
            <div className="mt-3 text-gray-700 flex items-start justify-between">
              <p className="w-10/12">{faq.answer}</p>

              {/* Speaker Button */}
              <button
                onClick={() => speakText(faq.answer)}
                className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                🔊
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
