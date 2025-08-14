import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-black text-white font-serif border-t border-gray-800 pt-10 pb-4 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Brand & Tagline */}
                <div className="flex-1 mb-8 md:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                        <img src="/images/car.png" alt="CarRental Logo" className="h-10 w-10" />
                        <span className="text-2xl font-bold">CarRental</span>
                    </div>
                    <p className="text-gray-400 max-w-xs text-sm">Drive your dream car with ease. Premium cars, best service, and total satisfaction—every time you ride with us.</p>
                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook"><FaFacebook size={22} /></a>
                        <a href="#" className="hover:text-blue-300 transition" aria-label="Twitter"><FaTwitter size={22} /></a>
                        <a href="#" className="hover:text-pink-400 transition" aria-label="Instagram"><FaInstagram size={22} /></a>
                        <a href="#" className="hover:text-blue-600 transition" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
                    </div>
                </div>

                {/* Links */}
                <div className="flex-1 grid grid-cols-2 gap-8 md:gap-16">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Company</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white transition">About</a></li>
                            <li><a href="#" className="hover:text-white transition">Services</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition">Reviews</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Support</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition">Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Admin</a></li>
                            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} CarRental. All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;
