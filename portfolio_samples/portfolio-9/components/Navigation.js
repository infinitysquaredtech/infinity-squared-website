function Navigation() {
    try {
        const [isScrolled, setIsScrolled] = React.useState(false);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

        React.useEffect(() => {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 20);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const navLinks = [
            { name: 'About', href: '#hero' },
            { name: 'Experience', href: '#experience' },
            { name: 'Education', href: '#education' },
            { name: 'Skills', href: '#skills' },
            { name: 'Contact', href: '#contact' },
        ];

        return (
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
                data-name="navigation" 
                data-file="components/Navigation.js"
            >
                <div className="container-custom flex justify-between items-center">
                    <a href="#" className="text-xl font-bold tracking-tight text-slate-900">
                        AB<span className="text-sky-500">.</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className="icon-menu text-xl"></div>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg p-4 flex flex-col space-y-4">
                         {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors block"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        );
    } catch (error) {
        console.error('Navigation error:', error);
        return null;
    }
}