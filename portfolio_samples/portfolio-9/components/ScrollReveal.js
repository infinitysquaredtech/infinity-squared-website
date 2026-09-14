function ScrollReveal({ children, className = "", delay = 0 }) {
    try {
        const [isVisible, setIsVisible] = React.useState(false);
        const domRef = React.useRef();

        React.useEffect(() => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Once visible, we can stop observing if we only want it to animate once
                        observer.unobserve(entry.target); 
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before bottom
            });

            const currentElement = domRef.current;
            if (currentElement) {
                observer.observe(currentElement);
            }

            return () => {
                if (currentElement) {
                    observer.unobserve(currentElement);
                }
            };
        }, []);

        const style = {
            transitionDelay: `${delay}ms`,
        };

        return (
            <div
                ref={domRef}
                className={`reveal ${isVisible ? 'active' : ''} ${className}`}
                style={style}
            >
                {children}
            </div>
        );
    } catch (error) {
        console.error('ScrollReveal error:', error);
        return <div className={className}>{children}</div>;
    }
}