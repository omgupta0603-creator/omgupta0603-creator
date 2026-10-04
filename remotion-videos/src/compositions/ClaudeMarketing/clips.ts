import React from "react";
import { ContentProvider, type Lang } from "./content";
import { Agenda, Hook, Sting } from "./clips/Intro";
import { ProblemContext, ProblemFiles, ProblemGeneric } from "./clips/Problems";
import { makeUseCase, ProTip, Strengths } from "./clips/UseCases";
import {
  CommentCta,
  DraftDecision,
  EndScreen,
  Limitations,
  Rctf,
  Recap,
  VagueVsRctf,
} from "./clips/Wrap";

export type Clip = {
  /** Composition id and output file name. */
  id: string;
  /** Where it goes in the script. */
  cue: string;
  seconds: number;
  component: React.FC;
};

/**
 * Every clip of the graphics pack, in script order. Each is its own
 * composition (rendered to its own MP4) and the reel plays them back to back.
 * Change `seconds` to fit your edit; content exits in the last 14 frames.
 */
export const CLIPS: Clip[] = [
  {
    id: "CM01-Hook",
    cue: "Hook 0:00: Sabka content same kyun lagta hai?",
    seconds: 7,
    component: Hook,
  },
  {
    id: "CM02-ChannelSting",
    cue: "Intro 0:30: channel sting (3 sec)",
    seconds: 3,
    component: Sting,
  },
  {
    id: "CM03-Agenda",
    cue: "Intro: Aaj ka agenda",
    seconds: 10,
    component: Agenda,
  },
  {
    id: "CM04-Problem1",
    cue: "Part 1: Problem 1, Generic output",
    seconds: 6,
    component: ProblemGeneric,
  },
  {
    id: "CM05-Problem2",
    cue: "Part 1: Problem 2, Har baar context dobara",
    seconds: 6,
    component: ProblemContext,
  },
  {
    id: "CM06-Problem3",
    cue: "Part 1: Problem 3, Badi files, adhoori analysis",
    seconds: 6,
    component: ProblemFiles,
  },
  {
    id: "CM07-Strengths",
    cue: "Part 2: Claude ki 4 strengths",
    seconds: 11,
    component: Strengths,
  },
  {
    id: "CM08-UseCase1",
    cue: "Use case 1 3:30: GSC Data → Insights + prompt",
    seconds: 9,
    component: makeUseCase(0),
  },
  {
    id: "CM09-ProTip",
    cue: "Use case 1: pro tip, cross-check numbers",
    seconds: 6,
    component: ProTip,
  },
  {
    id: "CM10-UseCase2",
    cue: "Use case 2 4:20: Content Gap Analysis + prompt",
    seconds: 9,
    component: makeUseCase(1),
  },
  {
    id: "CM11-UseCase3",
    cue: "Use case 3 5:10: Projects = Brand Voice",
    seconds: 9,
    component: makeUseCase(2),
  },
  {
    id: "CM12-UseCase4",
    cue: "Use case 4 6:00: FAQs + Meta Tags + prompt",
    seconds: 9,
    component: makeUseCase(3),
  },
  {
    id: "CM13-UseCase5",
    cue: "Use case 5 6:45: Bina coding ke tool banao + prompt",
    seconds: 9,
    component: makeUseCase(4),
  },
  {
    id: "CM14-Limitations",
    cue: "Part 4 7:30: 3 cheezein dhyan rakho",
    seconds: 9,
    component: Limitations,
  },
  {
    id: "CM15-DraftDecision",
    cue: "Part 4: AI = Draft. Aap = Decision.",
    seconds: 5,
    component: DraftDecision,
  },
  {
    id: "CM16-RCTF",
    cue: "Part 5 8:15: R-C-T-F formula",
    seconds: 15,
    component: Rctf,
  },
  {
    id: "CM17-VagueVsRCTF",
    cue: "Part 5: Vague prompt = Vague output",
    seconds: 11,
    component: VagueVsRctf,
  },
  {
    id: "CM18-Recap",
    cue: "Outro 9:00: quick recap",
    seconds: 8,
    component: Recap,
  },
  {
    id: "CM19-CommentCTA",
    cue: "Outro: Comment + PROMPTS",
    seconds: 8,
    component: CommentCta,
  },
  {
    id: "CM20-EndScreen",
    cue: "End screen (hold 20 sec)",
    seconds: 20,
    component: EndScreen,
  },
];

/** Id prefix per language: CM01-Hook (Hinglish), CME01-Hook (English). */
export const LANG_PREFIX: Record<Lang, string> = { hi: "CM", en: "CME" };

/** The clip list for one language: ids re-prefixed, text from that language. */
export const clipsFor = (lang: Lang): Clip[] =>
  CLIPS.map((clip) => {
    const Inner = clip.component;
    const Localized: React.FC = () =>
      React.createElement(
        ContentProvider,
        { lang },
        React.createElement(Inner),
      );
    Localized.displayName = `${clip.id}-${lang}`;
    return {
      ...clip,
      id: clip.id.replace(/^CM/, LANG_PREFIX[lang]),
      component: Localized,
    };
  });
