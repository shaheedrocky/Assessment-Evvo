import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}:LayoutProps) => {
  return <SafeAreaView className="flex-1 bg-white p-4">{children}</SafeAreaView>;
};

export default Layout;
