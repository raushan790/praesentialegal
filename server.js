/**
 * Praesentia Legal Solutions — Express Server
 * Modern, clean, superfast law-firm website
 */
require('./public-sync');
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
    fullName: 'Praesentia Legal LLP',
    tagline: 'Strategic Legal Partners for Growth-Focused Businesses',
    description: 'Embedded fractional General Counsel for founders, executive teams, and growing businesses — bridging the gap between expensive law firms and full-time in-house counsel across the US, India & West Asia.',
    url: 'https://praesentialegal.com',
    email: 'connect@praesentialegal.com',
    linkedin: 'https://www.linkedin.com/company/praesentia-legal/',
    year: new Date().getFullYear(),
    jurisdictions: ['🇺🇸 United States', '🇮🇳 India', '🕌 West Asia (UAE)'],
    web3formsAccessKey: process.env.WEB3FORMS_ACCESS_KEY || '4e64ec06-cf71-48a8-9f95-d467d9ae2e05'
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
    { num: 37, suffix: '+', label: 'Years Combined Experience' },
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
const servicesDetailData = {
  'commercial-contracting': {
    title: 'Commercial Contracting',
    description: 'Strategic contracting support that accelerates business while managing legal and commercial risk.',
    sections: [
      {
        title: 'Contract Coverage',
        items: [
          { label: 'Technology & SaaS', desc: 'SaaS, cloud services, software licensing, subscription agreements, order forms, online terms, clickwrap/browsewrap terms, EULAs, AI and technology agreements.' },
          { label: 'Industrial, Manufacturing & Energy', desc: 'Equipment supply, manufacturing, EPC and industrial services, oil & gas, aviation, infrastructure, and energy sector agreements.' },
          { label: 'Communications, AI & Digital Engagement', desc: 'Agreements for AI-enabled communications, voice automation, telephony and CPaaS platforms, messaging services, contact center technologies, healthcare communications, banking and financial services communications, customer engagement platforms, and other communication technology solutions.' },
          { label: 'Procurement & Vendor Management', desc: 'Supplier, procurement, professional services, outsourcing, managed services, and vendor agreements.' },
          { label: 'Strategic Partnerships', desc: 'Channel, reseller, referral, distribution, co-development, OEM, alliance, and go-to-market agreements.' },
          { label: 'Privacy & Data Protection', desc: 'DPAs, BAAs, HIPAA agreements, data sharing and licensing agreements, NDAs, privacy policies, and related compliance documentation.' },
          { label: 'Corporate & Commercial', desc: 'Term sheets, agency agreements, consulting agreements, leases, website terms, bespoke commercial contracts, and other strategic business agreements.' }
        ]
      },
      {
        title: 'Contracting Capabilities',
        items: [
          { label: 'Contract Lifecycle Management', desc: 'End-to-end support from contract request and drafting through negotiation, execution, renewals, and ongoing contract management.' },
          { label: 'Commercial Negotiation', desc: 'Negotiating legal and commercial terms that balance business objectives, revenue growth, and risk management.' },
          { label: 'Playbooks & Templates', desc: 'Developing clause libraries, negotiation playbooks, templates, and fallback positions to improve consistency and deal velocity.' },
          { label: 'Legal Operations & CLM', desc: 'Optimizing contract review processes, AI-enabled workflows, contract lifecycle management (CLM), and legal operations.' },
          { label: 'Process & Governance', desc: 'Designing scalable contracting frameworks, approval workflows, delegation matrices, and governance processes.' },
          { label: 'Cross-Functional Partnership', desc: 'Supporting Sales, Procurement, Finance, Product, Compliance, and Leadership teams throughout the contracting process.' },
          { label: 'Managed Contracting Services', desc: 'SLA-driven contract support with measurable turnaround times, quality controls, and continuous process improvement.' }
        ]
      }
    ]
  },
  'compliance-governance': {
    title: 'Compliance & Governance',
    description: 'Scalable compliance and governance frameworks that enable growth while managing legal and regulatory risk.',
    sections: [
      {
        title: '',
        items: [
          { label: 'Corporate Policies', desc: 'Corporate policies, employee handbooks, codes of conduct, delegations of authority, compliance manuals, SOPs, governance frameworks, and implementation support.' },
          { label: 'Corporate Compliance & Ethics', desc: 'Anti-bribery and corruption (ABC), anti-fraud, conflicts of interest, gifts and entertainment, whistleblower programs, third-party due diligence, ethics frameworks, and compliance training.' },
          { label: 'Privacy & Data Protection', desc: 'Designing privacy compliance programs, advising on HIPAA, GDPR, DPDP Act, and other global privacy frameworks, and supporting privacy governance and operational compliance.' },
          { label: 'Product & Regulatory Advisory', desc: 'Vendor due diligence, procurement governance, outsourcing compliance, supplier onboarding, supplier codes of conduct, and ongoing contractual and regulatory compliance.' },
          { label: 'Internal Investigations', desc: 'Planning and directing independent workplace and compliance investigations, coordinating with leadership and specialist advisors where required, reporting findings, and supporting remediation and corrective action plans.' }
        ]
      }
    ]
  },
  'employment-hr': {
    title: 'Employment Law & HR Advisory',
    description: 'Practical legal support across the employee lifecycle—from hiring and policy development to workforce restructuring and day-to-day HR advisory.',
    sections: [
      {
        title: '',
        items: [
          { label: 'Employment Contracts & Compensation', desc: 'Drafting and negotiating employment agreements, executive contracts, offer letters, confidentiality and IP assignment agreements, incentive plans, and separation arrangements.' },
          { label: 'HR Policies & Compliance', desc: 'Developing employee handbooks, workplace policies, codes of conduct, disciplinary frameworks, and multi-jurisdiction employment compliance programs.' },
          { label: 'Workforce Advisory', desc: 'Advising on hiring, performance management, disciplinary actions, workplace investigations, employee grievances, restructurings, redundancies, terminations, and separation agreements.' },
          { label: 'Global Workforce', desc: 'Structuring compliant international employment, contractor, consultant, and Employer of Record (EOR) arrangements across jurisdictions.' },
          { label: 'Strategic HR Support', desc: 'Providing ongoing legal guidance to leadership and HR teams on day-to-day employment issues, labor law compliance, and people-related legal risks.' }
        ]
      }
    ]
  },
  'legal-tech-ops': {
    title: 'Legal Tech & Operations',
    description: 'Optimizing processes, deploying next-gen AI tools, and building scalable legal operations to drive efficiency and velocity.',
    sections: [
      {
        title: '',
        items: [
          { label: 'Legal Tech Strategy & Assessment', desc: 'Reviewing existing workflows, identifying bottlenecks, and defining a practical legal technology roadmap.' },
          { label: 'CLM & Automation', desc: 'Implementing Contract Lifecycle Management (CLM) systems, automating routine document drafting, and setting up clean approvals.' },
          { label: 'AI Implementation', desc: 'Leveraging modern AI and LLM tools for contract reviews, clause analytics, and automated compliance checks.' },
          { label: 'Legal Ops Reporting', desc: 'Designing dashboards, establishing key metrics, and reporting on legal spend, turnaround times, and contract volumes.' }
        ]
      }
    ]
  },
  'dispute-management': {
    title: 'Commercial Dispute Management',
    description: 'We help businesses manage commercial disputes strategically—minimizing legal risk, preserving business relationships where possible, and coordinating with specialist counsel to achieve commercially effective outcomes.',
    sections: [
      {
        title: '',
        items: [
          { label: 'Dispute Strategy & Risk Assessment', desc: 'Evaluating claims, assessing legal and commercial risks, and developing practical dispute resolution strategies.' },
          { label: 'Negotiation & Early Resolution', desc: 'Leading pre-litigation negotiations, settlement discussions, and mediation efforts to resolve disputes efficiently and preserve commercial relationships.' },
          { label: 'Internal Investigations', desc: 'Advising on workplace investigations, whistleblower complaints, regulatory inquiries, and other sensitive internal matters.' },
          { label: 'Arbitration & Litigation Management', desc: 'Acting as your in-house legal partner by coordinating with external counsel, managing legal workstreams, supporting case strategy, and overseeing disputes through arbitration, litigation, or settlement.' }
        ]
      }
    ]
  },
  'fundraising-ma': {
    title: 'Fundraising & M&A Support',
    description: 'Comprehensive support through fundraising rounds, mergers and acquisitions, and cross-border transactions.',
    sections: [
      {
        title: 'Mergers & Acquisitions',
        items: [
          { label: 'Transaction Structuring', desc: 'Advising on the legal framework and commercial structure for mergers, acquisitions, strategic investments, restructurings, and asset purchases.' },
          { label: 'Due Diligence & Risk Assessment', desc: 'Identifying legal and commercial risks, coordinating due diligence, and supporting informed decision-making.' },
          { label: 'Transaction Management', desc: 'Acting as your in-house legal partner to oversee the transaction process, coordinate with leadership, financial advisors, specialist counsel, and external law firms, and drive transactions through signing and closing.' },
          { label: 'Negotiation & Execution', desc: 'Supporting the negotiation of key commercial terms and definitive transaction documents to achieve commercially sound outcomes.' }
        ]
      },
      {
        title: 'Fundraising',
        items: [
          { label: 'Fundraising Strategy', desc: 'Providing legal oversight throughout the fundraising process, from initial discussions to closing.' },
          { label: 'Term Sheets & Transaction Documents', desc: 'Reviewing and negotiating term sheets and other key investment documents.' },
          { label: 'Due Diligence', desc: 'Managing the legal due diligence process and preparing your business for investor review.' },
          { label: 'Transaction Coordination', desc: 'Working closely with founders, leadership teams, investors, specialist counsel, and external law firms to keep the fundraising process efficient and on track.' }
        ]
      }
    ]
  },
  'ip-portfolio': {
    title: 'IP Portfolio Management',
    description: 'We help businesses identify, protect, and strategically manage their intellectual property assets, coordinating with specialist IP counsel where required to build and maintain a strong, commercially valuable IP portfolio.',
    sections: [
      {
        title: '',
        items: [
          { label: 'IP Identification & Strategy', desc: 'Identifying protectable trademarks, copyrights, patents, trade secrets, and other intellectual property aligned with your business and product strategy.' },
          { label: 'Registration Management', desc: 'Managing the trademark, copyright, and patent registration process, including coordinating searches, filings, responses, and registrations with specialist IP counsel and filing agents.' },
          { label: 'Portfolio Management', desc: 'Maintaining and managing your IP portfolio across jurisdictions, including renewals, ownership records, assignments, and licensing support.' },
          { label: 'Commercialization & Protection', desc: 'Advising on the ownership, licensing, commercialization, and protection of intellectual property throughout its lifecycle.' },
          { label: 'IP Risk & Enforcement Support', desc: 'Supporting infringement assessments, enforcement strategies, and coordination with specialist counsel for disputes, oppositions, and litigation where required.' }
        ]
      }
    ]
  },
  'legal-recruitment': {
    title: 'Legal Recruitment',
    description: 'Unlike traditional recruitment firms that primarily source and refer candidates, we partner with you to build your in-house legal team with the judgment and rigor of an experienced General Counsel—identifying, evaluating, and selecting lawyers who are the right fit for your business.',
    sections: [
      {
        title: '',
        items: [
          { label: 'Role Design', desc: "Defining legal roles, responsibilities, and job descriptions based on your organization's needs and growth plans." },
          { label: 'Talent Identification', desc: 'Leveraging our curated network of accomplished legal professionals to identify and shortlist high-quality candidates.' },
          { label: 'Candidate Assessment', desc: 'Conducting interviews and evaluating legal expertise, commercial judgment, leadership potential, and cultural fit through structured assessments and practical evaluations, where appropriate.' },
          { label: 'Hiring Recommendations', desc: 'Providing detailed interview feedback, candidate evaluations, and hiring recommendations to support confident hiring decisions.' },
          { label: 'Onboarding Support', desc: 'Assisting with offer discussions, onboarding, and the successful integration of new legal hires into your organization.' }
        ]
      }
    ]
  }
};

app.get('/services', (req, res) => res.render('services', { title: 'Services & Engagement Models' }));

app.get('/services/:serviceId', (req, res) => {
  const service = servicesDetailData[req.params.serviceId];
  if (!service) {
    return res.status(404).render('404', { title: 'Page Not Found' });
  }
  res.render('service-detail', { title: service.title, service: service });
});
app.get('/impact', (req, res) => res.render('impact', { title: 'Proven Results' }));
app.get('/terms', (req, res) => res.render('terms', { title: 'Website Terms of Use' }));
app.get('/privacy', (req, res) => res.render('privacy', { title: 'Privacy & Cookie Policy' }));
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Schedule a Consultation',
    submitted: req.query.submitted === 'true'
  });
});

// Contact form submission
app.post('/contact', (req, res) => {
  const { fname, lname, email, company, message } = req.body;
  // In production: integrate with email service / CRM here
  console.log('Contact form submission:', { fname, lname, email, company, message });
  res.render('contact', { title: 'Schedule a Consultation', submitted: true });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`\n  ⚖️  Praesentia Legal Solutions running at http://localhost:${PORT}\n`);
});