import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import ToastifyNotifications from "./(components)/ToastifyNotifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TECH-HUNT",
  description: "TECH HUNT SALES FORM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        {children}
        </Provider>
        <ToastifyNotifications/>
      
        </body>
    </html>
  );
}
