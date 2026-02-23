import { Loader } from "@/components/customUi/loader";

export default function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center animate-in fade-in duration-500">
            <Loader text="Loading…" />
        </div>
    );
}