import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center pt-10">
            <Navbar />
            {children}
            <ToastContainer theme="dark" />
        </section>
    );
}
