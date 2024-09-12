import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-crowdbotics-button text-crowdbotics-text p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://dk381fmjr1u8j.cloudfront.net/5b938dccd8a660445295553bd59bdd67a4706885/img/cb-logo-new-black.svg" 
            alt="Crowdbotics Logo" 
            className="h-8 mr-4"
          />
          <h1 className="text-2xl font-bold">Mainframe Modernization Wizard</h1>
        </div>
        <div>
          <Button variant="outline" className="mr-2">About</Button>
          <Button variant="outline">Contact</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;