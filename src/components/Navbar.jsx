import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-crowdbotics-button text-crowdbotics-text p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mainframe Modernization Wizard</h1>
        <div>
          <Button variant="outline" className="mr-2">About</Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;