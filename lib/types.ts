export type Tutor = {
  id: string;
  name: string;
  email: string;
  role: "Lead Tutor" | "Tutor" | "Instructional Coach";
  avatar?: string;
};

export type ClassGroup = {
  id: string;
  name: string;
  subject: string;
  level: string;
  schedule: string;
  tutorId: string;
  studentCount: number;
  riskLevel?: "low" | "medium" | "high";
};

export type Session = {
  id: string;
  time: string;
  classId: string;
  focus: string;
  status: "upcoming" | "live" | "completed";
  joinUrl: string;
};

export type Student = {
  id: string;
  name: string;
  cohortId: string;
  mastery: number;
  flagged?: boolean;
  recentErrors: string[];
  notes: string;
  growth: string;
};

export type HomeworkItem = {
  id: string;
  title: string;
  classId: string;
  dueDate: string;
  status: "pending" | "scheduled" | "completed";
  submissions: number;
};

export type EvaluationItem = {
  id: string;
  studentId: string;
  evaluator: string;
  submittedAt: string;
  status: "pending" | "in_review" | "completed";
  focus: string;
};

export type QuestionItem = {
  id: string;
  type: "MCQ" | "Case Study" | "Short Answer";
  prompt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  updatedAt: string;
};

export type RevisionPlan = {
  id: string;
  title: string;
  studentId?: string;
  classId: string;
  focusAreas: string[];
  cadence: string;
  owner: string;
  status: "draft" | "active" | "completed";
};

export type Project = {
  id: string;
  title: string;
  classId: string;
  dueDate: string;
  milestones: { label: string; date: string; status: "not_started" | "in_progress" | "done" }[];
  rubric: { criterion: string; weight: number; met: boolean }[];
};

export type Report = {
  id: string;
  audience: "Parent" | "Admin" | "Tutor";
  studentId?: string;
  classId?: string;
  period: string;
  status: "draft" | "ready" | "sent";
  generatedAt: string;
};

export type AutomationRule = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  channel: "Email" | "SMS" | "In-app";
  status: "active" | "paused";
  owner: string;
};
