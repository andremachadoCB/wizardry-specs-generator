import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-crowdbotics-button text-crowdbotics-text p-4 mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="https://crowdbotics.com/" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://dk381fmjr1u8j.cloudfront.net/5b938dccd8a660445295553bd59bdd67a4706885/img/cb-logo-new-black.svg" 
              alt="Crowdbotics Logo" 
              className="h-8 mr-4"
            />
          </a>
          <h1 className="text-2xl font-bold">Mainframe Modernization Wizard</h1>
        </div>
        <div>
          <a href="https://crowdbotics.com/about/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="mr-2">About</Button>
          </a>
          <a href="https://crowdbotics.com/schedule-a-demo/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Contact</Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
