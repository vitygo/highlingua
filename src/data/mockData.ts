import type { Module, QuizQuestion, VocabCard, FillBlank, SentencePuzzle, SpeedQuestion, WordScramble, ListeningPassage, Achievement, LeaderboardEntry, CommunityPost, GameDef, StoryBeat, TypingExercise } from '@/types'


export const MODULES: Module[] = [
    {id:'grammar', icon:'📝', title:'Grammar Foundations', color:'#6d5cf6', bg:'rgba(109,92,246,0.12)', lessons:12, done:9, level:'Beginner', xp:120, desc:'Tenses, articles, passive voice', topics:['Present Tenses','Past Tenses','Future','Conditionals','Passive Voice','Articles']},
    {id:'vocab', icon:'📖', title:'Vocabulary Builder', color:'#22d4a0', bg:'rgba(34,212,160,0.12)', lessons:15, done:8, level:'All Levels', xp:90, desc:'Idioms, phrasal verbs & academic words', topics:['Word Families','Collocations','Idioms','Phrasal Verbs','Academic Words','Slang']},
    {id:'speaking', icon:'🗣️', title:'Speaking & Pronunciation', color:'#f05fa8', bg:'rgba(240,95,168,0.12)', lessons:8, done:3, level:'Intermediate', xp:150, desc:'Phonics, stress & fluency', topics:['Vowel Sounds','Consonants','Stress','Intonation','Connected Speech','Accents']},
    {id:'listening', icon:'🎧', title:'Listening Skills', color:'#38b6ff', bg:'rgba(56,182,255,0.12)', lessons:10, done:2, level:'Intermediate', xp:110, desc:'Accents, podcasts & real conversations', topics:['Accents','Conversations','News','Songs','Movies','Podcasts']},
    {id:'reading', icon:'📰', title:'Reading Comprehension', color:'#ffb547', bg:'rgba(255,181,71,0.12)', lessons:10, done:5, level:'Intermediate', xp:100, desc:'Skimming, scanning & critical reading', topics:['Skimming','Scanning','Inference','Vocabulary','Critical Reading','Speed Reading']},
    {id:'writing', icon:'✍️', title:'Writing Workshop', color:'#ff4d6a', bg:'rgba(255,77,106,0.12)', lessons:10, done:0, level:'Advanced', xp:200, desc:'Essays, emails & creative writing', topics:[], locked:true, lockLevel:15},
    {id:'business', icon:'💼', title:'Business English', color:'#8b78ff', bg:'rgba(139,120,255,0.12)', lessons:12, done:0, level:'Advanced', xp:250, desc:'Meetings, emails & negotiations', topics:[], locked:true, lockLevel:18},
    {id:'ielts', icon:'🎓', title:'IELTS Preparation', color:'#38b6ff', bg:'rgba(56,182,255,0.12)', lessons:20, done:0, level:'Advanced', xp:300, desc:'Full test prep: Reading, Writing, Listening, Speaking', topics:[], locked:true, lockLevel:20},
  ]

export const QUIZ_DATA: QuizQuestion[] = [
  { q:'Which sentence uses the Present Perfect correctly?', opts:['She have finished her homework.','They have visited Paris twice.','He has went to the market.','We had seen that film.'], ans:1, explanation:"'have/has + past participle' — 'have visited' is the correct form." },
  { q:"'If I ___ rich, I would travel the world.'", opts:['am','was','were','will be'], ans:2, explanation:"Second conditional uses 'were' for all persons to express hypothetical situations." },
  { q:"Which word is a synonym for 'ephemeral'?", opts:['Eternal','Transient','Profound','Vibrant'], ans:1, explanation:"Ephemeral means lasting briefly — synonym: transient." },
  { q:'Select the correct passive sentence:', opts:['The book was written by her.','The book written was by her.','By her the book was written.','Was the book written her by.'], ans:0, explanation:'Passive: Object + was/were + past participle + by + subject.' },
  { q:"'She's been waiting ___ two hours.' — which preposition?", opts:['since','for','during','while'], ans:1, explanation:"'for' + period of time; 'since' + specific point in time." },
  { q:'Which is the correct comparative form?', opts:['More good','Gooder','Better','More better'], ans:2, explanation:"'good' → irregular comparative: better." },
  { q:'Correct article usage:', opts:['I saw an unique opportunity.','She is best in a world.','He is an honest man.','They went to an hospital.'], ans:2, explanation:"'an' before vowel sounds — 'honest' starts with /ɒ/ sound." },
  { q:"'Would rather' correct usage:", opts:['I would rather to stay.','I would rather staying.','I would rather stay.','I would rather stayed.'], ans:2, explanation:"'would rather' + bare infinitive (no 'to')." },
]

export const VOCAB_CARDS: VocabCard[] = [
  { word:'Persevere', pos:'verb', def:'Continue despite difficulty or delay', ex:'She persevered through every challenge and finally succeeded.', phonetic:'/ˌpɜːrsɪˈvɪər/', level:'B2' },
  { word:'Eloquent', pos:'adj', def:'Fluent and persuasive in speech or writing', ex:'His eloquent speech moved the entire audience to tears.', phonetic:'/ˈeləkwənt/', level:'C1' },
  { word:'Meticulous', pos:'adj', def:'Showing great attention to detail', ex:'She was meticulous in checking every line of code.', phonetic:'/məˈtɪkjələs/', level:'C1' },
  { word:'Ambiguous', pos:'adj', def:'Open to more than one interpretation', ex:'The contract contained several ambiguous clauses.', phonetic:'/æmˈbɪɡjuəs/', level:'B2' },
  { word:'Collaborate', pos:'verb', def:'Work jointly on an activity or project', ex:'The two teams collaborated to develop a new solution.', phonetic:'/kəˈlæbəreɪt/', level:'B1' },
  { word:'Unprecedented', pos:'adj', def:'Never done or known before', ex:'The company achieved unprecedented growth this year.', phonetic:'/ʌnˈpresɪdentɪd/', level:'C1' },
  { word:'Pragmatic', pos:'adj', def:'Dealing with things sensibly and realistically', ex:'We need a pragmatic approach to solve this problem.', phonetic:'/præɡˈmætɪk/', level:'C1' },
  { word:'Resilient', pos:'adj', def:'Able to recover quickly from difficult conditions', ex:'Children are often more resilient than adults expect.', phonetic:'/rɪˈzɪliənt/', level:'B2' },
  { word:'Benevolent', pos:'adj', def:'Well-meaning and kindly', ex:'The benevolent teacher always helped struggling students.', phonetic:'/bɪˈnevələnt/', level:'C1' },
  { word:'Exacerbate', pos:'verb', def:'Make a problem, bad situation worse', ex:'The delay only exacerbated tensions between the two parties.', phonetic:'/ɪɡˈzæsəbeɪt/', level:'C2' },
]

export const FILL_BLANKS: FillBlank[] = [
    { sentence:'They ___ (live) in London since 2019.', answer:'have lived', alt:'have been living', hint:"Present Perfect with 'since'", translation:'Oni mieszkają w Londynie od 2019 roku.' },
    { sentence:'By the time she arrived, he ___ (already leave).', answer:'had already left', hint:'Past Perfect for actions before another past event', translation:'Gdy ona przyszła, on już wyszedł.' },
    { sentence:'If I ___ (be) you, I would apologize.', answer:'were', hint:"Second conditional — use 'were' for all persons", translation:'Gdybym był na twoim miejscu, przeprosiłbym.' },
    { sentence:'She ___ (work) here for three years before she quit.', answer:'had been working', hint:'Past Perfect Continuous for duration before a past event', translation:'Pracowała tutaj trzy lata, zanim zrezygnowała.' },
    { sentence:'The report ___ (submit) by Friday.', answer:'must be submitted', hint:'Modal passive — obligation + passive voice', translation:'Raport musi zostać złożony do piątku.' },
    { sentence:'I wish I ___ (know) the answer last night.', answer:'had known', hint:'Past wish — had + past participle', translation:'Szkoda, że nie znałem odpowiedzi zeszłej nocy.' },
  ]

export const SENTENCE_PUZZLES: SentencePuzzle[] = [
  { words:['She','has','been','studying','English','for','two','years','.'], correct:'She has been studying English for two years .', tip:'Present Perfect Continuous: has/have been + -ing' },
  { words:['The','meeting','will','have','been','cancelled','by','then','.'], correct:'The meeting will have been cancelled by then .', tip:'Future Perfect Passive' },
  { words:['Had','he','known','the','truth','he','would','have','acted','differently','.'], correct:'Had he known the truth he would have acted differently .', tip:'Third Conditional with inversion' },
  { words:['It','is','essential','that','she','attend','the','conference','.'], correct:'It is essential that she attend the conference .', tip:'Subjunctive mood after "essential that"' },
]

export const SPEED_ROUNDS: SpeedQuestion[] = [
  { q:"opposite of 'ancient'", a:'modern', alts:['new','recent','contemporary'] },
  { q:"past tense of 'bring'", a:'brought', alts:[] },
  { q:"synonym of 'happy'", a:'joyful', alts:['glad','cheerful','elated'] },
  { q:"a word meaning 'very big'", a:'enormous', alts:['huge','gigantic','colossal'] },
  { q:"opposite of 'guilty'", a:'innocent',  alts:[] },
  { q:"past tense of 'fly'", a:'flew', alts:[] },
  { q:"'fear of spiders'",  a:'arachnophobia',alts:[] },
  { q:"synonym of 'begin'", a:'commence', alts:['start','initiate'] },
  { q:"opposite of 'complex'", a:'simple', alts:['easy','straightforward'] },
  { q:"past tense of 'choose'", a:'chose', alts:[] },
  { q:"3rd conditional: 'If I ___ known'", a:'had', alts:[] },
  { q:"formal word for 'buy'", a:'purchase', alts:['acquire','obtain'] },
]

export const WORD_SCRAMBLES: WordScramble[] = [
  { scrambled:'IELNEERSIT', word:'RESILIENT', hint:'Able to bounce back from difficulties' },
  { scrambled:'TNOILAOCBR', word:'COLLABORATION', hint:'Working together toward a goal' },
  { scrambled:'CITNSEPOS',  word:'INSPECTIONS', hint:'Official examinations or checks' },
  { scrambled:'NUTPEOIRECD',word:'UNPREDICTED', hint:'Not foreseen or expected' },
  { scrambled:'EOBRDMSAH',  word:'ABHORRED', hint:'Regarded with disgust or hatred' },
  { scrambled:'CTIMESOLUIU',word:'METICULOUS', hint:'Very careful and precise' },
]

export const LISTENING_PASSAGES: ListeningPassage[] = [
  {
    title:'Climate Change Discussion',
    text:'Scientists around the world are increasingly concerned about the rapid pace of climate change. Recent data suggests that global temperatures have risen by approximately 1.2 degrees Celsius since the pre-industrial era, with the most significant increases occurring in the last two decades. Many experts believe that urgent action is needed to prevent further warming and mitigate its devastating effects on ecosystems and coastal communities.',
    questions:[
      { q:'How much have global temperatures risen?', opts:['0.8°C','1.2°C','1.5°C','2.0°C'], ans:1 },
      { q:'When did the most significant increases occur?', opts:['Last century','Last 50 years','Last 2 decades','Last decade'], ans:2 },
    ],
  },
  {
    title:'Tech Innovation Talk',
    text:'Artificial intelligence is transforming industries at an unprecedented rate. From healthcare to finance, AI systems are now capable of performing tasks that were once considered exclusively human domains. However, experts warn that the widespread adoption of AI also brings significant challenges, including questions about employment, privacy, and ethical decision-making that society must address proactively.',
    questions:[
      { q:'Which industries does AI affect?', opts:['Only tech','Healthcare & finance','Manufacturing only','All industries'], ans:3 },
      { q:'What challenge is NOT mentioned?', opts:['Employment','Privacy','Ethics','Climate change'], ans:3 },
    ],
  },
]

export const STORY_BEATS: StoryBeat[] = [
  {
    text: "You arrive at the London office for your first day. Your manager says: 'The presentation is ___ an hour. Could you review the slides?'",
    choices: [
      { label:'in', outcome:'Correct! "In an hour" = future time expression', correct:true },
      { label:'after', outcome:'Close, but "after an hour" means following a one-hour wait', correct:false },
      { label:'on', outcome:'"On" is used for specific dates, not durations', correct:false },
      { label:'within',outcome:'"Within an hour" also works! But "in" is more natural here', correct:true },
    ],
  },
  {
    text: "Your colleague asks for advice: 'I ___ (work) on this project for six months and I still haven't finished it.'",
    choices: [
      { label:'have been working', outcome:'✨ Perfect! Present Perfect Continuous for ongoing past action', correct:true },
      { label:'am working', outcome:'Simple present doesn\'t show the duration from the past', correct:false },
      { label:'worked', outcome:'Simple past suggests it\'s finished — but it\'s not!', correct:false },
      { label:'had worked', outcome:'Past Perfect is used when another past event follows', correct:false },
    ],
  },
  {
    text: "In the meeting, your boss asks: 'We need someone to ___ the new client next week. Any volunteers?'",
    choices: [
      { label:'deal with', outcome:'✅ "Deal with" = handle professionally — great phrasal verb!', correct:true },
      { label:'deal to', outcome:'"Deal to" is not a standard English phrasal verb', correct:false },
      { label:'handle on', outcome:'"Handle on" is incorrect — just say "handle"', correct:false },
      { label:'manage with',outcome:'"Manage with" is not the right collocation here', correct:false },
    ],
  },
]

export const TYPING_EXERCISES: TypingExercise[] = [
    { sentence:'The quick brown fox jumps over the lazy dog.', translation:'Szybki brązowy lis przeskakuje nad leniwym psem.', tip:'This sentence contains every letter of the alphabet!' },
    { sentence:'She had been waiting for nearly an hour when he finally arrived.', translation:'Czekała prawie godzinę, gdy w końcu przybył.', tip:'Past Perfect Continuous — duration before a past event' },
    { sentence:'Not only did he apologize, but he also brought flowers.', translation:'Nie tylko przeprosił, ale też przyniósł kwiaty.', tip:'"Not only...but also" — correlative conjunction with inversion' },
    { sentence:'The report must have been submitted before the deadline.', translation:'Raport musiał zostać złożony przed terminem.', tip:'Modal perfect passive: must have been + past participle' },
    { sentence:'Scarcely had she opened the door when the phone rang.', translation:'Ledwo otworzyła drzwi, gdy zadzwonił telefon.', tip:'Inversion with "scarcely had" — literary style' },]

export const ACHIEVEMENTS: Achievement[] = [
  { id:'streak7', icon:'🔥', title:'Week Warrior', desc:'7-day streak', earned:true },
  { id:'streak14', icon:'🔥', title:'Fortnight Fire', desc:'14-day streak', earned:true },
  { id:'perfect', icon:'🎯', title:'Sharpshooter', desc:'100% quiz score', earned:true },
  { id:'vocab100', icon:'📚', title:'Word Hoarder', desc:'Learn 100 words', earned:true },
  { id:'speed', icon:'⚡', title:'Speed Demon', desc:'15+ speed round answers', earned:true },
  { id:'flawless', icon:'✨', title:'Flawless', desc:'No mistakes in a lesson', earned:true },
  { id:'listen', icon:'🎧', title:'Eagle Ear', desc:'Complete 5 listening', earned:false, progress:3, total:5 },
  { id:'grammar', icon:'📝', title:'Grammar Guru', desc:'Finish grammar module', earned:false, progress:9, total:12 },
  { id:'legend', icon:'🏆', title:'Legend', desc:'Reach Level 20', earned:false, progress:12,total:20 },
  { id:'social', icon:'💬', title:'Chatterbox', desc:'Post 20 messages', earned:false, progress:4, total:20 },
  { id:'gems50', icon:'💎', title:'Gem Collector', desc:'Collect 50 gems', earned:false, progress:48,total:50 },
  { id:'night', icon:'🌙', title:'Night Owl', desc:'Study after midnight', earned:false },
  { id:'typing', icon:'⌨️', title:'Type Racer', desc:'Type 60+ WPM', earned:false, progress:48, total:60 },
  { id:'story', icon:'📖', title:'Story Master', desc:'Complete 5 stories', earned:false, progress:2, total:5 },
]

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank:1,  name:'SarahK', avatar:'', flag:'🇬🇧', xp:12450, streak:45, level:22 },
  { rank:2,  name:'TomR', avatar:'', flag:'🇺🇸', xp:11890, streak:38, level:21 },
  { rank:3,  name:'MeiL', avatar:'', flag:'🇨🇳', xp:9300,  streak:31, level:19 },
  { rank:4,  name:'AnnaV', avatar:'', flag:'🇩🇪', xp:8750,  streak:22, level:17 },
  { rank:5,  name:'CarlosM', avatar:'', flag:'🇧🇷', xp:7920,  streak:19, level:16 },
  { rank:6,  name:'YukiT', avatar:'', flag:'🇯🇵', xp:6640,  streak:14, level:15 },
  { rank:7,  name:'DianaP', avatar:'', flag:'🇵🇱', xp:5800,  streak:11, level:14 },
  { rank:8,  name:'OmarA', avatar:'', flag:'🇦🇪', xp:5100,  streak:9,  level:13 },
  { rank:9,  name:'LucasB', avatar:'', flag:'🇫🇷', xp:4300,  streak:7,  level:13 },
  { rank:10, name:'NinaS', avatar:'', flag:'🇯🇵', xp:3800,  streak:5,  level:12 },
  { rank:12, name:'You (Viktor)', avatar:'', flag:'🇺🇦', xp:3100,  streak:14, level:12, isMe:true },
]

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id:1, user:'TomR',    avatar:'', flag:'🇺🇸', time:'2h ago', text:"Just finished the Advanced Grammar module! The Present Perfect exercises finally clicked for me 🎉 The Story Mode really helped!", likes:42, replies:8,  badge:'⭐ Top Helper' },
  { id:2, user:'AnnaV',   avatar:'', flag:'🇩🇪', time:'5h ago', text:'Practice tip: Watch English films with subtitles first, then without. Dramatically improved my listening in 2 weeks! 🎬', likes:67, replies:12 },
  { id:3, user:'MeiL',    avatar:'', flag:'🇨🇳', time:'1d ago', text:"Can someone explain 'affect' vs 'effect'? I keep mixing them up in my writing exercises 😅", likes:14, replies:23 },
  { id:4, user:'CarlosM', avatar:'', flag:'🇧🇷', time:'2d ago', text:'Hit a 19-day streak today! The Typing Trainer is my new favourite mode — so satisfying when you hit 60 WPM! 🔥', likes:89, replies:15 },
]

export const GAME_DEFS: GameDef[] = [
  { id:'quiz', icon:'🧠', title:'Grammar Quiz', desc:'Multiple-choice timed questions testing grammar mastery', color:'#6d5cf6', xp:120, time:'10 min' },
  { id:'vocab', icon:'🃏', title:'Flashcard Deck', desc:'Master vocabulary with 3D cards and spaced repetition', color:'#22d4a0', xp:80,  time:'8 min' },
  { id:'drag', icon:'🔀', title:'Sentence Builder', desc:'Click words into the correct grammatical order',color:'#38b6ff', xp:90,  time:'7 min' },
  { id:'fill', icon:'✏️', title:'Fill the Blanks', desc:'Complete sentences using correct tenses and forms', color:'#ffb547', xp:70,  time:'6 min' },
  { id:'speed', icon:'⚡', title:'Speed Round', desc:'60 seconds, as many answers as possible — pure adrenaline!', color:'#ff4d6a', xp:150, time:'1 min', badge:'🔥' },
  { id:'scramble', icon:'🔤', title:'Word Unscramble', desc:'Unscramble letters to reveal hidden vocabulary words', color:'#f05fa8', xp:60,  time:'5 min' },
  { id:'listen', icon:'🎧', title:'Listening Quiz', desc:'Read a passage then answer comprehension questions from memory', color:'#38b6ff', xp:100, time:'8 min' },
  { id:'story', icon:'📖', title:'Story Mode', desc:'Navigate interactive branching stories using correct grammar', color:'#8b78ff', xp:180, time:'12 min', badge:'✨' },
  { id:'typing', icon:'⌨️', title:'Typing Trainer', desc:'Type sentences accurately and improve your WPM while learning', color:'#22d4a0', xp:110, time:'5 min', badge:'🆕' },
  { id:'dictation', icon:'🎙️', title:'Dictation Mode', desc:'Listen carefully and type exactly what you hear — pure listening skill', color:'#ff7040', xp:130, time:'6 min', badge:'🆕' },
]
