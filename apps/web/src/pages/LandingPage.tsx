import { useNavigate } from 'react-router-dom'
import styles from './LandingPage.module.css'

const FEATURES = [
  {
    icon: 'ti-sparkles',
    title: 'AI Flashcards',
    desc: 'Generate flashcards instantly with Gemini AI. Just type words — AI does the rest.',
    color: '#c8f55a',
  },
  {
    icon: 'ti-brain',
    title: 'Spaced Repetition',
    desc: 'SM-2 algorithm ensures you review cards at the perfect time for maximum retention.',
    color: '#ffe44d',
  },
  {
    icon: 'ti-puzzle',
    title: '4 Quiz Modes',
    desc: 'Multiple choice, write translation, fill the gap, word order — never get bored.',
    color: '#ffb3d9',
  },
  {
    icon: 'ti-chart-bar',
    title: 'Track Progress',
    desc: 'Activity calendar, accuracy stats, streak counter — watch yourself improve daily.',
    color: '#b3d9ff',
  },
]

const LANGUAGES = ['English', 'Polish', 'Ukrainian', 'Spanish', 'French', 'German', 'Italian', 'Portuguese']

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <span>Highlingua</span>
        </div>
        <div className={styles.navBtns}>
          <a
            href="https://github.com/vitygo/highlingua"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghBtn}
          >
            <i className="ti ti-brand-github" aria-hidden="true" />
            GitHub
          </a>
          <button className={styles.loginBtn} onClick={() => navigate('/login')}>
            Log in
          </button>
          <button className={styles.ctaSmall} onClick={() => navigate('/register')}>
            Get started
          </button>
        </div>
      </nav>

    
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <i className="ti ti-sparkles" aria-hidden="true" />
            Powered by Gemini AI
          </div>
          <h1 className={styles.heroTitle}>
            Learn any language<br />
            <span className={styles.heroAccent}>with AI flashcards</span>
          </h1>
          <p className={styles.heroDesc}>
            Generate flashcards, study with spaced repetition, test yourself with quizzes.
            All powered by AI — just type words and start learning.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.ctaBtn} onClick={() => navigate('/register')}>
              <i className="ti ti-arrow-right" aria-hidden="true" />
              Start learning free
            </button>
            <a
              href="https://github.com/vitygo/highlingua"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              <i className="ti ti-brand-github" aria-hidden="true" />
              View source
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.cardStack}>
            <div className={`${styles.demoCard} ${styles.demoCard3}`}>
              <span className={styles.demoWord}>Bonjour</span>
              <span className={styles.demoTrans}>Hello</span>
            </div>
            <div className={`${styles.demoCard} ${styles.demoCard2}`}>
              <span className={styles.demoWord}>Hola</span>
              <span className={styles.demoTrans}>Hello</span>
            </div>
            <div className={`${styles.demoCard} ${styles.demoCard1}`}>
              <span className={styles.demoWord}>Airport</span>
              <span className={styles.demoTrans}>Lotnisko</span>
            </div>
          </div>
          <img src="/characters/lingo.png" alt="Lingo" className={styles.heroChar} />
        </div>
      </section>


      <section className={styles.languages}>
        <div className={styles.langTrack}>
          {[...LANGUAGES, ...LANGUAGES].map((lang, i) => (
            <span key={i} className={styles.langPill}>{lang}</span>
          ))}
        </div>
      </section>

      
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Everything you need to learn</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard} style={{ background: f.color }}>
              <i className={`ti ${f.icon} ${styles.featureIcon}`} aria-hidden="true" />
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

  
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How it works</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3 className={styles.stepTitle}>Type words</h3>
            <p className={styles.stepDesc}>Enter words you want to learn in any language</p>
          </div>
          <div className={styles.stepArrow}>
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h3 className={styles.stepTitle}>AI generates cards</h3>
            <p className={styles.stepDesc}>Gemini creates flashcards with translations and examples</p>
          </div>
          <div className={styles.stepArrow}>
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h3 className={styles.stepTitle}>Study & quiz</h3>
            <p className={styles.stepDesc}>Review with spaced repetition and test with 4 quiz modes</p>
          </div>
        </div>
      </section>


      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to start learning?</h2>
        <p className={styles.ctaDesc}>Free to use. No credit card required. Just sign up and go.</p>
        <button className={styles.ctaBtn} onClick={() => navigate('/register')}>
          <i className="ti ti-arrow-right" aria-hidden="true" />
          Create free account
        </button>
      </section>

   
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span>Highlingua</span>
          </div>
          <div className={styles.footerLinks}>
            <a
              href="https://github.com/vitygo/highlingua"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti ti-brand-github" aria-hidden="true" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/viktor-kobylianskyi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ti ti-brand-linkedin" aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          Built by Viktor Kobylianskyi · 2026
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
