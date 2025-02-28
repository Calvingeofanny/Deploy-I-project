export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2025 C'Books Admin Portal. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-[#ee4d2d] text-sm">
              Terms of Service
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-500 hover:text-[#ee4d2d] text-sm">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-500 hover:text-[#ee4d2d] text-sm">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
