import { readFileSync } from 'node:fs';

// Content gate: assert required strings are present in the built HTML.
// This list grows as sections land. Strings are verbatim from the built site.
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

const REQUIRED = [
  'Sami Masmoudi',
  'Download CV',
  'og:title',
  'application/ld+json',
  'Software Engineer · AI · Data Systems',
  'View work',
  'About',
  'Stackdrop',
  'Concordia',
  'Dynatrace',
  'Real-Time Analytics',
  'Facial Recognition',
  'Kafka',
  'TensorFlow',
];

const missing = REQUIRED.filter((s) => !html.includes(s));
if (missing.length) {
  console.error('check-build FAIL — missing:', missing);
  process.exit(1);
}
console.log(`check-build OK — ${REQUIRED.length} assertions passed`);
