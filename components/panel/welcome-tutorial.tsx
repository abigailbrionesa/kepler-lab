"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/shadcn/dialog";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

export function WelcomeTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    { title: "Welcome to KeplerLab", description: "Interactive 3D solar system — explore planets and orbits." },
    { title: "Camera Controls", description: "Drag to pan, scroll to zoom, right-drag to rotate." },
    { title: "Select a Planet", description: "Click a planet to view details and its orbit." },
    { title: "Filter Asteroids", description: "Use filters to narrow asteroids by orbital properties." },
    { title: "Create Objects", description: "Add custom asteroids and preview their trajectories." },
    { title: "Need Help?", description: "Open the Help menu anytime for controls and tips." },
  ];

  const nextStep = () => {
    if (step < tutorialSteps.length - 1) setStep((s) => s + 1);
    else setIsOpen(false);
  };

  const prevStep = () => setStep((s) => Math.max(0, s - 1));
  const skip = () => setIsOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextStep();
    else if (e.key === "ArrowLeft") prevStep();
    else if (e.key === "Escape") skip();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">{tutorialSteps[step].title}</DialogTitle>

      <DialogContent
        onKeyDown={handleKeyDown}
        className="max-w-md rounded-2xl shadow-xl bg-background"
        aria-labelledby="welcome-tutorial-title"
        aria-describedby="welcome-tutorial-desc"
        role="dialog"
      >
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{step + 1}/{tutorialSteps.length}</span>
          <div className="w-full ml-4 mr-6 h-1 rounded overflow-hidden">
            <div
              className="h-1 bg-accent rounded"
              style={{ width: `${((step + 1) / tutorialSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle id="welcome-tutorial-title" className="text-lg font-semibold">
            {tutorialSteps[step].title}
          </DialogTitle>

          <DialogDescription id="welcome-tutorial-desc" className="text-sm text-muted-foreground">
            {tutorialSteps[step].description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-between items-center">
          <p onClick={skip} className="hover:cursor-pointer text-muted-foreground text-sm underline">
            Skip
          </p>

          <div className="flex gap-2">
            <Button variant="outline" onClick={prevStep} disabled={step === 0} className="flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <Button onClick={nextStep} className="flex items-center gap-1">
              {step === tutorialSteps.length - 1 ? "Finish" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
