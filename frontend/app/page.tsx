
import SyndLoadingScreen from "./components/loading";
import LandingPage from "./landing-page/page";

export default function App() {
    return (
        <main className="w-full min-h-screen overflow-x-hidden text-white">
            <SyndLoadingScreen />

            <LandingPage />
        </main>

    )
}