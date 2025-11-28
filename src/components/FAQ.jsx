import React, { useState, useEffect } from "react";

// Your FAQ data (mix Hindi + English)
const faqs = [
  {
    question: "रिफंड पॉलिसी क्या है?",
    answer: "हम 30 दिनों के अंदर पूरा रिफंड प्रदान करते हैं।",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact our support team anytime on email or WhatsApp.",
  },
  {
    question: "क्या ट्रायल अकाउंट मिलता है?",
    answer: "हाँ, हम 7 दिन का फ्री ट्रायल प्रदान करते हैं। You can contact our support team anytime on email or WhatsApp.",
  },
];

// Detect language (Hindi or English)
const detectLanguage = (text) => {
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(text)) return "hi-IN"; // Hindi
  return "en-US"; // English
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [voices, setVoices] = useState([]);

  // Load system voices correctly
  const loadVoices = () => {
    const v = window.speechSynthesis.getVoices();
    if (v.length > 0) {
      setVoices(v);
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }, []);

  // Speak function
  const speakText = (text) => {
    window.speechSynthesis.cancel(); // stop previous speech

    const lang = detectLanguage(text);

    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;
    msg.pitch = 1;
    msg.rate = 1;

    // Try to find matching voice
    const voice = voices.find((v) => v.lang === lang);

    if (voice) {
      msg.voice = voice;
    } else {
      console.warn("No voice found for:", lang);
    }

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
            <span className="text-xl">
              {activeIndex === index ? "▲" : "▼"}
            </span>
          </div>

          {/* Answer + Speaker Button */}
          {activeIndex === index && (
            <div className="mt-3 text-gray-700 flex items-start justify-between">
              <p className="w-10/12">{faq.answer}</p>

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
