import type { Cv } from './types'

// The CV shown at /cv (and printed from there). Edit this file to update it.
// Dates: 'YYYY-MM'. end: null means "present". Entries show in the order
// written here, so keep the newest first. Remember to bump `updated`.

export const cv: Cv = {
  name: 'Ricardo Daniel Monteiro Simões',
  headline: 'Senior Software Engineer & Architect',
  location: 'Zurich, Switzerland',
  updated: '2026-11',

  experience: [
    {
      role: 'Senior Software Engineer & Architect',
      org: 'Adnovum AG',
      place: 'Zurich, Switzerland',
      start: '2025-01',
      end: null,
      groups: [
        {
          title: 'Leadership & Enablement',
          points: [
            'Part of the company wide center of excellence for software engineering, focused on the future of the SDLC',
            'Developing AI-SDLC platform for internal teams and customers based on AgentSDK and Temporal',
            'Creation of purpose built Skills and Agents, decreasing time to deployment by 23% in a legacy application migration',
            'Co-Architect & main engineer building internal, agent-native software factory to migrate projects and teams to, using open source & vendor agnostic harness',
            'Coaching of a junior software engineer through a testing pipeline refactor, introducing smart filtering and a dependency tree to reduce average runtime by 28%',
            'Full-cycle solo engineer on a sponsored energy grid research project; all development conducted through LLM agent orchestration, with personal scope spanning requirements engineering, architecture, and delivery',
          ],
        },
        {
          title: 'Architecture & Platform Engineering',
          points: [
            'Zero-downtime split and migration of a global dispatching platform across 10+ domain services, including full environment creation, data duplication with active session preservation, and CDN-based non-disruptive routing',
            'Enabled users to assess cancelation risks and on-site times for deliveries through the implementation of training and inference pipelines with external ML models, allowing for more accurate scheduling.',
            'Software architect for an electric grid optimization project, after internal pitching and external networking. Managing tasks, priorities, staffing of developers and the open-sourced discussion of APIs used for flexibility exchange',
            'Improved documentation reliability by moving technical specs closer to the code, with automated publishing to Confluence via CI/CD',
            'Evaluated offerings of Swiss-based cloud providers for new projects, taking into account staffing constraints, pricing and SLAs, informing vendor selection for upcoming RFPs',
          ],
        }
      ],
    },
    {
      role: 'Professional Software Engineer',
      org: 'Adnovum AG',
      place: 'Zurich, Switzerland',
      start: '2023-07',
      end: '2024-12',
      points: [
        'Designed a transportation management system serving 10′000 deliveries across 21 regions, processing up to 3 million events per day through an event-driven architecture',
        'Developed a system to predict loads, delivery times, truck allocation, and delay risks using real-time vehicle tracking',
        'Resolved critical production OOM incidents leading to container evictions by deep-diving into JVM thread dumps to isolate and fix a >1GB memory leak within the compiler thread',
        'Improved runtime of the transport management system using JMH for the prediction algorithm, optimizing the central scheduling algorithm, reducing time-to-solution by roughly 60%, whilst allowing for region-specific ranking of the solutions',
        'Reduced the average deviation of predictions from 15% down to 7% through region-specific improvements to the algorithm',
        'Technical lead of a dedicated IoT-PaaS team, configured and installed sensors across Switzerland and Germany for the MVP based on silos',
        'Built data pipelines to address immediate customer needs, reducing unnecessary early procurements of material by 52%',
      ],
    },
    {
      role: 'Junior Software Engineer',
      org: 'Adnovum AG',
      place: 'Zurich, Switzerland',
      start: '2022-09',
      end: '2023-06',
      points: [
        'Implemented file upload and verification functionality using apache tika',
        'Diagnosed and resolved user-reported bugs through systematic event reconstruction, including a WebSocket room mapping issue causing missed update notifications',
        'Owned end-to-end delivery of features across frontend and backend, including minor UI work',
      ],
    },
    {
      role: 'Project Manager, Software Developer',
      org: 'Spline AG',
      place: 'Thalwil, Switzerland',
      start: '2016-05',
      end: '2022-08',
      points: [
        'Pitched and developed an HVAC integration, sold over 30 times in its first year',
        'Designed and implemented OSGi-based smart home modules in Java and Lua, including third-party hardware integrations for media control',
        'Designed and built a prototype for indoor navigation using BLE sensors to offer profile based actuation of lights, blinds and media playback',
        'Instructed customers directly on the usage of the system, including questionnaires for feedback on developments and usability',
      ],
    },
  ],

  publications: [
    {
      title: 'Experimental Evaluation of Quantum Machine Learning Algorithms',
      venue: 'IEEE Access',
      year: '2023',
      href: 'https://doi.org/10.1109/ACCESS.2023.3236409',
    },
  ],

  skills: [
    { group: 'Programming languages', core: ['Java', 'SQL'], other: ['JavaScript', 'Python', 'julia'] },
    { group: 'Software engineering', core: ['TDD', 'CI/CD'], other: ['arc42', 'cloud environments', 'requirements engineering'] },
    {
      group: 'Tools',
      core: ['Kubernetes', 'OpenTofu', 'Spring boot', 'git', 'IntelliJ', 'Agent harness: Claude Code, Pi.dev, GitHub Copilot CLI', 'redis'],
      other: ['angular', 'gradle', 'react', 'RabbitMQ', 'spaCy', 'Neo4j', 'JMH', 'jMeter', 'spotless', 'OSGi'],
    },
  ],

  languages: ['English', 'German', 'Portuguese'],

  projects: [
    {
      name: 'Flagforge',
      role: 'Owner, Developer',
      link: { label: 'flagforge.dev', href: 'https://flagforge.dev' },
      description: 'Service offering easy to use mapping functionality across services, for SW-Architects that work in large, distributed enterprise environments.',
    },
    {
      name: 'alexandria',
      role: 'Developer',
      link: { label: 'hephaistos-io/alexandria', href: 'https://github.com/hephaistos-io/alexandria' },
      description: 'OSINT Platform. Self-teaching project for python based data ingestion and categorization. Ingests news articles, conflict and environmental data to generate a global overview, self-recognize emerging events as well as analyzing entities related to articles and visualizing them.',
    },
    {
      name: 'observarium',
      role: 'Developer',
      link: { label: 'hephaistos-io/observarium', href: 'https://github.com/hephaistos-io/observarium' },
      description: 'Exception tracking library for Java that posts directly to GitHub Issues, Jira, GitLab, and Email. Offers ready to use implementations for both Spring boot and quarkus, as well as micrometer API integration.',
    },
    {
      name: 'word-wave',
      role: 'Developer',
      link: { label: 'RicardoMonteiroSimoes/word-wave', href: 'https://github.com/RicardoMonteiroSimoes/word-wave' },
      description: 'Transform function wrapper for UX based animations using words/characters, offered over npm. Written as a standalone Typescript library, framework agnostic.',
    },
    {
      name: 'YogaCharge API',
      role: 'Technical Lead, Maintainer',
      link: { label: 'YogaCharge/yoga-charge-api', href: 'https://github.com/YogaCharge/yoga-charge-api' },
      description: 'Maintain and lead the open sourced repository for the public API defined for the research project YogaCharge. The API deals with the exchange of capacities between optimizing solutions and flexibility aggregators.',
    },
    {
      name: 'Loki',
      role: 'Developer',
      link: { label: 'hephaistos-io/Loki', href: 'https://github.com/hephaistos-io/Loki' },
      description: 'Uses Annotations and Reflection to generate JavaFX GUI elements based on the inherent setup of POJOs, which allow the visualization and manipulation of values.',
    },
  ],

  certificates: [
    { name: 'Certified Professional for Software Architecture - Foundation Level', issuer: 'iSAQB - CPSA-F', date: '2025-07' },
    { name: 'Certified Kubernetes Application Developer', issuer: 'The Linux Foundation - CKAD', date: '2023-12' },
  ],

  education: [
    {
      school: 'ZHAW School of Engineering',
      place: 'Zurich, Switzerland',
      degree: 'BSc ZFH Informatik in Computer Science',
      start: '2019-09',
      end: '2022-07',
      note: 'Cumulative GPA: 5.31 / 6',
    },
    {
      school: 'ABB Technikerschule',
      place: 'Baden, Switzerland',
      degree: 'Dipl. Technician HF Systems Engineering, specialization in building automation',
      start: '2014-09',
      end: '2017-07',
    },
  ],
}
