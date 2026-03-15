export type PageId = 'dashboard' | 'lessons' | 'practice' | 'challenges'| 'leaderboard' | 'community' | 'profile' | 'admin'
export type GameMode = 'quiz' | 'vocab' | 'drag' | 'fill' | 'speed' | 'scramble' | 'listen' | 'story' | 'typing' | 'dictation'


export interface UserState {
    name: string; avatar: string; level: number; xp: number; maxXp: number
    streak: number; gems: number; hearts: number; accuracy: number
    totalLessons: number; wordsLearned: number; minutesToday: number
  }

export interface Module {
    id: string; icon: string; title: string; color: string; bg: string
    lessons: number; done: number; level: string; xp: number; topics: string[]
    locked?: boolean; lockLevel?: number; desc?: string
  }

export interface QuizQuestion { 
    q: string;
    opts: string[];
    ans: number;
    explanation: string
}
export interface VocabCard { 
    word: string; 
    pos: string; 
    def: string; 
    ex: string; 
    phonetic: string; 
    level: string }

export interface FillBlank { 
    sentence: string; 
    answer: string; 
    alt?: string; 
    hint: string; 
    translation: string }

export interface SentencePuzzle { 
    words: string[]; 
    correct: string; 
    tip?: string 
}

export interface SpeedQuestion { 
    q: string; 
    a: string; 
    alts: string[] 
}

export interface WordScramble { 
    scrambled: string; 
    word: string; 
    hint: string 
}

export interface ListeningPassage { 
    title: string; 
    text: string; 
    questions: { q: string; opts: string[]; ans: number }[] 
}

export interface StoryBeat { 
    text: string; 
    choices: { label: string; outcome: string; correct: boolean }[] 
}

export interface TypingExercise { 
    sentence: string; 
    translation: string; 
    tip: string }

export interface Achievement { 
    id: string; 
    icon: string; 
    title: string; 
    desc: string; 
    earned: boolean; 
    progress?: number; 
    total?: number }

export interface LeaderboardEntry {
    rank: number; 
    name: string; 
    avatar: string; 
    flag: string; 
    xp: number; 
    streak: number; 
    level: number; 
    isMe?: boolean}

export interface CommunityPost {
    id: number; 
    user: string; 
    avatar: string; 
    flag: string; 
    time: string; 
    text: string; 
    likes: number; 
    replies: number; 
    badge?: string 
}

export interface GameDef { 
    id: GameMode; 
    icon: string; 
    title: string; 
    desc: string; 
    color: string; 
    xp: number; 
    time: string; 
    badge?: string
}
  
