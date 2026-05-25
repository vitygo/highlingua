export const STARTER_COLLECTIONS = [
    {
      name: 'Work',
      emoji: 'work',
      cards: [
        {
          word: 'meeting',
          translation: 'spotkanie',
          explanation: 'A gathering of people to discuss something',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['appointment', 'conference']),
          examples: JSON.stringify([
            { sentence: 'We have a meeting at 10 AM.', translation: 'Mamy spotkanie o 10 rano.' },
          ]),
        },
        {
          word: 'deadline',
          translation: 'termin',
          explanation: 'The latest time by which something must be completed',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['due date', 'time limit']),
          examples: JSON.stringify([
            { sentence: 'The deadline for the project is Friday.', translation: 'Termin oddania projektu to piątek.' },
          ]),
        },
        {
          word: 'salary',
          translation: 'pensja',
          explanation: 'Money paid regularly for work',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['wage', 'pay']),
          examples: JSON.stringify([
            { sentence: 'She received a higher salary after the promotion.', translation: 'Dostała wyższą pensję po awansie.' },
          ]),
        },
        {
          word: 'colleague',
          translation: 'kolega z pracy',
          explanation: 'A person you work with',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['coworker', 'teammate']),
          examples: JSON.stringify([
            { sentence: 'My colleague helped me with the report.', translation: 'Mój kolega z pracy pomógł mi z raportem.' },
          ]),
        },
        {
          word: 'to apply',
          translation: 'aplikować',
          explanation: 'To make a formal request for a job',
          partOfSpeech: 'verb',
          level: 'B1',
          synonyms: JSON.stringify(['submit', 'request']),
          examples: JSON.stringify([
            { sentence: 'I want to apply for this position.', translation: 'Chcę aplikować na to stanowisko.' },
          ]),
        },
      ],
    },
    {
      name: 'Sport',
      emoji: 'sport',
      cards: [
        {
          word: 'score',
          translation: 'wynik',
          explanation: 'The number of points in a game',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['result', 'points']),
          examples: JSON.stringify([
            { sentence: 'The final score was 3 to 1.', translation: 'Końcowy wynik to 3 do 1.' },
          ]),
        },
        {
          word: 'to train',
          translation: 'trenować',
          explanation: 'To practice a sport or exercise regularly',
          partOfSpeech: 'verb',
          level: 'A2',
          synonyms: JSON.stringify(['practice', 'exercise']),
          examples: JSON.stringify([
            { sentence: 'He trains every morning before work.', translation: 'On trenuje każdego ranka przed pracą.' },
          ]),
        },
        {
          word: 'tournament',
          translation: 'turniej',
          explanation: 'A competition with many players or teams',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['championship', 'competition']),
          examples: JSON.stringify([
            { sentence: 'Our team won the basketball tournament.', translation: 'Nasz zespół wygrał turniej koszykówki.' },
          ]),
        },
        {
          word: 'coach',
          translation: 'trener',
          explanation: 'A person who trains a team or athlete',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['trainer', 'instructor']),
          examples: JSON.stringify([
            { sentence: 'The coach told us to run faster.', translation: 'Trener kazał nam biegać szybciej.' },
          ]),
        },
        {
          word: 'injury',
          translation: 'kontuzja',
          explanation: 'Physical damage to the body',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['wound', 'harm']),
          examples: JSON.stringify([
            { sentence: 'He missed the game because of an injury.', translation: 'Opuścił mecz z powodu kontuzji.' },
          ]),
        },
      ],
    },
    {
      name: 'Study',
      emoji: 'study',
      cards: [
        {
          word: 'homework',
          translation: 'zadanie domowe',
          explanation: 'School work done at home',
          partOfSpeech: 'noun',
          level: 'A1',
          synonyms: JSON.stringify(['assignment', 'task']),
          examples: JSON.stringify([
            { sentence: 'I forgot to do my homework yesterday.', translation: 'Zapomniałem zrobić zadanie domowe wczoraj.' },
          ]),
        },
        {
          word: 'to memorize',
          translation: 'zapamiętać',
          explanation: 'To learn something so you can remember it',
          partOfSpeech: 'verb',
          level: 'B1',
          synonyms: JSON.stringify(['learn', 'remember']),
          examples: JSON.stringify([
            { sentence: 'You need to memorize these words for the test.', translation: 'Musisz zapamiętać te słowa na test.' },
          ]),
        },
        {
          word: 'exam',
          translation: 'egzamin',
          explanation: 'A formal test of knowledge',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['test', 'quiz']),
          examples: JSON.stringify([
            { sentence: 'The final exam is next Monday.', translation: 'Egzamin końcowy jest w następny poniedziałek.' },
          ]),
        },
        {
          word: 'to improve',
          translation: 'poprawić się',
          explanation: 'To become better at something',
          partOfSpeech: 'verb',
          level: 'A2',
          synonyms: JSON.stringify(['get better', 'progress']),
          examples: JSON.stringify([
            { sentence: 'I want to improve my English speaking.', translation: 'Chcę poprawić moje mówienie po angielsku.' },
          ]),
        },
        {
          word: 'knowledge',
          translation: 'wiedza',
          explanation: 'Information and skills gained through learning',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['understanding', 'expertise']),
          examples: JSON.stringify([
            { sentence: 'Reading books increases your knowledge.', translation: 'Czytanie książek poszerza twoją wiedzę.' },
          ]),
        },
      ],
    },
    {
      name: 'Food',
      emoji: 'food',
      cards: [
        {
          word: 'recipe',
          translation: 'przepis',
          explanation: 'Instructions for cooking a dish',
          partOfSpeech: 'noun',
          level: 'A2',
          synonyms: JSON.stringify(['cooking instructions', 'formula']),
          examples: JSON.stringify([
            { sentence: 'Can you give me the recipe for this cake?', translation: 'Czy możesz mi dać przepis na to ciasto?' },
          ]),
        },
        {
          word: 'to taste',
          translation: 'smakować',
          explanation: 'To experience the flavor of food or drink',
          partOfSpeech: 'verb',
          level: 'A2',
          synonyms: JSON.stringify(['try', 'sample']),
          examples: JSON.stringify([
            { sentence: 'This soup tastes amazing!', translation: 'Ta zupa smakuje niesamowicie!' },
          ]),
        },
        {
          word: 'ingredient',
          translation: 'składnik',
          explanation: 'One of the things used to make a dish',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['component', 'element']),
          examples: JSON.stringify([
            { sentence: 'We need fresh ingredients for the salad.', translation: 'Potrzebujemy świeżych składników do sałatki.' },
          ]),
        },
        {
          word: 'spicy',
          translation: 'ostry',
          explanation: 'Having a strong hot flavor',
          partOfSpeech: 'adjective',
          level: 'A2',
          synonyms: JSON.stringify(['hot', 'peppery']),
          examples: JSON.stringify([
            { sentence: 'This curry is too spicy for me.', translation: 'To curry jest dla mnie za ostre.' },
          ]),
        },
        {
          word: 'dessert',
          translation: 'deser',
          explanation: 'A sweet dish served after the main meal',
          partOfSpeech: 'noun',
          level: 'A1',
          synonyms: JSON.stringify(['sweet', 'treat']),
          examples: JSON.stringify([
            { sentence: 'Would you like some dessert after dinner?', translation: 'Czy chciałbyś deser po kolacji?' },
          ]),
        },
      ],
    },
    {
      name: 'Planet',
      emoji: 'world',
      cards: [
        {
          word: 'climate',
          translation: 'klimat',
          explanation: 'The weather conditions of a region',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['weather', 'conditions']),
          examples: JSON.stringify([
            { sentence: 'Climate change is a serious global problem.', translation: 'Zmiana klimatu to poważny globalny problem.' },
          ]),
        },
        {
          word: 'to recycle',
          translation: 'recyklingować',
          explanation: 'To convert waste into reusable material',
          partOfSpeech: 'verb',
          level: 'A2',
          synonyms: JSON.stringify(['reuse', 'repurpose']),
          examples: JSON.stringify([
            { sentence: 'We should recycle plastic bottles.', translation: 'Powinniśmy recyklingować plastikowe butelki.' },
          ]),
        },
        {
          word: 'pollution',
          translation: 'zanieczyszczenie',
          explanation: 'Harmful substances in the environment',
          partOfSpeech: 'noun',
          level: 'B1',
          synonyms: JSON.stringify(['contamination', 'smog']),
          examples: JSON.stringify([
            { sentence: 'Air pollution is very bad in big cities.', translation: 'Zanieczyszczenie powietrza jest bardzo duże w dużych miastach.' },
          ]),
        },
        {
          word: 'endangered',
          translation: 'zagrożony',
          explanation: 'At risk of becoming extinct',
          partOfSpeech: 'adjective',
          level: 'B1',
          synonyms: JSON.stringify(['threatened', 'at risk']),
          examples: JSON.stringify([
            { sentence: 'Polar bears are an endangered species.', translation: 'Niedźwiedzie polarne to zagrożony gatunek.' },
          ]),
        },
        {
          word: 'forest',
          translation: 'las',
          explanation: 'A large area covered with trees',
          partOfSpeech: 'noun',
          level: 'A1',
          synonyms: JSON.stringify(['woods', 'jungle']),
          examples: JSON.stringify([
            { sentence: 'We went for a walk in the forest.', translation: 'Poszliśmy na spacer do lasu.' },
          ]),
        },
      ],
    },
  ]