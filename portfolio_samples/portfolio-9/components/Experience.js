function Experience() {
    try {
        const experiences = [
            {
                role: 'Vice President and Head (Strategy and Growth)',
                company: 'SBI Foundation',
                period: 'Present',
                type: 'Current',
                description: 'Leading strategy and growth initiatives to drive organizational impact and sustainable development goals.',
                icon: 'icon-briefcase'
            },
            {
                role: 'Previous Experience',
                company: 'Bill & Melinda Gates Foundation',
                period: 'Past Role',
                type: 'Previous',
                description: 'Contributed to strategic philanthropic initiatives and program management.',
                icon: 'icon-building'
            },
            {
                role: 'Previous Experience',
                company: 'SBI Foundation',
                period: 'Past Role',
                type: 'Previous',
                description: 'Various roles contributing to the foundation\'s growth and community impact.',
                icon: 'icon-building-2'
            },
            {
                role: 'Financial Advisor',
                company: 'Edelweiss Financial Advisors Ltd',
                period: 'Past Role',
                type: 'Previous',
                description: 'Provided expert financial advice and strategic investment solutions.',
                icon: 'icon-trending-up'
            }
        ];

        return (
            <section id="experience" className="py-20 bg-white" data-name="experience" data-file="components/Experience.js">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Experience</h2>
                            <div className="h-1 w-20 bg-sky-500 rounded"></div>
                        </div>
                    </ScrollReveal>

                    <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-12">
                        {experiences.map((exp, index) => (
                            <ScrollReveal key={index} delay={index * 100}>
                                <div className="relative pl-8 md:pl-12 group">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-0 h-5 w-5 rounded-full border-4 border-white ${index === 0 ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-300'}`}></div>
                                    
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                                {exp.role}
                                            </h3>
                                            <div className="text-lg text-slate-700 font-medium mb-1">
                                                {exp.company}
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mt-2 sm:mt-0 ${
                                            exp.type === 'Current' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed max-w-2xl">
                                        {exp.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Experience error:', error);
        return null;
    }
}