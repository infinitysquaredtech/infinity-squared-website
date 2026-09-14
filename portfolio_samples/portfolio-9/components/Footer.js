function Footer() {
    try {
        const currentYear = new Date().getFullYear();
        return (
            <footer className="bg-slate-950 text-slate-500 py-8 border-t border-slate-900" data-name="footer" data-file="components/Footer.js">
                <div className="container-custom flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-semibold text-slate-300">Aman Bhaiya</span>
                        <span className="mx-2">|</span>
                        <span>Strategy & Growth</span>
                    </div>
                    <div className="text-sm">
                        &copy; {currentYear} All rights reserved.
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer error:', error);
        return null;
    }
}