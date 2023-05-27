import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import "./globals.css";
import { Montserrat, Poppins } from "next/font/google";

// const poppins = Poppins({ subsets: ["latin"], weight: ['300', '700'] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Net Code",
  description:
    "Platform to keep all your notes on codes and make references to them",
  keywords: "code keep, code note",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>
          {/* {showHeader && <Navbar />} */}

          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
