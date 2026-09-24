export interface Project {
  name: string;
  period: string;
  summary: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: 'Two-Way HR Time-Off Sync',
    period: '2026',
    summary:
      'A webhook-driven, event-sourced integration that keeps two HR SaaS platforms in lockstep — automating create, edit, and cancel of employee leave. Built around an idempotent, unit-tested date-range reconciliation engine with policy mapping and a full event-audit trail, replacing manual dual data-entry for the People team.',
    tech: ['Retool Workflows', 'Webhooks', 'JavaScript', 'PostgreSQL', 'REST APIs', 'Event Sourcing'],
  },
  {
    name: 'Job-Cache — Job Search & Assisted Apply',
    period: '2026 — Present',
    summary:
      'A local, fully free tool that aggregates live job postings from public ATS APIs (Greenhouse, Lever, Ashby, SmartRecruiters), ranks them against your CV, and drafts tailored cover letters and CV bullets — using Claude Code in the terminal as the AI engine, with no API keys or paid services. Assisted-apply, not auto-apply.',
    tech: ['Python', 'SQLite', 'Claude Code', 'JavaScript'],
    link: 'https://github.com/Samiimasmoudii/job-cache',
  },
  {
    name: 'EdTech Fraud Risk-Scoring System',
    period: '2026',
    summary:
      'A daily risk-scoring engine that replaced manual, disconnected fraud review for an edtech platform — correlating signals from billing, payments, fraud-detection, and ticketing systems across ~10,000 accounts into a ranked, explainable risk list, with admin-tunable weighting and a simulation mode, on an ETL pipeline feeding analyst and admin dashboards. (Engineering write-up.)',
    tech: ['Retool', 'ETL', 'Amazon Redshift', 'Stripe', 'Chargebee', 'SIFT'],
    link: 'https://stackdrop.co/engineeringnotes/edtech-platform-fraud-risk-scoring-system',
  },
    {
    name: 'Flaky-Test Auto-Repair (Research)',
    period: 'Mar 2025 — Jul 2025',
    summary:
      "LLM-based classification and automated repair of flaky tests, benchmarked across 400 Maven projects at Concordia's DAS Lab. Graded Excellent as an end-of-studies project.",
    tech: ['Python', 'Docker', 'Maven', 'LLM APIs'],
  },
  {
    name: 'Big-Data Real-Time Analytics Pipeline',
    period: 'Feb 2025 — Apr 2025',
    summary:
      'Designed a Lambda architecture unifying real-time and batch processing for cryptocurrency analytics, with a Kafka + Spark Structured Streaming layer and low-latency reads via Cassandra.',
    tech: ['Java', 'Spark', 'Kafka', 'Cassandra'],
  },
  {
    name: 'Secure Cloud Storage with Facial Recognition',
    period: 'Dec 2023 — Apr 2024',
    summary:
      'Built an encrypted cloud file-storage platform with AES per-file encryption and a facial-recognition access layer achieving >95% accuracy on 5,000 images.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
  },

];
