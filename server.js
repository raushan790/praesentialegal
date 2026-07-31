/**
 * Praesentia Legal Solutions — Express Server
 * Modern, clean, superfast law-firm website
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets with cache headers
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  etag: true
}));

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---- Site-wide data available to all templates ----
const siteData = {
  site: {
    name: 'Praesentia',
    fullName: 'Praesentia Legal Solutions',
    tagline: 'Strategic Legal Partners for Growth-Focused Businesses',
    description: 'Embedded fractional General Counsel for founders, executive teams, and growing businesses — bridging the gap between expensive law firms and full-time in-house counsel across the US, India & West Asia.',
    url: 'https://praesentialegal.com',
    email: 'connect@praesentialegal.com',
    linkedin: 'https://www.linkedin.com',
    year: new Date().getFullYear(),
    jurisdictions: ['🇺🇸 United States', '🇮🇳 India', '🕌 West Asia (UAE)']
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Results', href: '/impact' },
    { label: 'Contact', href: '/contact' }
  ],
  services: [
    {
      id: 'fgc',
      badge: '01 · Strategic Leadership',
      title: 'Fractional General Counsel',
      desc: 'Strategic leadership. We sit on your executive team, manage key risk decisions, direct outside counsel, and attend board meetings to advise on strategic paths.',
      points: [
        'Board meeting participation & advisory',
        'Financing & fundraising legal leadership',
        'Corporate governance design',
        'Scaling strategy & risk ownership',
        'Directing & managing outside counsel'
      ]
    },
    {
      id: 'managed',
      badge: '02 · Day-to-Day Operations',
      title: 'Managed Legal Services',
      desc: 'Day-to-day operations. Contract review, policy drafting, legal ops, ongoing employment advisory, templates drafting, and more.',
      points: [
        'Contract review & negotiation',
        'Policy & template drafting',
        'Legal operations & CLM management',
        'Ongoing employment advisory',
        'Routine backlog management'
      ]
    },
    {
      id: 'project',
      badge: '03 · Milestone Execution',
      title: 'Project-Based Support',
      desc: 'Milestone execution. Dedicated support through complex fundraising rounds, global M&A integration, corporate restructuring, or deep compliance reviews.',
      points: [
        'Complex fundraising rounds',
        'Global M&A integration',
        'Corporate restructuring',
        'Deep compliance reviews',
        'Cross-border entity structuring'
      ]
    },
    {
      id: 'recruitment',
      badge: '04 · Internal Scale-Up',
      title: 'Legal Recruitment',
      desc: 'Internal scale-up. We design in-house roles, assess candidates like General Counsel, and onboard full-time hires when your scale justifies permanent headcount.',
      points: [
        'In-house role design & JDs',
        'Candidate assessment & interviewing',
        'General Counsel hiring support',
        'Onboarding & knowledge transfer',
        'Transition from fractional to full-time'
      ]
    }
  ],
  team: [
    {
      initials: 'AB',
      name: 'Arkajit Bhattacharyya',
      role: 'Partner',
      photo: 'arkajit.jpeg',
      bio: [
        'Former General Counsel / AVP Legal — Innovaccer',
        'Former Associate Director — Thomson Reuters Legal Managed Services',
        'Former Consulting Counsel — Air India',
        'First lawyer hired by Innovaccer; built and led legal & compliance across US, India & UAE',
        'Extensive experience in commercial contracting, compliance, employment law, disputes, legal operations, fundraising, M&A, governance, and cross-border legal support'
      ]
    },
    {
      initials: 'AG',
      name: 'Ayetree Gogoi',
      role: 'Partner',
      photo: 'ayetree.jpeg',
      bio: [
        'Former Associate Director — Legal — Innovaccer',
        'Former Associate Director — Thomson Reuters Legal Managed Services (later acquired by EY GDS)',
        'Former Lead Counsel — LambdaTest (TestMU)',
        'Significant experience supporting high-growth technology companies through commercial expansion, contracting, legal operations, compliance, employment advisory, and legal process transformation'
      ]
    }
  ],
  valueProps: [
    { icon: '✓', title: 'Strategic Partnership', desc: 'Executive boardroom integration.' },
    { icon: '⚡', title: 'Faster Contracts', desc: 'Drastic reduction in deal cycles.' },
    { icon: '📋', title: 'Better Governance', desc: 'Standardized board controls.' },
    { icon: '🛡️', title: 'Stronger Compliance', desc: 'Custom regulatory guardrails.' },
    { icon: '📈', title: 'Scalable Operations', desc: 'Playbooks ready for growth.' },
    { icon: '🔒', title: 'Reduced Risk', desc: 'Shielding corporate liability.' },
    { icon: '⚖️', title: 'Legal Leadership', desc: 'Direct risk assessment.' },
    { icon: '🤝', title: 'Commercial Focus', desc: 'Closing transactions actively.' },
    { icon: '🌐', title: 'Global Experience', desc: 'Active multi-region support.' },
    { icon: '🎯', title: 'Long-Term Partner', desc: 'Shared vision through expansion.' }
  ],
  impactAreas: [
    { num: '01', icon: '🚀', title: 'Revenue Velocity', problem: 'Slow commercial contracting', solution: 'End-to-end contract acceleration, standardized SLA-driven playbooks, and modern AI screening protocols.' },
    { num: '02', icon: '🧭', title: 'Strategic Vacuum', problem: 'Lack of in-house leadership', solution: 'Fractional General Counsel leading board meetings, financing, corporate governance, and scaling strategies.' },
    { num: '03', icon: '🛡️', title: 'Risk Management', problem: 'Compliance pressure', solution: 'Designing custom regional & international regulatory frameworks that scale cleanly with operations.' },
    { num: '04', icon: '🌍', title: 'Global Expansion', problem: 'Scaling globally', solution: 'Seamless cross-border support structuring, workforce advisory, and international legal setup.' },
    { num: '05', icon: '👥', title: 'Team Overload', problem: 'Legal team overload', solution: 'Managed legal ops, removing routine backlogs and letting internal teams focus on major transactions.' },
    { num: '06', icon: '🏛️', title: 'Governance Control', problem: 'Investor expectations', solution: 'Bulletproof compliance & governance standards designed to ace strict institutional DD.' }
  ],
  stats: [
    { num: 30, suffix: '+', label: 'Years Combined Experience' },
    { num: 3, suffix: '', label: 'Active Jurisdictions' },
    { num: 4, suffix: '', label: 'Engagement Models' },
    { num: 2, suffix: '', label: 'Scale-Up Alumni' }
  ]
};

// Inject site data into every response
app.use((req, res, next) => {
  res.locals = { ...res.locals, ...siteData, currentPath: req.path };
  next();
});

// ---- Routes ----
app.get('/', (req, res) => res.render('index', { title: 'Strategic Legal Partners for Growth-Focused Businesses' }));
app.get('/about', (req, res) => res.render('about', { title: 'About — Leadership Team' }));
app.get('/services', (req, res) => res.render('services', { title: 'Services & Engagement Models' }));
app.get('/impact', (req, res) => res.render('impact', { title: 'Proven Results' }));
app.get('/contact', (req, res) => res.render('contact', { title: 'Schedule a Consultation' }));

// Contact form submission
app.post('/contact', (req, res) => {
  const { fname, lname, email, company, interest, message } = req.body;
  // In production: integrate with email service / CRM here
  console.log('Contact form submission:', { fname, lname, email, company, interest });
  res.render('contact', { title: 'Schedule a Consultation', submitted: true });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`\n  ⚖️  Praesentia Legal Solutions running at http://localhost:${PORT}\n`);
});