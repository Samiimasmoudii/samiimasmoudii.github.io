export interface ExperienceGroup {
  client: string;
  note?: string;
  bullets: string[];
}

export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  /** Flat bullets (used by most roles, and for cross-client work). */
  bullets?: string[];
  /** Client-grouped bullets, each under a small client label. */
  groups?: ExperienceGroup[];
  stack: string[];
}

export const experience: Role[] = [
  {
    company: 'Stackdrop',
    title: 'Software Engineer',
    period: 'Nov 2025 — Present',
    location: 'Athens, Greece (Remote)',
    groups: [
      {
        client: 'Wayve Technologies',
        note: 'Autonomous-vehicle company · UK',
        bullets: [
          "Sole engineer on the People team's HR & workforce-operations automation — the integrations and dashboards below removed ~95% of manual data entry and gave operations leadership live visibility into shift fulfillment.",
          'Designed and shipped two HR-platform integrations as event-sourced, idempotent Retool workflows: a two-way, webhook-driven time-off sync between Connecteam and HiBob (automated create/edit/cancel with a unit-tested date-range reconciliation engine, policy mapping, and a full event-audit trail), and a multi-region daily compliance-record sync with self-healing, exactly-once processing.',
          'Built a suite of full-stack React + TypeScript operations dashboards — a shift-fulfillment view (planned-vs-actual staffing from scheduling, attendance, and leave feeds), a fleet-utilization dashboard (automated idle-time detection, classification, and end-of-shift PDF/Slack reporting), and a control-room over the syncs (real-time health, audit browsing, one-click triage, and a comments/@-mention layer) — retiring manual spreadsheets and giving non-technical operators self-serve visibility and resolution.',
        ],
      },
      {
        client: 'Teachable, Inc.',
        note: 'EdTech platform · US',
        bullets: [
          'Built and shipped a daily fraud/risk-scoring platform — data ingestion, ETL pipelines, schema design, and analyst + admin UIs; unified billing, payment, and fraud-signal APIs into a Redshift-backed workflow that surfaces a ranked, explainable risk list across ~10,000 accounts for real-time and batch review.',
        ],
      },
      {
        client: 'Stackdrop',
        note: 'Internal tooling',
        bullets: [
          'Developed internal tools for meeting summarization and progress reporting using RAG and MCP, reducing time spent on progress monitoring across client projects.',
        ],
      },
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
