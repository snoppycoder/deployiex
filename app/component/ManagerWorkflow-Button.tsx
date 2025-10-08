"use client";
import { Plus, Settings, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WorkflowsButton() {
  const workflows = [
    {
      title: "Standard Approval",
      status: "Active",
      description: "Single manager approval for expenses under $500",
      limit: "$500",
      steps: ["Manager Review", "Finance Approval"],
    },
    {
      title: "High Value Approval",
      status: "Active",
      description: "Multi-level approval for expenses over $500",
      limit: "$500",
      steps: ["Manager Review", "Department Head", "Finance Director"],
    },
    {
      title: "Travel Expense",
      status: "Active",
      description: "Specialized workflow for travel-related expenses",
      limit: "$1000",
      steps: ["Manager Review", "Travel Coordinator", "Finance Approval"],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-slot="button"
        className="inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md lg:text-sm font-medium transition-all disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-white hover:bg-white/90 h-8 lg:h-9 lg:px-4 px-2 py-2 text-xs text-black border border-gray-300"
      >
        <Settings size={16} /> Manage Workflows
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl h-[90vh] overflow-y-auto rounded-xl">
          <DialogHeader>
            <DialogTitle>Workflow Management</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Create and customize approval workflows for different expense
              types
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            {workflows.map((workflow, i) => (
              <Card key={i} className="border p-3">
                <CardContent className="p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {workflow.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-black text-white"
                      >
                        {workflow.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-300"
                      >
                        Disable
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Limit:</span> {workflow.limit}{" "}
                    • {workflow.steps.length} steps
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {workflow.steps.map((step, j) => (
                      <div key={j} className="flex items-center gap-1">
                        <span>{step}</span>
                        {j < workflow.steps.length - 1 && <span>→</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full mt-4">+ Create New Workflow</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
