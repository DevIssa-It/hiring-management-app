import React from "react";
import { getActiveJobs, getApplicationsByApplicant } from "@/data/dummyData";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/shared/Badge";
import { JobCard } from "@/components/applicant/JobCard";
import { Navbar } from '@/components/shared/Navbar';
import EmptyState from '@/assets/EmptyState.svg';

export const ApplicantDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-neutral-20 font-sans">
            <div className="px-6 pt-4">
                <Navbar title={undefined} showAvatar={true} avatarText={user?.email?.[0]?.toUpperCase() || 'A'} />
            </div>
            <div className="flex flex-col items-center justify-center py-24">
                <img src={EmptyState} alt="No job openings" className="w-56 mb-6" />
                <div className="font-semibold text-neutral-100 text-xl mb-2">No job openings available</div>
                <div className="text-neutral-60 text-base">Please wait for the next batch of openings.</div>
            </div>
        </div>
    );
};