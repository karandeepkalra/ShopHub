import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock, Cookie, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/register" 
            className="inline-flex items-center text-teal-600 hover:text-teal-500 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Registration
          </Link>
          
          <div className="text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-teal-100 mb-4">
              <Shield className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-teal-600" />
              Our Commitment to Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At ShopHub, we are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, protect, and share your information when you 
              use our e-commerce platform. By using ShopHub, you agree to the collection and use of information 
              in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-teal-600" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name, email address, phone number</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by third parties)</li>
                  <li>Account credentials and preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Business Information (Vendors)</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Business name and description</li>
                  <li>Tax identification numbers</li>
                  <li>Bank account information for payments</li>
                  <li>Product and inventory data</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Click patterns and navigation paths</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-teal-600" />
              How We Use Your Information
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Provision:</strong> To provide, maintain, and improve our e-commerce platform</li>
                <li><strong>Order Processing:</strong> To process transactions, manage orders, and arrange shipping</li>
                <li><strong>Communication:</strong> To send order confirmations, shipping updates, and customer support</li>
                <li><strong>Personalization:</strong> To personalize your experience and show relevant products</li>
                <li><strong>Security:</strong> To detect and prevent fraud, abuse, and security issues</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
                <li><strong>Marketing:</strong> To send promotional communications (with your consent)</li>
                <li><strong>Analytics:</strong> To analyze usage patterns and improve our services</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-teal-600" />
              Information Sharing
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With Vendors:</strong> Your shipping address and order details are shared with 
                relevant vendors to fulfill your orders</li>
                <li><strong>Payment Processors:</strong> Payment information is shared with secure payment 
                processors to complete transactions</li>
                <li><strong>Shipping Partners:</strong> Address and contact information is shared with 
                shipping carriers for delivery</li>
                <li><strong>Service Providers:</strong> With trusted third-party service providers who 
                help operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sales 
                of assets</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-teal-600" />
              Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. These include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-gray-600">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure password storage and authentication</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and employee training</li>
              <li>Compliance with industry security standards</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Cookie className="h-5 w-5 mr-2 text-teal-600" />
              Cookies and Tracking Technologies
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Performance Cookies:</strong> To collect usage statistics and improve performance</li>
                <li><strong>Functional Cookies:</strong> To remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> To show relevant advertisements (with consent)</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences, though this may affect 
                some platform features.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
            <div className="space-y-3 text-gray-600">
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information only as long as necessary to fulfill the purposes 
              outlined in this policy, unless a longer retention period is required or permitted by law. 
              Factors considered include the nature of our services, legal requirements, and your preferences.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our platform is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you become aware that a child 
              has provided us with personal information, please contact us immediately.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed">
              Your personal information may be transferred to and processed in countries other than 
              your own. We ensure appropriate safeguards are in place to protect your information 
              in accordance with applicable data protection laws.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date. Your 
              continued use of our platform after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-teal-600" />
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy or want to exercise your rights, 
              please contact us at:
            </p>
            <div className="mt-4 space-y-2 text-gray-600">
              <p><strong>Email:</strong> privacy@shophub.com</p>
              <p><strong>Phone:</strong> 1-800-SHOP-HUB</p>
              <p><strong>Address:</strong> 123 Commerce Street, Business City, BC 12345</p>
              <p><strong>Privacy Officer:</strong> privacy.officer@shophub.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
