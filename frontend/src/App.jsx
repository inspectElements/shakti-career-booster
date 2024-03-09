import { Button } from "@material-tailwind/react";

function App() {
    return (
        <section className="landing-bg ">
            <button
                className="absolute top-[55%] left-[40%] middle none rounded-lg bg-[#1F243E] py-3 px-6 text-center align-middle font-sans text-[1.05rem] font-bold border-[#3A4065] text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
            >
                Unleash the magic of Sahayak AI
            </button>
        </section>
    );
}

export default App;