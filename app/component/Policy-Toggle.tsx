"use client";
import { useState } from "react";
import PolicyCard from "./Policy-Card";
import PolicyViolationCard from "./PolicyViolation-Card";
import ComplianceProgress from "./Compliance-Progress";
import { Switch } from "@/components/ui/switch";
import { FileText } from "lucide-react";

export default function PolicyTabSwitcher() {
  const [activeTab, setActiveTab] = useState("policies");

  return (
    <div className="w-full p-4">
      <div className="w-72 lg:w-96 flex  rounded-lg overflow-hidden">
        <button
          className={`w-24 flex-1  p-2 text-sm font-medium transition-all ${
            activeTab === "policies"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("policies")}
        >
          Policies
        </button>
        <button
          className={`w-24 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "violations"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("violations")}
        >
          Violations
        </button>

        <button
          className={`w-24 flex-1 p-2 text-sm font-medium transition-all ${
            activeTab === "compliance"
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("compliance")}
        >
          Compliance
        </button>
      </div>

      <div className="mt-4 p-4 border border-gray-300 rounded-lg">
        {activeTab === "policies" && (
          <div className="w-full px-2  border border-gray-300 rounded-lg">
            <div className="mb-2.5 font-medium">
              <span className="font-semibold text-lg">
                Expense Policies <br />
              </span>
              <span className="text-gray-600">
                Manage and configure your organization's expense policies
              </span>
            </div>
            <div className="flex flex-col gap-y-4">
              <PolicyCard
                title={"Travel Expenses"}
                detail={
                  "Policies for business travel including flights, hotels, and transportation"
                }
                limit={[
                  "Maximum hotel rate: $200/night",
                  "Maximum hotel rate: $200/night",
                ]}
                requirement={[
                  "Flight bookings require manager approval for amounts over $500",
                ]}
                numberOfViolations={"2"}
                numberOfCompliance={"94%"}
                createdAt={"2025-01-01"}
              />
            </div>
          </div>
        )}
        {activeTab === "violations" && (
          <div className="w-full">
            <div className="mb-2.5 font-medium">
              <span className="font-semibold text-lg">
                Policy Violations
                <br />
              </span>
              <span className="text-gray-600">
                Track and manage expense policy violations
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <PolicyViolationCard
                title={"Business Lunch - Client Meeting"}
                employeeName={"John doe"}
                policyName={"Meal & Entertainment"}
                date={"2025-01-07"}
                amount={85}
                limit={200}
                status={"Pending"}
                priority={"Low"}
                violationReason={"Missing manager approval"}
              />
              <PolicyViolationCard
                title={"Business Lunch - Client Meeting"}
                employeeName={"John doe"}
                policyName={"Meal & Entertainment"}
                date={"2025-01-07"}
                amount={85}
                limit={200}
                status={"Resolved"}
                priority={"Low"}
                violationReason={"Missing manager approval"}
              />
            </div>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="w-full">
            <div className="w-full ">
              <div className="mb-2.5 font-medium">
                <span className="font-semibold text-lg">
                  Compliance Dashboard
                  <br />
                </span>
                <span className="text-gray-600">
                  Monitor policy compliance across your organization
                </span>
              </div>
              <ComplianceProgress
                attribute={"Travel"}
                stats={"Improving"}
                numberOfViolation={2}
                percent={96}
              />
              <ComplianceProgress
                attribute={"Travel"}
                stats={"Improving"}
                numberOfViolation={2}
                percent={96}
              />
              <ComplianceProgress
                attribute={"Travel"}
                stats={"Improving"}
                numberOfViolation={2}
                percent={96}
              />
            </div>
            <div className="mt-10 w-full flex flex-col lg:flex-row gap-x-4 gap-y-2.5 ">
              <div className="w-full lg:w-[48%] flex flex-col gap-y-2.5 border border-gray-300 rounded-md p-3">
                <h1 className="mb-1.5 text-md font-semibold">
                  Policy Enforcement
                </h1>
                <div className="flex justify-between">
                  <div className="text-sm md:text-md">
                    Automatic policy checks
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-between">
                  <div className="text-sm md:text-md">
                    Real-time violation alerts
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-between">
                  <div className="text-sm md:text-md">Email notifications</div>
                  <Switch />
                </div>
                <div className="flex justify-between">
                  <div className="text-sm md:text-md">
                    Require approval for violations
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="w-full lg:w-[48%] flex flex-col gap-y-2.5 border border-gray-300 rounded-md p-3">
                <h1 className="mb-1.5 text-md font-semibold">
                  Compliance Reports
                </h1>
                <div className="flex gap-x-2.5 p-2 items-center border border-gray-300 rounded-md">
                  <FileText size={16} />
                  <div className="text-sm md:text-md font-semibold">
                    Monthly Compliance Report
                  </div>
                </div>
                <div className="flex gap-x-2.5 p-2 items-center border border-gray-300 rounded-md">
                  <FileText size={16} />
                  <div className="text-sm md:text-md font-semibold">
                    Policy Violation Summary
                  </div>
                </div>
                <div className="flex gap-x-2.5 p-2 items-center border border-gray-300 rounded-md">
                  <FileText size={16} />
                  <div className="text-sm md:text-md font-semibold">
                    Department Compliance Analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
