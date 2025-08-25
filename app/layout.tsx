
import type { Metadata } from "next";
import { Poppins  } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "@/context/UserRoleProvider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: "ManMeraMandir",
  description: "This app is created for temples to accept donations, abhishek and assests donations.",
  icons:{
    icon:"/om.png",
    apple:"/om.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased h-screen`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
