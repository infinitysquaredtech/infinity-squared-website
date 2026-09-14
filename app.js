function App() {
    try {
        const [currentRoute, setCurrentRoute] = React.useState(Router.currentRoute);

        React.useEffect(() => {
            Router.init();
            
            const handleRouteChange = () => {
                setCurrentRoute(Router.currentRoute);
            };
            
            window.addEventListener('routechange', handleRouteChange);
            return () => window.removeEventListener('routechange', handleRouteChange);
        }, []);

        const renderPage = () => {
            switch (currentRoute) {
                case '/services/ar-vr':
                    return (
                    <div>
                        <ARVRPage />
                        <Contact />
                    </div>);
                case '/services/ai-ml':
                    return (
                    <div>
                        <AIMLPage />
                        <Contact />
                    </div>);
                case '/services/web-dev':
                    return (
                    <div>
                        <WebDevPage />
                        <Contact />
                    </div>);
                default:
                    return (
                        <div>
                            <Hero />
                            <Clients />
                            <Services />
                            <About />
                            <Contact />
                        </div>
                    );
            }
        };

        return (
            <div data-name="app" data-file="app.min.js">
                <Header />
                {renderPage()}
                <Footer />
                <ScrollToTop />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        return <div>Something went wrong</div>;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
