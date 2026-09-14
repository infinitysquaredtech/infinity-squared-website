function Hero() {
    try {
        return (
            <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden" data-name="hero" data-file="components/Hero.js">
                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                        {/* Text Content */}
                        <div className="md:w-1/2">
                            <ScrollReveal>
                                <div className="inline-flex items-center space-x-2 bg-sky-50 px-3 py-1 rounded-full text-sky-700 text-sm font-medium mb-6">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                    </span>
                                    <span>Based in Mumbai, MH, IN</span>
                                </div>
                            </ScrollReveal>
                            
                            <ScrollReveal delay={100}>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6">
                                    Hi, I'm <span className="text-sky-600">Aman Bhaiya</span>.
                                </h1>
                            </ScrollReveal>
                            
                            <ScrollReveal delay={200}>
                                <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                                    Vice President and Head (Strategy and Growth) at <strong className="text-slate-900">SBI Foundation</strong>. 
                                    Driving impact through strategic initiatives and sustainable growth.
                                </p>
                            </ScrollReveal>
                            
                            <ScrollReveal delay={300}>
                                <div className="flex flex-wrap gap-4">
                                    <a 
                                        href="#contact" 
                                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Get in touch
                                    </a>
                                    <a 
                                        href="#experience" 
                                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-gray-50 transition-all"
                                    >
                                        View Experience
                                    </a>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Image Content */}
                        <div className="md:w-1/2 relative">
                            <ScrollReveal delay={400}>
                                <div className="relative z-10 w-full max-w-md mx-auto">
                                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                        <img 
                                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                            alt="Aman Bhaiya" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Floating Badges */}
                                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
                                        <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                                            <div className="icon-trending-up text-xl"></div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase font-semibold">Focus</div>
                                            <div className="text-sm font-bold text-slate-900">Strategy & Growth</div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Decorative background elements behind image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-sky-200/30 to-slate-200/30 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
                
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
            </section>
        );
    } catch (error) {
        console.error('Hero error:', error);
        return null;
    }
}