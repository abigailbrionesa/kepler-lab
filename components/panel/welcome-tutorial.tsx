"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/shadcn/dialog";

export function WelcomeTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to KeplerLab!",
      description: "This tutorial will guide you through the features of this interactive 3D solar system.",
    },
    {
      title: "Explore the Solar System",
      description: "You can pan, zoom, and rotate the camera to explore the solar system. Click and drag to pan, use the scroll wheel to zoom, and right-click and drag to rotate.",
    },
    {
      title: "Select a Planet",
      description: "Click on a planet to select it and see its information. You can also see its orbit and trajectory.",
    },
    {
      title: "Filter Asteroids",
      description: "Use the filters in the left panel to filter the asteroids by their properties. You can filter by semi-major axis, eccentricity, and more.",
    },
    {
      title: "Create Your Own Object",
      description: "Use the object creator in the left panel to create your own asteroid. You can set its orbital parameters and see its trajectory in real-time.",
    },
    {
      title: "Enjoy Exploring!",
      description: "You are now ready to explore the solar system. If you need a reminder of the controls, you can always click the 'Help' button in the top right.",
    },
  ];

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tutorialSteps[step].title}</DialogTitle>
          <DialogDescription>
            {tutorialSteps[step].description}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={nextStep}>
          {step === tutorialSteps.length - 1 ? "Finish" : "Next"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
