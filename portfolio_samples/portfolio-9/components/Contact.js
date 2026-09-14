function Contact() {
    try {
        return (
            <section id="contact" className="py-20 bg-slate-900 text-white" data-name="contact" data-file="components/Contact.js">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <ScrollReveal>
                                <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                                    I am always open to discussing new opportunities, strategic collaborations, or sharing insights on growth and development.
                                </p>
                            </ScrollReveal>
                            
                            <div className="space-y-6">
                                <ScrollReveal delay={100}>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-sky-400">
                                            <div className="icon-map-pin text-xl"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">Location</div>
                                            <div className="font-medium">Mumbai, MH, India</div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                                
                                <ScrollReveal delay={200}>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-sky-400">
                                            <div className="icon-linkedin text-xl"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">Professional Network</div>
                                            <a href="#" className="font-medium hover:text-sky-400 transition-colors">linkedin.com/in/aman-bhaiya</a>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={300}>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-sky-400">
                                            <div className="icon-mail text-xl"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">Email</div>
                                            <a href="mailto:contact@amanbhaiya.com" className="font-medium hover:text-sky-400 transition-colors">contact@amanbhaiya.com</a>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        <ScrollReveal delay={400}>
                            <div className="bg-white p-8 rounded-2xl text-slate-900">
                                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                        <textarea rows="4" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all" placeholder="How can we collaborate?"></textarea>
                                    </div>
                                    <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Contact error:', error);
        return null;
    }
}