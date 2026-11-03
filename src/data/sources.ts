import type { Source } from './types';

// Public sources only. Private résumés and correspondence never go here.
export const sources: Source[] = [
  { id: 'S11', label: 'Nitya Jain on LinkedIn', url: 'https://www.linkedin.com/in/nitya-jain-993243243/', kind: 'self' },
  { id: 'S14', label: 'Bloc alpha launch post, LinkedIn, 29 Jul 2023', url: 'https://www.linkedin.com/posts/nitya-jain-993243243_big-news-as-these-final-weeks-of-summer-activity-7091017178493190144-oVS9', kind: 'self' },
  { id: 'S15', label: '@nityajain__ on X', url: 'https://x.com/nityajain__', kind: 'self' },
  { id: 'S17', label: 'Alfred dinner post (public mirror of X)', url: 'https://twstalker.com/nityajain__/status/2107470175109054519', kind: 'mirror', note: 'Third-party mirror; the X timeline is login-gated.' },
  { id: 'S18', label: 'Alfred grocery follow-up (public mirror of X)', url: 'https://twstalker.com/nityajain__/status/2107470179123019776', kind: 'mirror', note: 'Third-party mirror; the X timeline is login-gated.' },
  { id: 'S19', label: 'nityajain24 on GitHub', url: 'https://github.com/nityajain24', kind: 'self' },
  { id: 'S20', label: 'Ghy Fights Covid case study, nityajain.dev', url: 'https://www.nityajain.dev/work/ghy-fights-covid', kind: 'self' },
  { id: 'S21', label: 'Northeast Now launch coverage, 8 May 2021', url: 'https://nenow.in/north-east-news/assam/assam-website-launched-to-help-covid-patients-in-guwahati.html', kind: 'press' },
  { id: 'S22', label: 'Makerpad retrospective (Wayback Machine, captured 25 May 2022)', url: 'https://web.archive.org/web/20220525100854id_/https://www.makerpad.co/posts/how-a-student-built-a-covid-19-resource-aggregator-app', kind: 'archive', note: 'The original URL now redirects; this is the archived copy.' },
  { id: 'S24', label: '@nitya_jain on Product Hunt', url: 'https://www.producthunt.com/@nitya_jain', kind: 'primary' },
  { id: 'S26', label: 'ChaturGPT launch, Product Hunt', url: 'https://www.producthunt.com/products/chaturgpt-chatgpt-for-your-pdfs?launch=chaturgpt-chatgpt-for-your-pdfs', kind: 'primary' },
  { id: 'S27', label: 'ChaturGPT makers, Product Hunt', url: 'https://www.producthunt.com/products/chaturgpt-chatgpt-for-your-pdfs/makers', kind: 'primary' },
  { id: 'S28', label: 'Bloc launch, Product Hunt', url: 'https://www.producthunt.com/products/bloc-make-your-own-ai-chatbot', kind: 'primary' },
  { id: 'S29', label: 'ChaturGPT case study, nityajain.dev', url: 'https://www.nityajain.dev/work/chaturgpt', kind: 'self' },
  { id: 'S30', label: 'AskBloc case study, nityajain.dev', url: 'https://www.nityajain.dev/work/askbloc-ai', kind: 'self' },
  { id: 'S31', label: "Teammate's Product Hunt update, LinkedIn, Aug 2023", url: 'https://www.linkedin.com/posts/rachitabh_exciting-update-our-product-hunt-journey-activity-7100433825079439360-AyvB', kind: 'primary' },
  { id: 'S33', label: 'HyperVerge ONE case study, nityajain.dev', url: 'https://www.nityajain.dev/work/hyperverge-one', kind: 'self' },
];
