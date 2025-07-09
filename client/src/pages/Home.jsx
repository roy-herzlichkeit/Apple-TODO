import { words } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSnapshot } from "valtio";
import { store } from "../utils";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";
import { useAuth } from "../hooks/useAuth";
import PageTransition from "../components/ui/PageTransition";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import Footer from "../components/layout/Footer";

const Home = () => {
    const snap = useSnapshot(store);
    const navigate = useNavigate();
    const { triggerTransition } = useTransition();
    const { login, isAuthenticated, user } = useAuth();

    useGSAP(() => {
        gsap.fromTo(
            '.hero-text .wrapper > span',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.3, duration: 1, ease: 'power2.inOut' }
        );
    });

    const handleGoogleSignIn = async () => {
        try {
            const result = await login();
            if (result.success) {
                triggerTransition(() => {
                    store.signedIn = true;
                    const username = result.user.displayName?.toLowerCase().replace(/\s+/g, '') || 
                                   result.user.email?.split('@')[0] || 
                                   'user';
                    navigate(`/${username}`);
                });
            } else {
                console.error('Login failed:', result.error);
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    if (isAuthenticated && user) {
        const username = user.displayName?.toLowerCase().replace(/\s+/g, '') || 
                        user.email?.split('@')[0] || 
                        'user';
        triggerTransition(() => {
            store.signedIn = true;
            navigate(`/${username}`);
        });
    }

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <DarkModeToggle />
                <div className="flex-1">
                    <section id="hero" className="relative overflow-hidden font-i">
                        <div className="hero-layout">
                        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                            <div className="flex flex-col gap-7 h-20 md:h-30 lg:h-40 mt-48 overflow-hidden">
                                <div className="hero-text text-5xl md:text-8xl lg:text-9xl flex gap-4">
                                    <h1>
                                        <span className="wrapper slide">
                                            {words.map((word) => (
                                                <span key={word.id} className="flex items-center md:gap-3 gap-1 pb-2">
                                                    <span className={`text-white-50` + (word.id === 1 || word.id === 7 || word.id === 11) ? `font-ii` : `font-i`}>
                                                        {word.text}
                                                    </span>
                                                </span>
                                            ))}
                                        </span>
                                    </h1>
                                    <h1>
                                        Tasks
                                    </h1>
                                </div>
                            </div>
                            <div id="advert" className="mt-10 text-3xl lg:text-4xl">
                                <h1>
                                    A Task Manager (Todo App)
                                </h1>
                            </div>
                            <div className="flex flex-col gap-3 md:gap-5 mt-5 md:flex-row w-fit">
                                <button className="flex gap-2 justify-around px-3 py-2" onClick={handleGoogleSignIn}>
                                    <span className="text-[#2a2727]">
                                        Sign in with Google
                                    </span>
                                    <img src="login.svg" alt="" />
                                </button>
                            </div>
                        </header>
                    </div>
                </section>
                </div>
                <Footer />
            </div>
        </PageTransition>
    );
}

export default Home;