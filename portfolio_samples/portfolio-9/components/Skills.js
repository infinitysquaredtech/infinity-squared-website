function Skills() {
    try {
        const skills = [
            "Strategy", "Growth Management", "Business Development", 
            "Hedging", "Options", "Index Options", 
            "Customer Service", "Team Leadership", "Financial Analysis",
            "Stakeholder Management", "Project Planning"
        ];

        return (
            <section id="skills" className="py-20 bg-white" data-name="skills" data-file="components/Skills.js">
                <div className="container-custom text-center max-w-4xl">
                    <ScrollReveal>
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
                            <div className="h-1 w-20 bg-sky-500 rounded mx-auto"></div>
                            <p className="mt-4 text-slate-600">A robust skill set developed through years of experience in finance and strategy.</p>
                        </div>
                    </ScrollReveal>

                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, index) => (
                            <ScrollReveal key={index} delay={index * 50}>
                                <div 
                                    className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-full text-slate-700 font-medium hover:bg-white hover:border-sky-200 hover:text-sky-600 hover:shadow-md transition-all cursor-default"
                                >
                                    {skill}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Skills error:', error);
        return null;
    }
}