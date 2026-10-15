// Facts reconciled with Master_Resume.docx, October 2026.
export const person = {
  name: 'Ifthekhar Enad Mahamood', email: 'enadmahamood123@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ifthekhar-pm',
  resume: '/Ifthekhar_Enad_Mahamood_Resume.docx',
};
export const outcomes = [
  { value: 5, suffix: 'M+', decimals: 1, label: 'Time Warp Scan', metric: 'Downloads', spoken: 'Over 5 million Time Warp Scan downloads' },
  { value: 4.4, suffix: '★', decimals: 1, label: 'Beauty Editor: Photo Retouch', metric: 'Reviews', spoken: '4.4 star rating for Beauty Editor Photo Retouch' },
  { value: 100, suffix: 'K+', label: 'Beauty Editor: Photo Retouch', metric: 'Downloads', spoken: 'Over 100 thousand Beauty Editor Photo Retouch downloads' },
];
// `image` files live in public/images/, 4:3. Give each one an `imageAlt`
// describing what the picture actually shows, for screen readers.
export const stories = [
  {
    id: 'timewarp', title: 'Time Warp Scan', category: 'Consumer mobile', company: 'Kite Games Studio',
    image: '/images/time-warp-scan.png',
    imageAlt: 'The Time Warp Scan capture screen on a phone, with the scan line sweeping across a portrait, horizontal and vertical options, and the app’s 23.7K reviews and 5M+ downloads.',
    heading: 'Simpler tools. More room to create.',
    summary: 'Focused the app on two effects and rebuilt a single shoot, edit, and export flow in a category that kept adding filters.',
    result: '5M+ downloads', focus: 'Product focus · User journeys · Cross-functional delivery',
    link: 'https://play.google.com/store/apps/details?id=com.kgs.timewarpscan',
    context: 'Time Warp Scan is a camera and video effects app published by Kite Games Studio. I managed it during my April–December 2024 product management role.',
    sections: [
      ['The product choice', 'While the category kept adding filters, I cut the app to two effects and rebuilt the journey into a single shoot, edit, and export flow.'],
      ['Working with engineering', 'When a design dispute emerged, I asked which elements were expensive rather than defending the specification. We removed two costly animations that carried no measurable value.'],
      ['The outcome', 'When I left in December 2024, the app had 5M+ downloads, a 4.0 rating and 23,600+ reviews.'],
    ],
  },
  {
    id: 'beauty', title: 'Beauty Editor', category: 'Consumer mobile', company: 'Kite Games Studio',
    image: '/images/beauty-editor.png',
    imageAlt: 'The Beauty Editor retouch screen on a phone, with a before and after split of a portrait, a skin smoothing slider, and the app’s 4.4 star rating and 100K+ downloads.',
    heading: 'A better first-time experience.',
    summary: 'Rebuilt onboarding and UI to make the first experience simpler, then used a post-launch analytics loop to guide growth.',
    result: '+21% core retention', focus: 'Onboarding · Prioritization · Product analytics',
    link: 'https://play.google.com/store/apps/details?id=com.app.beautyeditor',
    context: 'At Kite Games Studio, I owned consumer camera and photo apps with a team of 10+ engineers, QA specialists, and designers.',
    sections: [
      ['The work', 'I led a full revamp of Beauty Editor’s onboarding and UI. My responsibility spanned product priorities, cross-functional delivery, and evaluating the experience after launch.'],
      ['The decision', 'I treated the first-time journey as a product problem. The revamp brought onboarding and UI into the same effort, followed by App Store optimization and an analytics loop to guide improvements.'],
      ['The outcome', 'Core retention improved 21% and engagement increased 24%. Downloads grew 23% in three months. These outcomes are reported in my resume.'],
    ],
  },
  {
    id: 'shuttle', title: 'Shuttle Partner App', category: 'Mobility marketplace', company: 'Shuttle',
    image: '/images/shuttle-partner-app.png',
    imageAlt: 'The Shuttle Partner driver app on a phone, showing a map of routes with weekly earnings, a prompt to complete profile registration, and the app’s 4.3 rating and 1K+ downloads.',
    heading: 'Less friction for drivers.',
    summary: 'Driver interviews exposed where manual signup broke down. A self-serve registration flow helped reduce onboarding cost.',
    result: '40% lower onboarding cost', focus: 'User discovery · MVP delivery · Marketplace operations',
    link: 'https://play.google.com/store/apps/details?id=com.easytransport.shuttle.driver',
    context: 'As Product Owner for Shuttle’s Partner App and internal Partner ERP, I led five engineers and a QA specialist, working with drivers, operations, and finance.',
    sections: [
      ['Understand the problem', 'Driver interviews revealed failures in the manual signup process. I used those findings to scope a self-serve registration flow.'],
      ['Make the work easier', 'The registration flow lowered onboarding cost by 40%. Separately, I shipped Driver Earnings, where drivers tracked and received their trip income. After regional rollout, payment processing was 50% faster and driver engagement tripled.'],
      ['Connect the systems', 'For Partner ERP, I documented manual processes and gathered driver, operations, and finance requirements. Automating weekly bill disbursement and vehicle requests raised throughput 20% and removed 50% of the paperwork.'],
    ],
  },
];
// One timeline, newest first. University roles are merged in by date rather than
// living in a separate "learning in practice" block. `projects` tags each role with
// the work shown elsewhere on the page, so a reader can connect company to project.
export const career = [
  {
    company: 'Lamar University', url: 'https://www.lamar.edu/', role: 'Graduate Assistant, SAP Help Desk',
    period: 'Sep 2026 - Present', status: 'Current', location: 'Beaumont, Texas',
    blurb: 'College of Business SAP lab supporting students and faculty across enterprise systems and predictive analytics coursework.',
    points: [
      'Train students and faculty on SAP GUI, SAP ERP modules (MM, SD, PS), and SAP Analytics Cloud, diagnosing configuration errors and validating end-to-end project workflows before submission.',
      'Maintain SAP user documentation and license configurations with faculty coordinators, and deliver software demonstrations for enterprise systems and predictive analytics courses.',
    ],
  },
  {
    company: 'Lamar University', url: 'https://www.lamar.edu/', role: 'IT Student Assistant',
    period: 'Feb 2025 - May 2026', location: 'Beaumont, Texas',
    points: [
      'Handled first-line identity, access, and connectivity issue resolution for students, faculty, and staff, explaining each fix to non-technical users.',
    ],
  },
  {
    company: 'Kite Games Studio', url: 'https://www.kitegamesstudio.com/', role: 'Product Manager',
    period: 'Apr 2024 - Dec 2024', location: 'Dhaka, Bangladesh',
    blurb: 'Mobile studio publishing consumer camera and photo apps across the US, UK, and Japan. Owned two apps end to end with a cross-functional team of 10+ engineers, QA specialists, and designers.',
    projects: ['Time Warp Scan', 'Beauty Editor'],
    points: [
      'Grew Time Warp Scan to 5M+ downloads and a 4.0 rating across 23,600+ reviews by cutting the app to two effects against a category adding filters, and rebuilding the journey into one shoot, edit, and export flow.',
      'Lifted core retention 21% and engagement 24% on Beauty Editor through a full revamp of onboarding and UI, then raised downloads 23% in three months through ASO and a post-launch analytics loop.',
      'Increased customer acquisition 10% across the US, UK, and Japan by pairing App Store optimization with product changes drawn from competitor teardowns and user research.',
      'Settled a design dispute with engineering by asking which elements were expensive rather than defending the spec, cutting two costly animations that carried no measurable value.',
    ],
  },
  {
    company: 'Fashol', url: 'https://fashol.com/', role: 'Product Manager',
    period: 'Oct 2023 - Feb 2024', location: 'Dhaka, Bangladesh',
    blurb: 'Agriculture marketplace sourcing from farmers and supplying B2B retail chains. Product manager across four products with a five-person engineering and QA team.',
    projects: ['Supplier products', 'Smart Shelf'],
    points: [
      'Owned the supplier ERP panel for farmer inventory and pricing, specified a supplier and reseller Android app and drove it to test phase, and ran two B2C retail pilots whose operating data decided whether the model could scale.',
      'Defined Smart Shelf, a zero-to-one automated retail concept, writing the specification and running buyer field research, then presenting the business case to senior management and Singapore-based investors.',
    ],
  },
  {
    company: 'Shuttle', url: 'https://www.shuttlebd.com/', role: 'Product Specialist',
    period: 'Jun 2022 - Sep 2023', location: 'Dhaka, Bangladesh',
    promotedFrom: 'Promoted from Management Trainee',
    blurb: 'Ride-sharing and commuter shuttle platform in Dhaka. Product Owner for the Partner App, the internal Partner ERP, and the acquisition systems for both sides of the marketplace, leading five engineers and a QA specialist.',
    projects: ['Shuttle Partner App', 'Partner ERP', 'Driverkoi'],
    points: [
      'Cut driver onboarding cost 40% by shipping a self-serve registration flow, scoped after driver interviews exposed where the manual signup process broke down.',
      'Shipped Driver Earnings, the payouts surface where drivers tracked and received trip income, cutting payment processing time 50% and tripling driver engagement after regional rollout.',
      'Designed the Partner ERP to automate weekly bill disbursement and vehicle requests after documenting the manual process and gathering requirements from driver, operations, and finance stakeholders, raising throughput 20% and removing 50% of the paperwork.',
      'Owned Jatrikoi and Driverkoi as product owner, the customer and driver acquisition systems, building both with the design and engineering teams; Jatrikoi lifted lead generation 20% and team efficiency 15%.',
      'Shipped the rebranded Home and Business pages and phase one of the Partners page on the company website, and integrated Google Analytics, Clarity, and Meta Pixel with marketing to track the user journey.',
    ],
  },
  {
    company: 'Shuttle', url: 'https://www.shuttlebd.com/', role: 'Management Trainee',
    period: 'Jun 2021 - Jun 2022', location: 'Dhaka, Bangladesh',
    blurb: 'Joined the commuter shuttle platform as a management trainee, learning the operations the product team would later automate.',
    projects: ['Jatrikoi', 'Shuttle Website', 'Internal Reporting Panel'],
    points: [
      'Worked alongside driver, operations, and finance teams on the day-to-day running of the marketplace, building the process knowledge that shaped the Partner App and Partner ERP after promotion to Product Specialist.',
    ],
  },
  {
    company: 'ACI Motors Ltd', url: 'https://acimotors-bd.com/', role: 'Network Development Intern',
    period: 'Jan 2021 - Apr 2021', location: 'Dhaka, Bangladesh',
    points: [
      'Streamlined payment tracking in Distributors Network, reducing manual efforts and easing product resale.',
      "Contributed to Foton Motors’ Network Development at ACI Motors, the exclusive distributor for FOTON Motor Group.",
    ],
  },
];

export const additionalProjects = [
  {
    id:'erp', icon:'systems', title:'Partner ERP', category:'Enterprise systems', company:'Shuttle', status:'Shipped',
    summary:'Automated weekly bill disbursement and vehicle requests after mapping the manual process with drivers, operations, and finance.',
    result:'20% higher throughput', context:'An internal fleet and billing system designed around the people running Shuttle’s daily operations.',
    sections:[['Start with the process','I documented the manual process and gathered requirements from driver, operations, and finance stakeholders.'],['Connect the workflow','The Partner ERP automated weekly bill disbursement and vehicle requests.'],['The outcome','Operations throughput increased 20%, and 50% of the paperwork was removed.']],
  },
  {
    id:'acquisition', icon:'growth', title:'Jatrikoi & Driverkoi', category:'Marketplace acquisition', company:'Shuttle', status:'Shipped',
    summary:'Owned the customer and driver acquisition systems, working with design and engineering to connect lead capture, funnels, and service.',
    result:'20% more leads through Jatrikoi', context:'Product Owner for both sides of the marketplace’s acquisition systems.',
    sections:[['Two sides of the marketplace','Jatrikoi supported customer acquisition, while Driverkoi supported driver acquisition. I built both with the design and engineering teams.'],['The outcome','Jatrikoi improved lead generation 20% and team efficiency 15%.'],['Related work','I also shipped rebranded website pages and worked with marketing to integrate Google Analytics, Clarity, and Meta Pixel for user-journey tracking.']],
  },
  {
    id:'supplier', icon:'systems', title:'Supplier products', category:'Agriculture B2B', company:'Fashol', status:'ERP panel · App test phase',
    summary:'Owned the supplier ERP panel for farmer inventory and pricing, and specified a supplier and reseller Android app taken to test phase.',
    result:'Inventory, pricing & supplier workflows', context:'Fashol sourced produce from farmers and supplied B2B retail chains. I worked across four products with a five-person engineering and QA team.',
    sections:[['The supplier workflow','I owned the ERP panel that handled farmer inventory and pricing.'],['A mobile extension','I specified a supplier and reseller Android app and drove it to test phase.'],['Learn from operations','I also ran two B2C retail pilots whose operating data helped decide whether the model could scale.']],
  },
  {
    id:'shelf', icon:'concept', title:'Smart Shelf', category:'Retail concept', company:'Fashol', status:'Concept & business case',
    summary:'Defined an automated retail concept through buyer field research, specifications, and a business case for management and investors.',
    result:'From buyer research to business case', context:'A zero-to-one automated retail concept at Fashol. Its concept definition is distinct from the company’s separate B2C pilots.',
    sections:[['Understand the buyer','I ran buyer field research to inform the concept.'],['Define the product','I wrote the specification for Smart Shelf and prepared its business case.'],['Align stakeholders','I presented the case to senior management and Singapore-based investors. This work covered concept research, specifications, and the business case.']],
  },
  {
    id:'finance', icon:'finance', title:'Personal Finance Web App', category:'Independent project', company:'Self-directed', status:'In progress',
    summary:'Building a browser-first, offline-capable budgeting app solo, from the data model through the interface.',
    result:'A different way to explain overspending', context:'An independent budgeting and money-management web app being built with an AI coding agent.',
    sections:[['Build end to end','I am building the data model and UI for a browser-first app that works offline.'],['The product decision','I replaced deficit framing in overspending reports with goal-delay framing. The report explains how much later a goal arrives rather than how much money was lost.'],['Current status','The app is in progress.']],
  },
  {
    id:'analysis', icon:'growth', title:'Customer Purchase Analysis', category:'Data & analytics', company:'Lamar University', status:'Completed university project',
    link:'https://github.com/enadmahamood123-boop/Customer_Purchase_Behavior_Analysis', linkLabel:'View the project on GitHub',
    summary:'Explored customer segments, product performance, spending, and subscription trends using Python and SQL.',
    result:'Analysis → Power BI dashboard', context:'A customer purchase behavior analysis completed at Lamar University.',
    sections:[['Explore the data','I analyzed spending patterns, customer segments, product performance, and subscription trends with Python and SQL.'],['Make the findings usable','I built a Power BI dashboard and a written report from the findings.']],
  },
];

export const education = [
  { degree:'MS in Management Information Systems', school:'Lamar University', url:'https://www.lamar.edu/', location:'Beaumont, Texas, USA', period:'Jan 2025 – Dec 2026 (Expected)', gpa:'3.88 / 4.00', current:true },
  { degree:'BBA in Management Studies', school:'Bangladesh University of Professionals', url:'https://bup.edu.bd/department_home/10', location:'Dhaka, Bangladesh', period:'Jan 2017 – May 2021', gpa:'3.43 / 4.00' },
];
export const certifications = [
  {title:'Exploring Planning Processes in SAP IBP',issuer:'SAP',date:'September 2026',url:'https://badger.learning.sap.com/verify/xopak-sesuh-tunyh-sykug-dogif'},
  {title:'Exploring SAP Analytics Cloud',issuer:'SAP',date:'October 2025',url:'https://badger.learning.sap.com/verify/xobor-pilyl-gydyr-kabop-nenik'},
  {title:'Digital Product Management',issuer:'Bohubrihi',date:'March 2024',url:'https://res.cloudinary.com/bohubrihi/image/upload/v1710181188/production/65ef4b4070ba638bb613ff34.pdf',skills:['Product Strategy','Product Management','Product Development','Product Launch Planning','Software Development Methodologies','Hypothesis Testing','Post launch']},
];
export const awards = [
  {title:'In-State Tuition Waiver',context:'Lamar University · All four semesters'},
  {title:'College of Business Graduate Scholarship',context:'Lamar University · All four semesters'},
  {title:'Janie and Mark Steinhagen Scholarship in Business',context:'Lamar University'},
];
// Personal interests supplied by the user on October 14, 2026.
export const hobbies = ['Books','Photography','Travelling','Soccer','Camping','Cycling'];
