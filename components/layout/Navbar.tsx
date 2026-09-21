import React from 'react';
import { getSiteConfig } from '../../lib/content';
import NavbarClient from './NavbarClient';

export default function Navbar() {
  const config = getSiteConfig();
  return <NavbarClient navItems={config.nav} socialLinks={config.socialLinks} />;
}
