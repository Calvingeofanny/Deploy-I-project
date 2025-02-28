export default function BookBanner() {
  return (
    <div className="bg-[#f53d2d] py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <div className="flex items-center gap-4">
              <i className="fas fa-shipping-fast text-3xl text-[#f53d2d]"></i>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-500">For all orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-shield-alt text-3xl text-[#f53d2d]"></i>
              <div>
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% secure payment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <i className="fas fa-headset text-3xl text-[#f53d2d]"></i>
              <div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-gray-500">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
