'use client';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Note: Metadata cannot be exported from client components
// SEO metadata should be set in layout.tsx or via generateMetadata function in parent

export default function DonatePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I donate to the MARIPHIL Foundation?",
      answer: "You can donate directly through our official bank account or via our online donation page. Once we receive your donation, we will issue a receipt which can be used for tax deduction purposes."
    },
    {
      question: "Where does my donation go?",
      answer: "Your donation directly supports our ongoing projects — including children's welfare programs, educational assistance, sustainable livelihood projects, and environmental initiatives."
    },
    {
      question: "Can I volunteer with the MARIPHIL Foundation?",
      answer: "Yes! We welcome volunteers who are passionate about helping others. You can fill out our volunteer application form on the \"Get Involved\" page or contact us directly for more details."
    },
    {
      question: "Is MARIPHIL Foundation a registered organization?",
      answer: "Yes, MARIPHIL Foundation is a legally registered non-profit organization in the Philippines, recognized for its transparency and commitment to community development."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/images/Children's Village Gallery/Children's Village Gallery6.jpg"
            alt="Make a Difference"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 text-white px-6 md:px-12 lg:px-16 pb-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DONATE NOW</h1>
          <p className="text-xl max-w-2xl">
            Your donation helps us provide education, healthcare, and hope to children and families in need
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Your Impact
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Every donation, no matter the size, makes a real difference in the lives of those we serve. 
            Here is how your contribution helps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center">
            <p className="text-gray-600">Provides school supplies for one child for a month</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-gray-600">Covers nutritious meals for a child for two weeks</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-gray-600">Sponsors a child medical check-up and basic healthcare</p>
          </div>
          <div className="card p-6 text-center">
            <p className="text-gray-600">Supports a full scholarship for one semester</p>
          </div>
        </div>
      </section>

      {/* Donation Account Section */}
      <section className="bg-white section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              <span className="text-primary">&ldquo;</span>OUR DONATION ACCOUNT<span className="text-primary">&rdquo;</span>
            </h2>
          </div>

          <div className="space-y-4 text-gray-900">
            <div>
              <p className="text-lg font-semibold">DONATION ACCOUNT:</p>
            </div>
            <div>
              <p className="text-lg"><strong>IBAN:</strong> DE11 6009 0700 0863 4900 00</p>
            </div>
            <div>
              <p className="text-lg"><strong>BIC:</strong> SWBSDESS</p>
            </div>
            <div>
              <p className="text-lg"><strong>Bank:</strong> Südwestbank Sigmaringen</p>
            </div>
            <div>
              <p className="text-lg"><strong>Account holder:</strong> Hilfsprojekt MARIPHIL eV</p>
            </div>

            <div className="pt-6">
              <p className="text-lg text-gray-900">
                The aid project MARIPHIL eV is recognized as a charitable organization and is therefore entitled to issue tax-deductible donation receipts (Sigmaringen Tax Office Tax No.: 85086/14962).
              </p>
            </div>

            <div className="pt-4">
              <p className="text-lg text-gray-900">
                Please include your <strong>address</strong> in the intended use so that we can issue you a donation receipt!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Further Information Section */}
      <section className="bg-gradient-to-r from-white to-green-50 section-container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-800">
              FURTHER INFORMATION
            </h2>
            
            <ul className="space-y-4 text-gray-800 text-lg">
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <p>
                  Do you have <strong>questions</strong> about your donation or donation receipt?
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <p>
                  Would you like to start a <strong>support campaign</strong> for MARIPHIL and need information material or posters?
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <p>
                  Interested in becoming a <strong>project sponsor</strong> at MARIPHIL eV? Find more information <Link href="/projects" className="underline hover:text-green-700 text-green-600">here</Link>.
                </p>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <p>
                  Would you like to request a <strong>donation</strong> for MARIPHIL for a special occasion?
                  Birthday, wedding, company party, housewarming, baptism... In addition to the intended purpose,
                  please include a personalized keyword for your invitation. We would be happy to share the success
                  of your &ldquo;Donations instead of flowers&rdquo; campaign with you.
                </p>
              </li>
            </ul>

            <p className="text-xl font-semibold text-green-800 mt-8">
              Please feel free to contact us!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 animate-in fade-in">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-primary/10 via-teal-50 to-green-50 py-20">
        <div className="text-center px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Questions About Donating?
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              If you have any questions about making a donation or need assistance, 
              please do not hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
              <a href="mailto:mail@mariphil.net" className="btn-secondary">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
