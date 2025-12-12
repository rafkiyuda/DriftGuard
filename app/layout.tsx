import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "DriftGuard - Driver Safety Assistant",
    description: "AI-powered drowsiness detection and driver safety system.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased" suppressHydrationWarning>{children}</body>
        </html>
    );
}
