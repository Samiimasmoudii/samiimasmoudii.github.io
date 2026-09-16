export interface SkillGroup {
  group: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    group: 'Programming',
    items: ['JavaScript', 'React', 'Python', 'Java', 'PHP', 'SQL', 'Bash'],
  },
  {
    group: 'AI & Data',
    items: ['LLMs', 'Prompt Engineering', 'TensorFlow', 'Agentic Workflows', 'Spark', 'Kafka', 'Redshift', 'ETL Pipelines'],
  },
  {
    group: 'Infrastructure & Tools',
    items: ['Software Architecture', 'Retool', 'Docker', 'MCP Servers', 'Kubernetes', 'AWS', 'Git', 'Linux', 'Databricks'],
  },
];
