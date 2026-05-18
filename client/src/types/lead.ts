export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";

export type LeadSource = "Website" | "Instagram" | "Referral";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}