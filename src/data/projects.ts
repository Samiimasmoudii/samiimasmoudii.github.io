export interface Project {
  name: string;
  period: string;
  summary: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
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
  {
    name: 'Flaky-Test Auto-Repair (Research)',
    period: 'Mar 2025 — Jul 2025',
    summary:
      "LLM-based classification and automated repair of flaky tests, benchmarked across 400 Maven projects at Concordia's DAS Lab. Graded Excellent as an end-of-studies project.",
    tech: ['Python', 'Docker', 'Maven', 'LLM APIs'],
  },
];
