import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Open_Sans } from "next/font/google";
import Provider from "../components/Provider";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Promptify App",
  description: "Find the most popular prompts for AI use",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Provider>
          <Navbar></Navbar>
          {children}
        </Provider>
      </body>
    </html>
  );
}
