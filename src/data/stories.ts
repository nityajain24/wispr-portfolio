import type { Story } from './types';

// Draft copy from the brief, pending Nitya's review. Only publicReady claims live here;
// anything unresolved goes to drafts/holds.md, which is never published.
export const stories: Story[] = [
  {
    id: 'ghy',
    chapter: 'Chapter 1 · Organise a community',
    title: 'Ghy Fights Covid',
    when: 'Guwahati, April to September 2021',
    summary: 'A volunteer-run resource directory for Guwahati during the second wave.',
    tension: 'The hard part wasn’t the app. It was keeping the information useful as the situation changed.',
    problem:
      'During the second wave, information about beds, oxygen and doctors in Guwahati was scattered across posts, forwards and phone calls.',
    myPart: [
      { id: 'ghy-glide', text: 'Learned Glide at a workshop and built a resource directory for Guwahati.', state: 'self-reported', sourceIds: ['S22', 'S20'], publicReady: true },
      { id: 'ghy-recruit', text: 'Asked for help on Twitter. Within a week, a remote volunteer team was working.', state: 'self-reported', sourceIds: ['S22'], publicReady: true },
    ],
    teamCredit: 'Built and run by a volunteer team. The launch coverage credits the group, and so do I.',
    decisions: [
      { id: 'ghy-split', text: 'Split the work into verification, finding needs, logistics, app updates and awareness content, with a Discord channel for each function.', state: 'self-reported', sourceIds: ['S22'], publicReady: true },
      { id: 'ghy-verify', text: 'Checked leads by hand before listing them, instead of publishing everything that came in.', state: 'self-reported', sourceIds: ['S20'], publicReady: true },
    ],
    outcomes: [
      { id: 'ghy-launch', text: 'Launched publicly in May 2021 with resource listings, doctor contacts and an “Ask for Help” request flow, supported by volunteers around the clock.', state: 'corroborated', sourceIds: ['S21', 'S22'], publicReady: true },
      { id: 'ghy-end', text: 'Wound down as the emergency eased. The goal was to work ourselves out of a job.', state: 'self-reported', sourceIds: ['S22'], publicReady: true },
    ],
    stillHard: 'Freshness. Leads went stale quickly, and the directory was only as good as its last check.',
  },
  {
    id: 'mystic',
    chapter: 'Chapter 2 · Launch an AI product',
    title: 'Mystic Labs: ChaturGPT, then Bloc',
    when: 'Founding team, Head of Product, December 2022 to January 2024',
    summary: 'Two AI products, two Product Hunt launches, and the gap between trying and paying.',
    tension: 'Getting people to try something is not the same as getting them to pay for it.',
    problem:
      'A small team trying to turn early AI capability into products people would use, and eventually pay for.',
    myPart: [
      { id: 'mys-role', text: 'Founding team member and Head of Product at Mystic Labs.', state: 'self-reported', sourceIds: ['S11'], publicReady: true },
      { id: 'mys-maker', text: 'Listed as a maker on both Product Hunt launches, and answered users in the launch threads.', state: 'public-record', sourceIds: ['S27', 'S28', 'S24'], publicReady: true },
    ],
    teamCredit: 'Both products were team work. Scope below is the team’s, not mine alone.',
    decisions: [
      { id: 'mys-sprint', text: 'Shipped ChaturGPT, chat with your PDFs, in a one-month sprint: questions over documents, UX, API integration, pricing and positioning, then Product Hunt distribution.', state: 'self-reported', sourceIds: ['S29'], publicReady: true },
      { id: 'mys-bloc', text: 'Moved on to Bloc, a tool for building your own AI chatbot, focused on positioning, onboarding and integrations for businesses.', state: 'self-reported', sourceIds: ['S30', 'S14'], publicReady: true },
    ],
    outcomes: [
      { id: 'mys-ph-chatur', text: 'ChaturGPT reached #12 of the day on Product Hunt.', state: 'public-record', sourceIds: ['S26'], publicReady: true },
      { id: 'mys-ph-bloc', text: 'Bloc reached #5 of the day on Product Hunt.', state: 'corroborated', sourceIds: ['S28', 'S31'], publicReady: true },
      { id: 'mys-pilots', text: 'Worked on early B2B pilots with Bloc.', state: 'self-reported', sourceIds: ['S30'], publicReady: true },
    ],
    stillHard: 'A launch day rank is attention, not a channel. Turning trials into paying users was the harder problem.',
  },
  {
    id: 'alfred',
    chapter: 'Chapter 3 · Fit voice into a habit',
    title: 'Alfred',
    when: 'Side project, 2026',
    summary: 'A WhatsApp assistant that turns my English dinner reply into a Hindi voice note for our cook.',
    tension: 'I built it around a conversation we already had, instead of asking everyone to learn another app.',
    problem:
      'Every evening, dinner gets decided and passed on to our cook in the household WhatsApp group, in Hindi.',
    myPart: [
      { id: 'alf-built', text: 'Built Alfred myself as a personal WhatsApp assistant.', state: 'self-reported', sourceIds: ['S17'], publicReady: true },
    ],
    decisions: [
      { id: 'alf-surface', text: 'Put it inside the WhatsApp group the household already used, rather than a new app.', state: 'self-reported', sourceIds: ['S17'], publicReady: true },
      { id: 'alf-voice', text: 'Made the output a voice note, because that is how the message was already being sent.', state: 'self-reported', sourceIds: ['S17'], publicReady: true },
    ],
    outcomes: [
      { id: 'alf-dinner', text: 'Asks what I want for dinner, suggests options from my preferences, and sends my reply to the cook as a voice note.', state: 'self-reported', sourceIds: ['S17'], publicReady: true },
      { id: 'alf-grocery', text: 'When an ingredient is missing, it continues to an Instamart order through Swiggy’s MCP.', state: 'self-reported', sourceIds: ['S18'], publicReady: true },
    ],
    stillHard: 'It works for one household. I haven’t shown it works for anyone else, and I’m not claiming it does.',
  },
];
