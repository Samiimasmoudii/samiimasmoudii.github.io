export interface Language {
  name: string;
  level: string;
}

export interface Site {
  name: string;
  title: string;
  tagline: string;
  location: string;
  bio: string[];
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
  languages: Language[];
}

export const site: Site = {
  name: 'Sami Masmoudi',
  title: 'Software Engineer · AI · Data Systems',
  tagline: 'I build data platforms and AI tooling — from the pipeline to the interface people actually use.',
  location: 'Tunisia · Remote',
  bio: [
    "I'm Sami — a software engineer from Tunisia who builds data platforms and AI tooling. Right now I'm at Stackdrop, working with Wayve on workforce and fleet systems and shipping data products for clients across the stack.",
    "My work spans production engineering and AI research: risk-analysis platforms on Redshift, RAG and MCP internal tools, and research into automated repair of flaky tests across 400 Maven projects at Concordia's DAS Lab. I care about systems that are rigorous and genuinely useful — schema design, pipelines, and the interface all in one head.",
    'I move fast, learn constantly, and like bridging the gap between hard technical problems and things people can actually use.',
  ],
  email: 'samiimasmoudii2@gmail.com',
  github: 'https://github.com/samiimasmoudii',
  linkedin: 'https://www.linkedin.com/in/sami-masmoudi12/',
  cvPath: '/Sami-Masmoudi-CV.pdf',
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'French', level: 'Fluent' },
    { name: 'Arabic', level: 'Native' },
    { name: 'German', level: 'Basic' },
  ],
};
