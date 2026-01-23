import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, Package, CreditCard, AlertTriangle, Store } from 'lucide-react';

const TermsAndConditions = () => {
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
              <FileText className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Terms and Conditions
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
              <FileText className="h-5 w-5 mr-2 text-teal-600" />
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to ShopHub. These Terms and Conditions govern your use of our e-commerce platform 
              and services. By registering an account or using our services, you agree to comply with 
              and be bound by these terms. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-teal-600" />
              User Accounts
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Account Registration:</strong> You must provide accurate, complete, and current 
                information when registering an account. You are responsible for maintaining the 
                confidentiality of your account credentials.
              </p>
              <p>
                <strong>Account Responsibilities:</strong> You are solely responsible for all activities 
                that occur under your account. You must notify us immediately of any unauthorized use 
                of your account.
              </p>
              <p>
                <strong>Account Termination:</strong> We reserve the right to suspend or terminate 
                accounts that violate these terms or engage in fraudulent activities.
              </p>
            </div>
          </section>

          {/* Vendor Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Store className="h-5 w-5 mr-2 text-teal-600" />
              Vendor Terms
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Approval Process:</strong> All vendor applications are subject to review and 
                approval by ShopHub administration. We reserve the right to reject any application 
                without providing specific reasons.
              </p>
              <p>
                <strong>Product Listings:</strong> Vendors must ensure all product listings are accurate, 
                legal, and comply with applicable laws. Products must be described truthfully with 
                accurate images and specifications.
              </p>
              <p>
                <strong>Pricing and Payments:</strong> Vendors are responsible for setting competitive 
                prices and will receive payments according to our payment schedule, minus applicable 
                commission fees.
              </p>
              <p>
                <strong>Shipping and Fulfillment:</strong> Vendors must ship orders within the 
                specified timeframe and provide tracking information. Failure to fulfill orders may 
                result in account suspension.
              </p>
            </div>
          </section>

          {/* Product Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-teal-600" />
              Product Information and Pricing
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Product Accuracy:</strong> We strive to provide accurate product descriptions, 
                images, and pricing. However, we do not warrant that product descriptions or other 
                content are accurate, complete, reliable, current, or error-free.
              </p>
              <p>
                <strong>Price Changes:</strong> Prices are subject to change without notice. We reserve 
                the right to modify or discontinue products at any time.
              </p>
              <p>
                <strong>Availability:</strong> Product availability is not guaranteed. We may limit 
                quantities available for purchase.
              </p>
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-teal-600" />
              Payment Terms
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Payment Processing:</strong> All payments are processed through secure 
                third-party payment processors. By providing payment information, you represent 
                that you are authorized to use the payment method.
              </p>
              <p>
                <strong>Refund Policy:</strong> Refunds are handled according to our individual 
                vendor policies and applicable consumer protection laws.
              </p>
              <p>
                <strong>Fraud Prevention:</strong> We reserve the right to refuse or cancel any 
                order suspected of fraudulent activity.
              </p>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-teal-600" />
              Prohibited Activities
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>You may not use our platform to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sell illegal, counterfeit, or prohibited products</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Violate intellectual property rights</li>
                <li>Upload malicious code or viruses</li>
                <li>Spam or harass other users</li>
                <li>Interfere with or disrupt the platform's operation</li>
                <li>Use automated tools to access the platform excessively</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              ShopHub shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including but not limited to loss of profits, data, use, or 
              goodwill, arising out of or relating to your use of the platform.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of the platform constitutes acceptance 
              of any modified terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us at:
            </p>
            <div className="mt-4 space-y-2 text-gray-600">
              <p><strong>Email:</strong> legal@shophub.com</p>
              <p><strong>Phone:</strong> 1-800-SHOP-HUB</p>
              <p><strong>Address:</strong> 123 Commerce Street, Business City, BC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
