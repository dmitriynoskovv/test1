import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const wrapperSize = '3xl:max-w-[1300px] 2xl:max-w-[950px] lap:max-w-[700px]'

export default function RootLayout( { children }: Readonly<{ children: React.ReactNode }> ) {
  return (
    <html lang="en">
    <body className={ `${ geistSans.variable } ${ geistMono.variable } antialiased h-screen overflow-hidden flex flex-col items-center xs:px-4` }>
    <header className={`w-full flex px-10 py-4 rounded-b-2xl bg-bg-light ${wrapperSize}`}>
      <Image
        className=''
        src='/logo.svg'
        alt='logo'
        width={ 130 }
        height={ 54 }
        priority
      />
    </header>

    <div className='py-5 w-full grow flex justify-center overflow-hidden'>
      <div className={`w-full h-full  ${wrapperSize}`}>
        { children }
      </div>
    </div>

    </body>
    </html>
  );
}
