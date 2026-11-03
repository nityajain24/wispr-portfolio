export type EvidenceState = 'public-record' | 'self-reported' | 'corroborated' | 'hold';

export type Source = {
  id: string;
  label: string;
  url: string;
  kind: 'primary' | 'self' | 'archive' | 'mirror' | 'press';
  note?: string;
};

export type Claim = {
  id: string;
  text: string;
  state: EvidenceState;
  sourceIds: string[];
  publicReady: boolean;
  metric?: { value: string; unit: string; period: string; scope: string };
  caveat?: string;
};

export type Story = {
  id: 'ghy' | 'mystic' | 'alfred';
  chapter: string;
  title: string;
  when: string;
  tension: string;
  summary: string;
  problem: string;
  image?: { src: string; alt: string; caption: string };
  myPart: Claim[];
  teamCredit?: string;
  decisions: Claim[];
  outcomes: Claim[];
  stillHard: string;
};

export type VoiceLogEntry = {
  date: string;
  prompt: string;
  change: string;
  limitation?: string;
};
