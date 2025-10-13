import React, { useState } from 'react';
import CheckoutButton from './CheckOutButton';
import { BrandContext } from './context/brandContext.';

const VerifyBrand = () => {
  const [email, setEmail] = useState('');
  const {is_Brand , brandCode , brandPassword} = React.useContext(BrandContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Verification email sent to ${email}`);
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [is_Brand]);


  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-10 py-10">
  {/* Top section — Payment / Email Verification */}
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
    <h2 className="text-2xl font-semibold text-center mb-6">Verify Your Email</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Enter your email"
        />
      </div>

      <CheckoutButton email={email} />
    </form>
  </div>

 
  {is_Brand && <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 border border-gray-100 select-none">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Brand Credentials
    </h1>
    <h3  className="text-lg font-bold text-gray-800 mb-6 text-center">

      Credentials won't be provided again better save them

    </h3>

    <div className="mb-4">
      <p className="text-sm text-gray-500 font-semibold mb-2">Brand Code</p>
      <div className="bg-gray-100 rounded-lg py-3 px-4 text-gray-800 font-mono text-base">
        <p>
            {brandCode.toString()}

        </p>
      
      </div>
    </div>

    <div>
      <p className="text-sm text-gray-500 font-semibold mb-2">Brand Password</p>
      <div className="bg-gray-100 rounded-lg py-3 px-4 text-gray-800 font-mono text-base">
        <p>
              {brandPassword.toString()}

        </p>
    
      </div>
    </div>
  </div>}
</div>

  );
};

export default VerifyBrand;
