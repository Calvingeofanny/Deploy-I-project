export default function Footer() {
  return (
    <footer className="bg-[#fbfbfb] pt-16 mt-8">
      {/* Main Footer */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Customer Service */}
          <div>
            <h4 className="text-[#0000008A] font-medium mb-4 text-xs tracking-wider">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  Help Centre
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  How to Buy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  Return & Refund
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* About C'books */}
          <div>
            <h4 className="text-[#0000008A] font-medium mb-4 text-xs tracking-wider">
              ABOUT C'BOOKS
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  C'books Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  C'books Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#000000CC] hover:text-[#ee4d2d] text-xs"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-[#0000008A] font-medium mb-4 text-xs tracking-wider">
              PAYMENT
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border border-[#0000001A] p-1.5 rounded-sm">
                <img
                  src="https://pbs.twimg.com/media/EUbePLEU0AIpder.jpg"
                  alt="OVO"
                  className="h-5 w-full object-contain"
                />
              </div>
              <div className="bg-white border border-[#0000001A] p-1.5 rounded-sm">
                <img
                  src="https://cdn.antaranews.com/cache/1200x800/2022/04/25/dana.jpg"
                  alt="DANA"
                  className="h-5 w-full object-contain"
                />
              </div>
              <div className="bg-white border border-[#0000001A] p-1.5 rounded-sm">
                <img
                  src="https://brandlogos.net/wp-content/uploads/2022/10/gopay-logo_brandlogos.net_gph3u.png"
                  alt="Gopay"
                  className="h-5 w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[#0000008A] font-medium mb-4 text-xs tracking-wider">
              FOLLOW US
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-[#0000008A] font-medium mb-4 text-xs tracking-wider">
              DOWNLOAD APP
            </h4>
            <div className="flex space-x-2">
              <a href="#" className="flex-1">
                <img
                  src="https://cf.shopee.co.id/file/ad01628e90ddf248076685f73497c163"
                  alt="App Store"
                  className="w-full"
                />
              </a>
              <a href="#" className="flex-1">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=id"
                  alt="Google Play"
                  className="w-full"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-[#0000001A]"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="text-center">
            <p className="text-xs text-[#000000CC] mb-4">
              © 2025 C'books. All Rights Reserved.
            </p>
            <div className="flex justify-center items-center space-x-4 text-xs">
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                Privacy Policy
              </a>
              <span className="text-[#0000001A]">|</span>
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                Terms of Service
              </a>
              <span className="text-[#0000001A]">|</span>
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                Security
              </a>
              <span className="text-[#0000001A]">|</span>
              <a href="#" className="text-[#000000CC] hover:text-[#ee4d2d]">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
