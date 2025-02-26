"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CardTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-6">
      <Card className="w-full max-w-[400px] min-w-0 shrink-0 border border-gray-300 p-4">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">

                    <Label htmlFor="name">Project Name</Label>
                    <Input id="name" placeholder="Name of your project" />

                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a framework" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={ () => alert("Cancel creating a new project.")}>Cancel</Button>
            <Button variant="secondary" onClick={() => alert("Create a new project.")}>Create project</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
