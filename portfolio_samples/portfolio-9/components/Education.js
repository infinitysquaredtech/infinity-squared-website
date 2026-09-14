function Education() {
    try {
        return (
            <section id="education" className="py-20 bg-slate-50" data-name="education" data-file="components/Education.js">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <ScrollReveal>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Education</h2>
                                    <div className="h-1 w-20 bg-sky-500 rounded"></div>
                                </div>
                            </ScrollReveal>
                            
                            <ScrollReveal delay={100}>
                                <p className="text-slate-600 mb-8 text-lg">
                                    Academic background laying the foundation for strategic leadership and financial expertise.
                                </p>
                            </ScrollReveal>
                            
                            <ScrollReveal delay={200}>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mr-4">
                                            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                                                <div className="icon-graduation-cap text-2xl"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Indian Institute of Management, Shillong</h3>
                                            <p className="text-slate-600 mt-1">Master of Business Administration (MBA)</p>
                                            <div className="flex items-center mt-3 text-sm text-slate-500">
                                                <div className="icon-calendar w-4 h-4 mr-2"></div>
                                                <span>2013 - 2015</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                        
                        {/* Decorative Image/Pattern side */}
                        <div className="hidden md:block relative h-full min-h-[300px]">
                            <ScrollReveal delay={300} className="h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden h-full">
                                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
                                    <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="icon-book-open text-sky-600 text-2xl"></div>
                                            <div className="text-sm font-semibold text-slate-900">Key Focus Areas</div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-slate-100 px-3 py-1 rounded text-xs text-slate-700">Strategic Management</span>
                                            <span className="bg-slate-100 px-3 py-1 rounded text-xs text-slate-700">Financial Analysis</span>
                                            <span className="bg-slate-100 px-3 py-1 rounded text-xs text-slate-700">Business Ethics</span>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Education error:', error);
        return null;
    }
}