import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CreatorInfo() {
  return (
    <div className="px-4 py-3 text-xs  border-sidebar-border">
      <div className="flex flex-col space-y-2">
        <div>
          <h4 className="font-medium">Made by Abigail Briones </h4>
          <p className="text-muted-foreground"></p>
        </div>
        <Separator className="my-1" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a
              href="https://github.com/abigailbrionesa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a
              href="https://www.linkedin.com/in/abigailbrionesaranda/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href="mailto:abigailbrionesaranda@gmail.com">
              <MailIcon className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
