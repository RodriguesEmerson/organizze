
import localFont from "next/font/local";
import 'material-icons/iconfont/material-icons.css';
import "./globals.css";
import Header from "./UI/Header/Header";
import SideBar from "./UI/SideBar/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Organizze",
  description: "Gerenciador de finanças pessoais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header />
      <SideBar />
        {children}
      </body>
    </html>
  );
}
