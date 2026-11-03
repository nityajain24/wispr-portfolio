import type { VoiceLogEntry } from './types';

// Real prompts from the build, verbatim. Append as the build goes; never write one after the fact.
export const voiceLog: VoiceLogEntry[] = [
  {
    date: '1 November 2026',
    prompt:
      'Also, the loading page should be something like "Let\'s go," and you click on the function button. Unlike how Wispr Flow operates, you say "Let\'s go." When the website detects that you have said "Let\'s go," it fills up the page, and you open up the portfolio website.',
    change:
      'Added the entry screen: hold the on-screen fn key, say “Let’s go”, and ink fills the page before the portfolio opens. You can also type it, or skip it.',
    limitation:
      'Browsers can’t see the real fn key on a Mac, and Flow already uses it, so the key on screen stands in for it.',
  },
  {
    date: '2 November 2026',
    prompt:
      'This is a one-pager. We need a multi-pager portfolio website where sections are properly divided. There are specific pages to read about each story. You can also use the photos that I have added to my portfolio website from nityaj.in.dev to make it more visually appealing.\n\nThe entry section is good, but what I am not liking right now is that there is a lot of text. Regarding that, let\'s make it crisper. Let\'s just keep the "Let\'s Go" button. With the function button, display the icon that we have displayed. At the bottom, very sleekly, you can have a skip button or something, but I want all of the people to experience it. That is it.',
    change:
      'Split the site into pages: a short home, one page per story, Growth, this log, About and Sources. Cut the entry screen down to the key, one line, and a quiet skip.',
    limitation:
      'Most images on my old site load in the browser rather than in the page source, so only the karting photo came across. Story pages got drawn covers instead.',
  },
];
