"use client";

export default function DonationForm() {
  return (
    <div className="card p-8">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Make a Donation
          </h2>
          <p className="text-gray-700">
            Thank you for your interest in supporting Mariphil Foundation. 
            Please use the bank transfer details below to make your donation.
          </p>
        </div>

        <div className="bg-primary/5 rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Bank Transfer Details
          </h3>
          
          <div className="space-y-3 text-gray-800">
            <div>
              <p className="font-semibold">IBAN:</p>
              <p className="text-lg">DE11 6009 0700 0863 4900 00</p>
            </div>
            
            <div>
              <p className="font-semibold">BIC:</p>
              <p className="text-lg">SWBSDESS</p>
            </div>
            
            <div>
              <p className="font-semibold">Bank:</p>
              <p className="text-lg">Südwestbank Sigmaringen</p>
            </div>
            
            <div>
              <p className="font-semibold">Account holder:</p>
              <p className="text-lg">Hilfsprojekt MARIPHIL eV</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-gray-800">
            <strong>Important:</strong> Please include your address in the transfer reference 
            so we can issue you a tax-deductible donation receipt.
          </p>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            The aid project MARIPHIL eV is recognized as a charitable organization and is 
            entitled to issue tax-deductible donation receipts.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Tax Office: Sigmaringen, Tax No.: 85086/14962
          </p>
        </div>
      </div>
    </div>
  );
}
