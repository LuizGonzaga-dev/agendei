import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import {Providers} from '../redux/Providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agenda",
  description: "Salve todos os seus compromissos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} container`}>
        
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
