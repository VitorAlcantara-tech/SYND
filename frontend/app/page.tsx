
import SyndLoadingScreen from "./components/loading";
import LandingPage from "./landing-page/page";

export default function App() {
    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white" style={{
                background: "linear-gradient(139deg, #002740 0%, #06486C 53%, #06486C 98%)"
            }}>
            <SyndLoadingScreen />

            <LandingPage />
        </main>

    )
}