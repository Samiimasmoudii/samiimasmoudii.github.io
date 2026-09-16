export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    company: 'Stackdrop',
    title: 'Software Engineer',
    period: 'Nov 2025 — Present',
    location: 'Athens, Greece (Remote)',
    bullets: [
      "Sole engineer on Wayve's (UK-based autonomous-vehicle company) HR & workforce-operations automation — the integrations and dashboards below removed ~95% of the People team's manual data entry and gave operations leadership live visibility into shift fulfillment.",
      'Designed and shipped two HR-platform integrations as event-sourced, idempotent Retool workflows: a two-way, webhook-driven time-off sync between Connecteam and HiBob (automated create/edit/cancel with a unit-tested date-range reconciliation engine, policy mapping, and a full event-audit trail), and a multi-region daily compliance-record sync with self-healing, exactly-once processing.',
      'Built two full-stack React + TypeScript dashboards — a shift-fulfillment view reconciling scheduling, attendance, and leave into planned-vs-actual staffing KPIs (funnel, time-series, calendar), and an operations control-room over the syncs (real-time health, audit browsing, one-click triage, and a comments/@-mention layer) — retiring manual spreadsheets and letting non-technical operators self-serve.',
      'Built and shipped a risk-analysis platform for US-based e-learning clients — data ingestion, ETL pipelines, schema design, and UI; unified multiple third-party risk-assessment APIs into a Redshift-backed analytics workflow for real-time and batch reporting.',
      'Developed internal tools for meeting summarization and progress reporting using RAG and MCP, reducing time spent on progress monitoring across client projects.',
    ],
    stack: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Retool', 'PostgreSQL', 'Databricks', 'Amazon Redshift', 'REST APIs', 'Webhooks', 'MCP', 'RAG', 'System Design', 'ETL'],
  },
  {
    company: 'Concordia University — DAS Lab',
    title: 'AI Research Intern',
    period: 'Mar 2025 — Jul 2025',
    location: 'Montreal, Canada',
    bullets: [
      'Researched automated repair of flaky tests across 400 Maven projects (end-of-studies project, graded Excellent).',
      'Built evaluation pipelines to benchmark LLM performance on code inspection and flaky-test classification tasks.',
    ],
    stack: ['Python', 'Docker', 'Maven', 'LLM APIs', 'Software Testing'],
  },
  {
    company: 'Dynatrace',
    title: 'Software Engineering Intern',
    period: 'Jul 2024 — Aug 2024',
    location: 'Vienna, Austria',
    bullets: [
      "Built a capacity-planning application for managing team vacation and shift scheduling, deployed internally at one of Europe's leading observability platforms.",
      'Integrated the Dynatrace API to surface live performance metrics inside a React dashboard.',
    ],
    stack: ['React', 'JavaScript', 'Dynatrace API'],
  },
  {
    company: 'Target Energy Solutions',
    title: 'Software Engineering Intern',
    period: 'Jul 2023 — Aug 2023',
    location: 'Tunis, Tunisia',
    bullets: [
      'Built an NLP database-query tool using transformer-based LLMs, reducing ad-hoc data-retrieval time for non-technical staff.',
      'Researched LLMs, transformers, image generation, and object detection with TensorFlow and Keras.',
    ],
    stack: ['Python', 'TensorFlow', 'SQL', 'LLM APIs'],
  },
];
