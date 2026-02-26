'use client';

import { Candidate } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ViewModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export default function ViewModal({ candidate, onClose }: ViewModalProps) {

  // ✅ Safe Date Formatter
  const formatDate = (date: any) => {
    if (!date) return '-';

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // ✅ Safe Currency Formatter
  const formatCurrency = (value: any) => {
    if (value === undefined || value === null || value === '') return '-';

    const numberValue = Number(value);
    if (isNaN(numberValue)) return value;

    return `₹ ${numberValue.toLocaleString('en-IN')}`;
  };

  const displayFields = [
    { label: 'Full Name', value: candidate.fullName },
    { label: 'Date of Birth', value: formatDate(candidate.dateOfBirth) },
    { label: 'Gender', value: candidate.gender },

    { label: 'Contact Number', value: candidate.contactNumber },
    { label: 'Alternate Contact Number', value: candidate.alternateContactNumber },
    { label: 'Email', value: candidate.emailId },

    { label: 'Current City', value: candidate.currentAddressCity },
    { label: 'Current PIN', value: candidate.currentAddressPin },
    { label: 'Current Country', value: candidate.currentAddressCountry },

    { label: 'Permanent City', value: candidate.permanentAddressCity },
    { label: 'Permanent PIN', value: candidate.permanentAddressPin },
    { label: 'Permanent Country', value: candidate.permanentAddressCountry },

    { label: 'Position Applied For', value: candidate.positionAppliedFor },
    { label: 'Department', value: candidate.department },
    { label: 'Preferred Location', value: candidate.preferredLocation },
    { label: 'Night Shifts', value: candidate.nightShifts },

    { label: 'Highest Qualification', value: candidate.highestQualification },
    { label: 'Institution Name', value: candidate.nameOfInstitution },
    { label: 'Year Of Passing', value: candidate.yearOfPassing },

    { label: 'Total Experience (Years)', value: candidate.totalYearsExperience },
    { label: 'Last Company', value: candidate.lastCompanyWorkedWith },
    { label: 'Last Designation', value: candidate.lastDesignation },
    { label: 'Reason For Leaving', value: candidate.reasonForLeaving },

    { label: 'Current CTC', value: formatCurrency(candidate.currentCTC) },
    { label: 'Expected CTC', value: formatCurrency(candidate.expectedCTC) },
    { label: 'Notice Period', value: candidate.noticePeriod },
    { label: 'Tentative Joining Date', value: formatDate(candidate.tentativeJoiningDate) },

    { label: 'Created At', value: formatDate(candidate.createdAt) },
    { label: 'Updated At', value: formatDate(candidate.updatedAt) },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <h2 className="text-2xl font-bold text-slate-900">
            Candidate Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayFields.map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {field.label}
                </label>
                <div className="p-3 bg-slate-50 rounded-lg text-slate-900 break-words text-sm">
                  {field.value ?? '-'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 flex justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-slate-300"
          >
            Close
          </Button>
        </div>

      </div>
    </div>
  );
}