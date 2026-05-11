export interface MindMapNode {
  id: string;
  label: string;       // short SVG label (3 words max)
  description: string;
  importance: string;
  children?: MindMapNode[];
}

export interface MindMapDef {
  id: string;
  name: string;
  tagline: string;
  primaryColor: string;
  root: MindMapNode;
}

export const mindMaps: MindMapDef[] = [
  // EU AI ACT
  {
    id: 'eu_ai_act',
    name: 'EU AI Act',
    tagline: "World's first comprehensive AI regulation. Reg. (EU) 2024/1689",
    primaryColor: '#3b82f6',
    root: {
      id: 'eua_root',
      label: 'EU AI Act',
      description:
        'Regulation (EU) 2024/1689, in force since August 2024. The world\'s first comprehensive legal framework governing AI systems from design through deployment.',
      importance:
        'Sets the global benchmark for AI governance. Any organisation placing AI on the EU market must comply, regardless of where it is based. ISO 42001 certification is increasingly accepted as supporting evidence of compliance readiness.',
      children: [
        {
          id: 'eua_risk',
          label: 'Risk Tiers',
          description:
            'The Act classifies every AI system into one of four risk levels, each carrying different compliance obligations.',
          importance:
            'The tier your system lands in determines every obligation that follows. Getting classification wrong is the root of most compliance failures. Most organisations underclassify, not overclassify.',
          children: [
            {
              id: 'eua_unacceptable',
              label: 'Unacceptable Risk',
              description:
                'A small set of AI applications are outright banned from the EU: social scoring by public bodies, real-time remote biometric ID in public spaces, systems that exploit psychological vulnerabilities, and untargeted facial-image scraping.',
              importance:
                'Fines reach 35 million euros or 7% of global annual turnover. These prohibitions applied from February 2025. There is no grace period and no transitional arrangement.',
            },
            {
              id: 'eua_high',
              label: 'High Risk',
              description:
                'AI used in critical infrastructure, education, employment, essential services, law enforcement, migration, and justice falls here. Subject to mandatory risk management, documentation, human oversight, and conformity assessment before market deployment.',
              importance:
                'Most enterprise AI systems land in this tier. Non-compliance blocks market access and draws fines up to 15 million euros or 3% of global turnover. Systems already deployed before August 2026 get until August 2027 under the transitional provision.',
            },
            {
              id: 'eua_limited',
              label: 'Limited Risk',
              description:
                'Chatbots and deepfake generators face transparency obligations. Users must be clearly informed they are interacting with AI or viewing synthetic content.',
              importance:
                'Often overlooked. Failing to disclose AI interaction in a consumer product can trigger enforcement even for otherwise low-risk systems.',
            },
            {
              id: 'eua_minimal',
              label: 'Minimal Risk',
              description:
                'The vast majority of AI systems, including spam filters, recommendation engines, and AI in games, have no mandatory requirements. Voluntary codes of conduct are encouraged.',
              importance:
                'No legal obligations, but document your risk classification. Regulators may ask you to justify why your system is not in a higher tier.',
            },
          ],
        },
        {
          id: 'eua_prohibited',
          label: 'Prohibited Practices',
          description:
            'Article 5 bans six categories of AI outright, enforceable across the EU since 2 February 2025.',
          importance:
            'These are the EU\'s non-negotiable red lines. No business justification or safeguard can make a prohibited system lawful.',
          children: [
            {
              id: 'eua_social',
              label: 'Social Scoring',
              description:
                'AI systems used by public authorities to evaluate citizens based on social behaviour and then apply detrimental treatment in unrelated contexts.',
              importance:
                'A direct prohibition on state surveillance overreach. The ban extends to systems that aggregate social scores across multiple domains of life.',
            },
            {
              id: 'eua_biometric',
              label: 'Remote Biometrics',
              description:
                'Real-time remote biometric identification in publicly accessible spaces by law enforcement, with narrow judicially authorised exceptions for serious crime.',
              importance:
                'Balances security against mass-surveillance risk. The exceptions are intentionally tight and deployers must seek prior judicial authorisation.',
            },
            {
              id: 'eua_manip',
              label: 'Manipulative AI',
              description:
                'AI that uses subliminal techniques or exploits psychological or physical vulnerabilities to distort behaviour in ways harmful to users or third parties.',
              importance:
                'Addresses dark-pattern AI design. Systems built to bypass rational agency, however commercially effective, are illegal in the EU.',
            },
            {
              id: 'eua_emotion',
              label: 'Emotion Recognition',
              description:
                'AI that infers the emotional state of individuals in workplace or educational settings. Banned due to discrimination risk and lack of scientific reliability.',
              importance:
                'Protects workers and students from invasive monitoring. Products that claim to measure engagement or stress via facial analysis are in scope.',
            },
          ],
        },
        {
          id: 'eua_duties',
          label: 'High-Risk Duties',
          description:
            'Mandatory obligations for providers and deployers of high-risk AI systems under Articles 8 to 29. ISO 42001 Annex A6 (System Lifecycle) maps directly onto these requirements.',
          importance:
            'These are the operational compliance requirements. Failing to meet them prevents lawful market placement and exposes you to market-surveillance action.',
          children: [
            {
              id: 'eua_riskmgmt',
              label: 'Risk Management',
              description:
                'Providers must establish, implement, document, and continuously maintain a risk management system throughout the AI lifecycle (Art. 9). It must identify, analyse, and evaluate known and foreseeable risks.',
              importance:
                'This is an ongoing iterative process, not a one-time exercise. Regulators expect evidence of the system evolving as the AI is updated or deployed in new contexts. ISO 42001 Clause 6 risk assessment should be run in parallel to avoid duplicating effort.',
            },
            {
              id: 'eua_docs',
              label: 'Technical Docs',
              description:
                'Comprehensive documentation of design, capabilities, limitations, training data, testing methodology, and performance metrics is required before market placement (Art. 11, Annex IV).',
              importance:
                'The foundation for conformity assessment and post-market surveillance. Incomplete or retrospective documentation is among the most common audit findings.',
            },
            {
              id: 'eua_oversight',
              label: 'Human Oversight',
              description:
                'High-risk systems must be designed so humans can meaningfully monitor, understand, intervene, and halt the system, including overriding its output (Art. 14). This provision directly overlaps with GDPR Art. 22, which gives individuals the right to demand human review of automated decisions.',
              importance:
                'Run your EU AI Act human-oversight design work and your GDPR Art. 22 review-mechanism design as a single exercise. Separate workstreams produce duplicated documentation and inconsistent controls.',
            },
            {
              id: 'eua_conform',
              label: 'Conformity Assessment',
              description:
                'Most high-risk systems require a documented self-assessment against harmonised standards. Biometric and critical-infrastructure AI must undergo third-party audit.',
              importance:
                'The CE-marking equivalent for AI. ISO 42001 certification, while not a legal substitute for conformity assessment, provides structured audit evidence that significantly reduces the effort required to complete one.',
            },
          ],
        },
        {
          id: 'eua_gpai',
          label: 'GPAI Models',
          description:
            'Articles 51 to 63 govern General Purpose AI models such as large language models, regardless of their downstream use. Applies from August 2025.',
          importance:
            'Captures foundation models that underpin countless downstream applications. A globally watched regulatory category with no equivalent outside the EU.',
          children: [
            {
              id: 'eua_gpai_trans',
              label: 'Transparency',
              description:
                'GPAI providers must publish technical documentation, model cards, and summaries of training data, including disclosure of any copyright-protected content used.',
              importance:
                'Enables downstream providers to understand what they are building on and fulfil their own AI Act obligations. Incomplete disclosure is a direct violation.',
            },
            {
              id: 'eua_systemic',
              label: 'Systemic Risk',
              description:
                'Models trained with more than 10 to the power of 25 FLOPs are presumed to pose systemic risk. They face additional duties including red-teaming, incident reporting to the EU AI Office, and cybersecurity measures.',
              importance:
                'Targets frontier models such as GPT-4-class systems. The compute threshold is a regulatory proxy for capability and is expected to tighten as hardware improves.',
            },
            {
              id: 'eua_copyright',
              label: 'Copyright Rules',
              description:
                'GPAI providers must comply with EU copyright law and respect text-and-data mining opt-outs. Summaries of training content must be published and kept current.',
              importance:
                'Directly intersects with IP liability. Scraping opt-out content for training exposes providers to copyright infringement claims on top of AI Act penalties.',
            },
          ],
        },
        {
          id: 'eua_gov',
          label: 'Governance',
          description:
            'The enforcement and oversight architecture created by Articles 64 to 88.',
          importance:
            'Understanding who enforces the Act, and through which channels, is essential for compliance strategy and incident response planning.',
          children: [
            {
              id: 'eua_office',
              label: 'EU AI Office',
              description:
                'New EU body within the European Commission responsible for GPAI model oversight, developing codes of practice, and cross-border enforcement coordination.',
              importance:
                'Your primary regulatory counterpart for GPAI. It authors the rules, convenes stakeholders, and will be first to act on systemic-risk model violations.',
            },
            {
              id: 'eua_national',
              label: 'National Authorities',
              description:
                'Each Member State designates a competent national authority for market surveillance and enforcement of all non-GPAI provisions.',
              importance:
                'Enforcement varies by country. Where you establish your EU entity determines which national authority is your lead supervisor.',
            },
            {
              id: 'eua_db',
              label: 'EU AI Database',
              description:
                'A public EU register in which providers must register high-risk AI systems before deployment. Creates market transparency and a public audit trail.',
              importance:
                'Unregistered deployment of a high-risk system is non-compliant from day one. Registration is a prerequisite, not an afterthought.',
            },
            {
              id: 'eua_enforce',
              label: 'Penalty Reality',
              description:
                'The fines cited in the Act are statutory maximums, not defaults. Supervisory authorities apply graduated penalties based on organisational size, intent, degree of cooperation, and whether harm actually occurred. First-time violations with prompt remediation at smaller organisations receive a fraction of the headline figure.',
              importance:
                'Understanding this calibrates your risk appetite correctly. The penalty structure is not a flat tax on non-compliance. Good-faith effort, documented remediation, and transparency with the regulator all materially reduce exposure.',
            },
          ],
        },
        {
          id: 'eua_time',
          label: 'Key Timelines',
          description:
            'The Act applies in stages. Missing a deadline is not a technicality. It triggers immediate non-compliance.',
          importance:
            'Phased application allows preparation time, but each date is a hard legal boundary. Compliance programmes must be sequenced accordingly.',
          children: [
            {
              id: 'eua_feb25',
              label: 'Feb 2025',
              description:
                'Prohibited AI practices (Article 5) become enforceable. Social scoring, real-time biometrics, manipulative AI, and emotion recognition in workplaces and schools must be removed from the EU market.',
              importance:
                'The first hard deadline. Any product or internal system covered by Article 5 that was not remediated by this date is currently in breach.',
            },
            {
              id: 'eua_aug25',
              label: 'Aug 2025',
              description:
                'GPAI model rules (Articles 51 to 63) and governance provisions apply. The EU AI Office is operational and codes of practice for GPAI enter their binding phase.',
              importance:
                'Critical for all foundation-model providers and any organisation building products on top of third-party GPAI APIs.',
            },
            {
              id: 'eua_aug26',
              label: 'Aug 2026',
              description:
                'Full application of the Act for most high-risk AI systems, transparency obligations, and general provisions. This is the primary enterprise compliance deadline for newly deployed systems.',
              importance:
                'Risk management systems, technical documentation, human-oversight measures, and conformity assessments must all be in place before this date for any system newly placed on the market.',
            },
            {
              id: 'eua_aug27',
              label: 'Aug 2027',
              description:
                'Transitional deadline for high-risk AI systems that were already placed on the market or put into service before August 2026. These legacy systems must achieve full compliance by this date.',
              importance:
                'This provision catches organisations who assumed their pre-existing product was grandfathered. If your AI system was live before August 2026, you still have a firm compliance deadline one year later. Start your gap assessment now.',
            },
          ],
        },
      ],
    },
  },

  // GDPR
  {
    id: 'gdpr',
    name: 'GDPR',
    tagline: 'Foundation of data protection law. Reg. (EU) 2016/679',
    primaryColor: '#10b981',
    root: {
      id: 'gdpr_root',
      label: 'GDPR',
      description:
        'Regulation (EU) 2016/679 (the General Data Protection Regulation), in force since 25 May 2018. The most influential data privacy law globally, with extra-territorial reach.',
      importance:
        'Applies to any organisation processing data of EU residents, wherever the organisation is based. Maximum fine: 20 million euros or 4% of global annual turnover. Fines are maximums, not defaults. Cooperation, prompt remediation, and documented good-faith effort all reduce exposure significantly.',
      children: [
        {
          id: 'gdpr_principles',
          label: 'Core Principles',
          description:
            'Article 5 establishes seven principles that govern every processing activity. All other GDPR obligations flow from these.',
          importance:
            'Regulators audit against these principles first. Every processing activity, including AI training and inference, must be justifiable under each of them.',
          children: [
            {
              id: 'gdpr_lawful',
              label: 'Lawfulness & Fairness',
              description:
                'Processing must have a legal basis and must not deceive or harm data subjects. Transparency about how, why, and for how long data is used is required.',
              importance:
                'Lawfulness catches processing without a valid basis. Fairness is the catch-all for ethically questionable but technically legal practices, a ground increasingly used by regulators.',
            },
            {
              id: 'gdpr_purpose',
              label: 'Purpose Limitation',
              description:
                'Data collected for one purpose cannot be reused for an incompatible purpose without a new legal basis. Further processing for research or statistics may be compatible with appropriate safeguards.',
              importance:
                'Prevents mission creep. Training an AI model on customer-service data you collected for support is a common violation without explicit purpose extension.',
            },
            {
              id: 'gdpr_min',
              label: 'Data Minimisation',
              description:
                'Only collect data that is adequate, relevant, and strictly limited to what is necessary for the stated purpose. No just-in-case collection is permitted.',
              importance:
                'Directly limits AI data appetite. Large-scale collection because data might be useful for future models is a breach of this principle.',
            },
            {
              id: 'gdpr_storage',
              label: 'Storage Limitation',
              description:
                'Personal data must not be kept longer than necessary. Retention periods must be defined, documented, and technically enforced.',
              importance:
                'Often neglected in AI contexts. Training datasets can retain personal data for years without a defined retention policy. This is a routine audit finding.',
            },
            {
              id: 'gdpr_security',
              label: 'Security & Integrity',
              description:
                'Appropriate technical and organisational measures must protect personal data against unauthorised access, accidental loss, or destruction.',
              importance:
                'Foundation for the 72-hour breach notification requirement. Security is not optional. It must be proportionate to risk and documented.',
            },
          ],
        },
        {
          id: 'gdpr_rights',
          label: 'Data Subject Rights',
          description:
            'Articles 12 to 22 give individuals powerful, enforceable rights over their personal data.',
          importance:
            'Rights must be technically operable, not just policy promises. AI systems must be designed from the outset to honour them.',
          children: [
            {
              id: 'gdpr_access',
              label: 'Right to Access',
              description:
                'Individuals may request confirmation of whether their data is being processed and receive a copy within one month (Art. 15).',
              importance:
                'Creates direct accountability. If your AI system cannot enumerate what personal data it holds on an individual, you have a systemic compliance gap.',
            },
            {
              id: 'gdpr_erasure',
              label: 'Right to Erasure',
              description:
                'The right to be forgotten allows individuals to request deletion when data is no longer necessary, consent is withdrawn, or processing was unlawful (Art. 17).',
              importance:
                'Technically challenging for AI. Removing personal data from trained models (machine unlearning) remains an open engineering problem that regulators are beginning to address.',
            },
            {
              id: 'gdpr_portability',
              label: 'Data Portability',
              description:
                'Data subjects can receive their data in a structured, machine-readable format and transfer it to another controller (Art. 20). Applies to consent- and contract-based processing.',
              importance:
                'Enables competition and data sovereignty. For AI platforms, this means personal data must be exportable in interoperable formats on request.',
            },
            {
              id: 'gdpr_object',
              label: 'Right to Object',
              description:
                'Individuals can object to processing based on legitimate interests, or to direct marketing, at any time (Art. 21). Marketing objections must be honoured immediately with no exceptions.',
              importance:
                'AI-driven profiling and marketing require instant cessation if a subject objects. Systems must support real-time objection processing, not just policy compliance.',
            },
            {
              id: 'gdpr_auto',
              label: 'Automated Decisions',
              description:
                'Right not to be subject to solely automated decisions with significant legal or similarly significant effects (Art. 22). Subjects can demand human review. This obligation runs in parallel with the EU AI Act Art. 14 human-oversight requirement for high-risk systems. Design one mechanism that satisfies both.',
              importance:
                'The primary GDPR check on AI decision-making. Credit scoring, HR screening, insurance pricing, and parole tools are all in scope. Human review must be meaningful, not rubber-stamping.',
            },
          ],
        },
        {
          id: 'gdpr_basis',
          label: 'Lawful Basis',
          description:
            'Article 6 requires every processing activity to rest on one of six legal bases. Choosing none, or the wrong one, is a foundational violation.',
          importance:
            'You cannot switch legal bases retrospectively once challenged. The chosen basis also determines which data-subject rights apply, so the choice shapes your entire rights-response programme.',
          children: [
            {
              id: 'gdpr_consent',
              label: 'Consent',
              description:
                'Must be freely given, specific, informed, and unambiguous. Pre-ticked boxes, bundled consent, and consent obtained under a power imbalance are invalid. Withdrawal must be as easy as giving it.',
              importance:
                'Often over-relied upon. Consent is fragile. Where there is a power imbalance, such as employer to employee or government to citizen, consent is rarely freely given and should not be used.',
            },
            {
              id: 'gdpr_contract',
              label: 'Contract',
              description:
                'Processing necessary to perform a contract with the data subject, or to take pre-contractual steps at their request.',
              importance:
                'Necessary is strictly interpreted. Using it to justify analytics that merely improve, rather than deliver, the contracted service is a common misapplication.',
            },
            {
              id: 'gdpr_legit',
              label: 'Legitimate Interests',
              description:
                'Processing necessary for the controller\'s or a third party\'s legitimate interests, unless overridden by the individual\'s interests (Art. 6(1)(f)). Requires a three-part LIA test: purpose, necessity, balancing.',
              importance:
                'The flexible basis, used for fraud detection, security, and direct marketing. Must be documented. If the balancing test tips in favour of the individual, you cannot rely on it.',
            },
            {
              id: 'gdpr_obligation',
              label: 'Legal Obligation',
              description:
                'Processing required to comply with a legal obligation under EU or Member State law (tax records, AML, health and safety reporting).',
              importance:
                'Non-negotiable when applicable. Data subjects cannot override it. But the scope is limited to what the law actually requires, not what is merely convenient.',
            },
          ],
        },
        {
          id: 'gdpr_controller',
          label: 'Controller Duties',
          description:
            'Accountability obligations on data controllers under Articles 24 to 43.',
          importance:
            'Accountability principle: you must not only comply, but be able to demonstrate compliance. Documentation is non-optional and is what regulators request first.',
          children: [
            {
              id: 'gdpr_pbd',
              label: 'Privacy by Design',
              description:
                'Data protection must be embedded into system design from the outset, not retrofitted (Art. 25). Default settings must be the most privacy-protective option available.',
              importance:
                'Forces compliance into the product roadmap. Regulators expect evidence of privacy-protective design decisions, not just the end-state implementation.',
            },
            {
              id: 'gdpr_dpia',
              label: 'DPIA',
              description:
                'Data Protection Impact Assessment is mandatory before processing likely to result in high risk, including AI-based profiling, large-scale sensitive data, and systematic monitoring (Art. 35). The EU AI Act requires a Fundamental Rights Impact Assessment (FRIA) for high-risk AI deployers (Art. 27). Run both as a single assessment exercise to avoid duplication.',
              importance:
                'Required for most AI use cases involving personal data. Organisations that run the DPIA and FRIA separately produce twice the documentation for overlapping conclusions. A joint assessment satisfies both obligations more efficiently.',
            },
            {
              id: 'gdpr_ropa',
              label: 'Records of Processing',
              description:
                'Controllers must maintain Records of Processing Activities (RoPA) documenting purposes, data categories, recipients, retention periods, and security measures (Art. 30).',
              importance:
                'The audit trail regulators request first in any investigation. An incomplete or out-of-date RoPA is an immediate indicator of a poorly governed data estate.',
            },
            {
              id: 'gdpr_dpo',
              label: 'DPO Appointment',
              description:
                'A Data Protection Officer is mandatory for public bodies, organisations conducting large-scale systematic monitoring, and those processing special category data at scale.',
              importance:
                'The DPO bridges legal, technical, and business perspectives on data risk. Where required, they must report directly to top management and cannot be dismissed for performing their role.',
            },
          ],
        },
        {
          id: 'gdpr_breach',
          label: 'Breaches & Security',
          description:
            'Articles 32 to 34 cover security obligations and the breach notification regime.',
          importance:
            'The most operationally urgent dimension of GDPR. Breach response runs against a strict 72-hour clock that starts on detection, not on confirmation.',
          children: [
            {
              id: 'gdpr_tech',
              label: 'Technical Measures',
              description:
                'Encryption, pseudonymisation, access controls, integrity verification, and regular security assessments are required (Art. 32), proportionate to the risk.',
              importance:
                'Risk-based approach means there is no single mandated standard. Regulators expect best-in-class for sensitive or large-scale processing. Document every security decision.',
            },
            {
              id: 'gdpr_72h',
              label: '72-Hour Notification',
              description:
                'Personal data breaches must be reported to the lead supervisory authority within 72 hours of discovery, unless the risk to individuals is unlikely (Art. 33).',
              importance:
                'The clock starts when you become aware, not when you are certain of scope. Incident response plans and internal escalation paths must be in place before a breach occurs.',
            },
            {
              id: 'gdpr_notify',
              label: 'Subject Notification',
              description:
                'Where a breach is likely to result in high risk to individuals such as identity theft, discrimination, or financial loss, data subjects must be notified directly without undue delay (Art. 34).',
              importance:
                'Both a legal requirement and a trust signal. Transparent breach communication is increasingly expected by regulators as a marker of a well-governed organisation.',
            },
          ],
        },
        {
          id: 'gdpr_transfers',
          label: 'International Transfers',
          description:
            'Chapter V governs transfers of personal data to countries outside the EU and EEA. Every transfer needs a legal mechanism, regardless of how routine it appears.',
          importance:
            'This is the single most overlooked area for organisations using US-based AI APIs. Sending EU personal data through OpenAI, AWS, Azure, or Google requires an active transfer mechanism. The API call is the transfer.',
          children: [
            {
              id: 'gdpr_adequacy',
              label: 'Adequacy Decisions',
              description:
                'The European Commission has declared certain countries adequate, meaning their data protection law provides an essentially equivalent level of protection. Transfers to adequate countries need no additional safeguard. Current adequacy decisions cover the UK, Japan, Canada (commercial), Switzerland, and others.',
              importance:
                'The simplest transfer mechanism when available. Watch for adequacy decisions being challenged or withdrawn: the EU-US Privacy Shield was invalidated in 2020. Always verify the decision is current before relying on it.',
            },
            {
              id: 'gdpr_scc',
              label: 'Standard Contractual Clauses',
              description:
                'Pre-approved contractual clauses issued by the European Commission that importers and exporters sign to create enforceable data protection obligations across borders. Updated SCCs have applied since December 2022.',
              importance:
                'The most widely used mechanism for transfers to the US and other non-adequate countries. Must be accompanied by a Transfer Impact Assessment (TIA) to verify that local law does not undermine the contractual protections. Many organisations execute the SCCs but skip the TIA, which is a compliance gap.',
            },
            {
              id: 'gdpr_bcr',
              label: 'Binding Corporate Rules',
              description:
                'BCRs are internal data protection policies approved by a lead supervisory authority that allow multinational groups to transfer personal data between group entities worldwide. Approval takes 18 to 24 months on average.',
              importance:
                'The gold standard for intra-group transfers within multinationals. High upfront investment but eliminates the need for bilateral SCCs between group entities. Worth pursuing for any organisation with significant intra-group data flows across jurisdictions.',
            },
          ],
        },
        {
          id: 'gdpr_ai',
          label: 'AI Intersection',
          description:
            'Where GDPR directly constrains AI system design and deployment.',
          importance:
            'AI and personal data are inseparable in most real-world deployments. GDPR is not an optional layer. It is a core AI design and data governance constraint.',
          children: [
            {
              id: 'gdpr_profiling',
              label: 'Profiling Safeguards',
              description:
                'Automated profiling producing legal or similarly significant effects requires a valid legal basis, transparency about the logic, and an accessible human review mechanism (Art. 22).',
              importance:
                'Catches credit models, hiring algorithms, and insurance pricing. Significant effects is interpreted broadly: inconvenience, restricted access, and differential pricing all qualify.',
            },
            {
              id: 'gdpr_special',
              label: 'Special Category Data',
              description:
                'Health, biometric, racial or ethnic origin, political opinion, religious belief, and sexual orientation data require explicit consent or narrow statutory exemptions (Art. 9).',
              importance:
                'Many AI models inadvertently infer special categories from proxy variables. Inferring ethnicity from a postcode, name, or language still constitutes processing of special category data.',
            },
            {
              id: 'gdpr_explain',
              label: 'Algorithmic Transparency',
              description:
                'Meaningful information about the logic of automated decision-making must be provided to data subjects at collection time (Arts. 13 to 14) and on request (Art. 15).',
              importance:
                'Because the model said so does not constitute a meaningful explanation. Explainability is a GDPR obligation, not just an AI-ethics aspiration. Regulators have begun enforcing it.',
            },
          ],
        },
      ],
    },
  },

  // ISO 42001
  {
    id: 'iso_42001',
    name: 'ISO 42001',
    tagline: 'The AI management system standard. ISO/IEC 42001:2023',
    primaryColor: '#8b5cf6',
    root: {
      id: 'iso_root',
      label: 'ISO 42001',
      description:
        'ISO/IEC 42001:2023 is the first international standard for AI Management Systems (AIMS). It provides a structured framework for responsible AI development, deployment, and governance across the full lifecycle.',
      importance:
        'Voluntary but increasingly demanded by enterprise procurement, public tenders, and regulators. Certification provides structured evidence of due diligence under the EU AI Act and sector-specific regulations. The standard is explicitly designed so that implementing it builds the documentation trail needed for EU AI Act conformity assessment.',
      children: [
        {
          id: 'iso_context',
          label: 'Context',
          description:
            'Clause 4 requires organisations to understand their internal and external context before scoping and designing the AIMS.',
          importance:
            'No two AIMS look identical. Context determines scope, applicable Annex A controls, and the risk appetite against which all decisions are calibrated.',
          children: [
            {
              id: 'iso_org',
              label: 'Organisation Context',
              description:
                'Identify internal factors such as culture, capabilities, and existing governance systems, as well as external factors including regulatory landscape, sector norms, and technology trends that affect AI governance.',
              importance:
                'Sets the boundary conditions for the entire AIMS. A regulated bank and a consumer app startup have fundamentally different AI contexts. Their management systems must reflect this.',
            },
            {
              id: 'iso_stakeholders',
              label: 'Stakeholder Needs',
              description:
                'Map all interested parties, including regulators, customers, employees, affected communities, and supply chain partners, and understand their requirements and expectations regarding AI.',
              importance:
                'Stakeholder mapping often surfaces obligations not captured in legislation: customer trust requirements, sector codes of conduct, and contractual AI-governance clauses.',
            },
            {
              id: 'iso_scope',
              label: 'AIMS Scope',
              description:
                'Define which AI systems, business units, and activities fall within the management system boundary. Scope must reflect context and stakeholder requirements.',
              importance:
                'Scoping is a strategic decision. Too narrow leaves material risk unmanaged; too broad is unimplementable. Auditors expect scope to be proportionate to the organisation\'s AI exposure.',
            },
          ],
        },
        {
          id: 'iso_leadership',
          label: 'Leadership',
          description:
            'Clause 5 places responsibility for AI governance at the top-management level. Commitment must be demonstrated, not just declared.',
          importance:
            'Prevents AI ethics being siloed in a compliance team with no budget or authority. Board and C-suite accountability is a structural requirement, not a best practice.',
          children: [
            {
              id: 'iso_topmgmt',
              label: 'Top Management',
              description:
                'Executives must demonstrably commit to the AIMS: allocating resources, integrating AI governance into strategy, promoting a culture of responsible AI, and reviewing performance.',
              importance:
                'ISO 42001 explicitly requires evidence of leadership engagement, not just policy sign-off. Board minutes, budget allocations, and management-review records form part of the audit evidence.',
            },
            {
              id: 'iso_policy',
              label: 'AI Policy',
              description:
                'A documented AI policy setting out principles, objectives, and commitments, covering respect for human rights, transparency, accountability, and responsible data use.',
              importance:
                'The policy is the organisation\'s public commitment and governance anchor. It must be approved by top management, communicated to all staff, and kept current as the regulatory landscape evolves.',
            },
            {
              id: 'iso_roles',
              label: 'Roles & Accountability',
              description:
                'Specific roles with authority to implement the AIMS, report to top management, and act on governance findings must be formally assigned.',
              importance:
                'Accountability without authority is ineffective. The person responsible for AI governance needs decision-making power, not just an advisory remit, and a direct line to leadership.',
            },
          ],
        },
        {
          id: 'iso_planning',
          label: 'Planning',
          description:
            'Clause 6 covers risk-based thinking, AI impact assessment, and setting measurable, time-bound objectives.',
          importance:
            'The focus here is proactive planning, not reactive compliance. Risk and impact assessment must happen before deployment so design decisions can incorporate mitigations.',
          children: [
            {
              id: 'iso_risk',
              label: 'Risk Assessment',
              description:
                'Identify, analyse, and evaluate AI-related risks and opportunities, considering probability, severity, reversibility, and breadth of potential harms across the lifecycle. This exercise should feed directly into the EU AI Act risk management system required under Art. 9.',
              importance:
                'The analytical engine of the AIMS. Organisations that run their ISO 42001 risk assessment and their EU AI Act Art. 9 risk management process separately are duplicating effort. The outputs should be the same document.',
            },
            {
              id: 'iso_impact',
              label: 'AI Impact Assessment',
              description:
                'Assess potential impacts of AI systems on individuals, groups, and society, including human rights impacts, fairness, bias, and unintended consequences (Annex A5). The EU AI Act requires a Fundamental Rights Impact Assessment for high-risk deployers (Art. 27). A GDPR DPIA is required for high-risk personal data processing (Art. 35). Combine all three into one integrated assessment.',
              importance:
                'Regulators and procurement bodies increasingly require the impact assessment as a standalone deliverable. Organisations that run three separate assessments produce three versions of the same conclusion. One integrated assessment is more credible and far more efficient.',
            },
            {
              id: 'iso_objectives',
              label: 'AI Objectives',
              description:
                'Set measurable objectives for AI performance, ethics, and compliance. Establish plans with specific timelines, allocated resources, and named accountable owners.',
              importance:
                'Converts vague responsible AI commitments into trackable, auditable targets. Objectives create the baseline against which management review and internal audit measure progress.',
            },
          ],
        },
        {
          id: 'iso_operations',
          label: 'Operations',
          description:
            'Clause 8 controls the operational execution of the AIMS across the full AI system lifecycle.',
          importance:
            'Where governance theory becomes practice. The strength of operational controls is what external auditors and regulators assess. Paper governance without operational evidence fails certification.',
          children: [
            {
              id: 'iso_lifecycle',
              label: 'AI Lifecycle',
              description:
                'Governance controls apply at every lifecycle phase: concept and design, data collection, development, testing, deployment, monitoring, and retirement (Annex A6). This lifecycle framework directly maps onto the EU AI Act\'s quality management system requirements under Art. 17.',
              importance:
                'Many organisations govern deployment but neglect the retirement phase, leaving deprecated systems processing data unseen. Lifecycle coverage must be end-to-end.',
            },
            {
              id: 'iso_data',
              label: 'Data Governance',
              description:
                'Controls for data quality, provenance, minimisation, bias detection in training data, and protection throughout the AI lifecycle (Annex A7).',
              importance:
                'Directly reinforces GDPR compliance. ISO 42001 data governance controls and GDPR data protection obligations are mutually reinforcing. Implement them together to avoid duplication. A single data inventory satisfies both frameworks.',
            },
            {
              id: 'iso_supplier',
              label: 'Supplier Management',
              description:
                'Due-diligence requirements for AI providers and third-party AI components. Organisations must understand and manage the governance of externally sourced AI (Annex A9).',
              importance:
                'You inherit risk from your AI supply chain. Using a third-party AI API does not transfer your obligations under ISO 42001, the EU AI Act, or GDPR. Contractual flows-down are required.',
            },
            {
              id: 'iso_controls',
              label: 'Risk Controls',
              description:
                'Implement, operate, and maintain controls to address identified AI risks. Controls may be technical, process-based, or organisational, and must be proportionate to risk level.',
              importance:
                'Control implementation is what gets audited. Evidence of operation, including logs, approval records, review minutes, and testing results, is required for both internal audit and certification.',
            },
          ],
        },
        {
          id: 'iso_annex',
          label: 'Annex A Controls',
          description:
            'Annex A provides 38 controls across 9 domains, selected based on risk assessment. It is a menu, not a mandatory checklist. A.7 (Data Management) and A.9 (AI by Third Parties) are covered in the Operations branch of this map. Every excluded control must be justified in the Statement of Applicability.',
          importance:
            'Modular and risk-based. Every control selected must be properly implemented and evidenced. Every control excluded must be justified in the Statement of Applicability.',
          children: [
            {
              id: 'iso_a2',
              label: 'Policies A.2',
              description:
                'Controls for establishing, documenting, approving, communicating, and maintaining AI-related policies, including acceptable use, human oversight, and data usage policies.',
              importance:
                'Policy is the governance backbone. Without documented, approved, and communicated policies, all other controls lack authoritative foundation and cannot be consistently applied.',
            },
            {
              id: 'iso_a3',
              label: 'Internal Org A.3',
              description:
                'Controls for defining accountability structures, governance forums, and escalation paths for AI-related decisions. Includes cross-functional roles spanning legal, technical, ethics, and business teams.',
              importance:
                'One of the most commonly under-implemented domains. Regulators investigating AI harm go straight to accountability: who owned this decision, and did they have the authority and information to make it well? A.3 is the paper trail that answers those questions.',
            },
            {
              id: 'iso_a5',
              label: 'Impact Assess A.5',
              description:
                'Structured process for assessing AI system impacts on individuals, groups, and society. Documents risks to fundamental rights and the proposed mitigations.',
              importance:
                'The AI Impact Assessment is becoming a procurement and regulatory requirement independently of ISO 42001 certification. Treat it as a deliverable in its own right, not just an internal control.',
            },
            {
              id: 'iso_a6',
              label: 'Lifecycle A.6',
              description:
                'Controls spanning design, testing, deployment, monitoring, and retirement, including requirements for fairness evaluation, performance monitoring thresholds, and change management.',
              importance:
                'The most operationally intensive Annex A domain. Maps directly to MLOps and model governance practices. Well-implemented, it creates the audit trail needed for EU AI Act conformity assessment.',
            },
            {
              id: 'iso_a8',
              label: 'AI Security A.8',
              description:
                'Security controls specific to AI systems: protecting models from theft or adversarial manipulation, securing training pipelines, hardening inference endpoints, and managing AI-specific attack vectors such as prompt injection and model inversion.',
              importance:
                'Standard ISO 27001 controls do not fully address AI-specific threats. A model that can be manipulated through adversarial inputs or extracted through API queries represents a security risk with no equivalent in traditional IT. A.8 fills that gap.',
            },
          ],
        },
        {
          id: 'iso_improvement',
          label: 'Improvement',
          description:
            'Clauses 9 and 10 cover performance evaluation, internal audit, management review, and continual improvement.',
          importance:
            'ISO 42001 is a living system, not a one-time certification project. The improvement cycle ensures AI governance keeps pace with evolving capabilities, risks, and regulatory requirements.',
          children: [
            {
              id: 'iso_audit',
              label: 'Internal Audit',
              description:
                'Planned internal audits verify AIMS implementation and effectiveness. Auditors must be objective, meaning they should not audit their own work, and must be competent in AI governance.',
              importance:
                'Internal audit is evidence of self-governance and due diligence. Regulators and certification bodies expect organisations to have identified and addressed weaknesses before external scrutiny.',
            },
            {
              id: 'iso_review',
              label: 'Management Review',
              description:
                'Top management must periodically review the AIMS for continuing suitability, adequacy, and effectiveness. Inputs must include audit results, incident data, and stakeholder feedback.',
              importance:
                'Keeps AI governance on the board agenda, not just at certification time. As AI systems evolve, the AIMS must be actively updated, not left static between audits.',
            },
            {
              id: 'iso_corrective',
              label: 'Corrective Action',
              description:
                'When nonconformities are identified, whether through audit, incident, or complaint, root causes must be investigated, corrective actions taken, and recurrence prevented.',
              importance:
                'The feedback loop that prevents governance failures from repeating. Every AI incident is an opportunity to improve the system. Regulators look for corrective action records when investigating harm.',
            },
            {
              id: 'iso_continual',
              label: 'Continual Improvement',
              description:
                'Ongoing enhancement of the AIMS\'s suitability, adequacy, and effectiveness, driven by monitoring data, stakeholder input, emerging best practice, and new regulatory requirements.',
              importance:
                'AI capability evolves faster than any standard. Continual improvement is the mechanism that prevents the AIMS from becoming a compliance relic while the technology it governs advances.',
            },
          ],
        },
      ],
    },
  },

  // NIST AI RMF
  {
    id: 'nist_ai_rmf',
    name: 'NIST AI RMF',
    tagline: 'Voluntary US framework for managing AI risk across the full lifecycle. NIST AI 100-1 (Jan 2023)',
    primaryColor: '#f59e0b',
    root: {
      id: 'nist_root',
      label: 'NIST AI RMF',
      description:
        'NIST AI 100-1, published January 2023. A voluntary framework for organisations to manage AI risks and promote trustworthy AI. Structured around four core functions: GOVERN, MAP, MEASURE, and MANAGE.',
      importance:
        'Voluntary does not mean optional in practice. US federal agencies are directed to adopt it, and it is increasingly referenced in procurement, contract requirements, and as evidence of responsible AI practice by international regulators including the EU AI Office.',
      children: [
        {
          id: 'nist_govern',
          label: 'GOVERN',
          description:
            'GOVERN establishes the organizational and cultural foundation for AI risk management. It covers policies, roles, risk tolerance, training, and executive accountability. Without GOVERN, the other three functions lack authority, resources, and direction.',
          importance:
            'GOVERN is the only function that cannot be delegated to a technical team. It requires visible commitment from boards and C-suite. GOVERN 2.3 explicitly states that executive leadership must declare risk tolerances and actively support AI risk management.',
          children: [
            {
              id: 'nist_go_policy',
              label: 'Policies & Regulation',
              description:
                'GOVERN 1.1 requires organisations to understand, manage, and document applicable legal and regulatory requirements. GOVERN 1.2 requires AI risk management policies to integrate trustworthy AI characteristics across design, development, deployment, and monitoring.',
              importance:
                'GOVERN 1.1 directly addresses the EU AI Act, GDPR, and sector-specific rules. For organisations operating in the EU, satisfying GOVERN 1.1 means documenting how each applicable regulation maps to internal AI governance policies.',
            },
            {
              id: 'nist_go_tolerance',
              label: 'Risk Tolerance',
              description:
                'GOVERN 1.3 requires policies that define mechanisms for measuring AI system impact, establish assessment scales (qualitative or quantitative), and assign an overall risk measurement approach — for example, risk = impact x likelihood.',
              importance:
                'Risk tolerance without a measurement method is a policy aspiration, not a governance control. GOVERN 1.3 forces organisations to define what "acceptable risk" means numerically — a step most AI governance programmes skip.',
            },
            {
              id: 'nist_go_roles',
              label: 'Roles & Training',
              description:
                'GOVERN 2.1 defines AI risk management roles across boards, senior management, audit, product, development, testing, legal, and oversight functions. GOVERN 2.2 requires ongoing training on applicable laws, organisational policies, and trustworthy AI characteristics.',
              importance:
                'GOVERN 2.1 requires independence between AI development and AI testing functions — the same principle as separation of duties in financial controls. Where developers also test their own systems, governance is structurally compromised.',
            },
            {
              id: 'nist_go_leadership',
              label: 'Leadership Accountability',
              description:
                'GOVERN 2.3 requires executive leadership to declare risk tolerances, support AI risk management efforts, and delegate power and resources through the management chain. GOVERN 6.1 requires policies that address AI risk and benefit communication to stakeholders.',
              importance:
                'This provision exists because AI risk management repeatedly fails when positioned as a compliance function rather than a strategic one. GOVERN 2.3 places accountability where decisions are actually made.',
            },
          ],
        },
        {
          id: 'nist_map',
          label: 'MAP',
          description:
            'MAP establishes context, identifies AI risks, and categorises their likelihood and magnitude. It is the intelligence-gathering phase that feeds the MEASURE and MANAGE functions.',
          importance:
            'MAP is where AI risk management begins in practice. Skipping MAP and going directly to MANAGE produces controls that address the wrong risks. MAP 1.1 is explicit: highly accurate and optimised systems can still cause harm if their context is not properly understood.',
          children: [
            {
              id: 'nist_mp_context',
              label: 'Context & Purpose',
              description:
                'MAP 1.1 requires organisations to document the intended purpose, beneficial uses, applicable legal norms, and potential for misuse of each AI system. MAP 1.2 calls for interdisciplinary teams including legal, sociology, psychology, and public policy expertise to capture context.',
              importance:
                'MAP 1.1 is the primary defence against purpose creep. If the intended use is not documented before deployment, organisations lack a baseline for identifying when an AI system is being used outside its intended context.',
            },
            {
              id: 'nist_mp_risk',
              label: 'Risk Identification',
              description:
                'MAP 2.1-2.3 require organisations to enumerate risk categories relevant to the AI system, assess the scientific basis for risk claims, and identify potential negative impacts on individuals, communities, and society across the operational lifecycle.',
              importance:
                'MAP 2 produces the risk inventory that MANAGE 1 acts on. Organisations that skip structured risk identification end up managing reactive incidents rather than anticipated risks.',
            },
            {
              id: 'nist_mp_characteristics',
              label: 'System Characteristics',
              description:
                'MAP 3.1-3.5 require documenting AI system properties: task, modality, data types, training approach, and deployment environment. MAP 3.5 specifically requires alignment of data collection and use with applicable laws — directly intersecting with GDPR Art. 5 and EU AI Act Art. 10.',
              importance:
                'MAP 3.5 is the NIST AI RMF entry point for data protection compliance. An organisation that satisfies MAP 3.5 has documented its data governance against legal requirements — evidence that directly supports both GDPR and EU AI Act data governance obligations.',
            },
            {
              id: 'nist_mp_impact',
              label: 'Impact & Likelihood',
              description:
                'MAP 5.1-5.2 require organisations to catalogue the likelihood and magnitude of potential harms to individuals, groups, communities, and society. Harms must be assessed across technical, legal, social, and operational dimensions.',
              importance:
                'MAP 5 is the precursor to the EU AI Act Fundamental Rights Impact Assessment and GDPR DPIA. Running a MAP 5 exercise first provides the raw material for both regulatory assessments — reducing total effort by approximately 40%.',
            },
          ],
        },
        {
          id: 'nist_measure',
          label: 'MEASURE',
          description:
            'MEASURE analyses and assesses AI risks through quantitative and qualitative methods. It covers test and evaluation, bias measurement, explainability, and ongoing monitoring.',
          importance:
            'MEASURE operationalises what GOVERN requires and what MAP identifies. Without MEASURE, risk management is based on assumptions rather than evidence. MEASURE 1.1 explicitly requires defining what "fit for purpose" means and specifying acceptable performance limits.',
          children: [
            {
              id: 'nist_ms_metrics',
              label: 'Metrics & Methods',
              description:
                'MEASURE 1.1 requires organisations to establish approaches for detecting, tracking, and measuring known risks, errors, and negative impacts. MEASURE 1.2 requires regular assessment of metric appropriateness and effectiveness of existing controls throughout the lifecycle.',
              importance:
                'MEASURE 1.2 addresses a common failure: organisations define metrics once at deployment and never revisit them. As AI systems and operational contexts change, fixed metrics become misleading. Regular reassessment is not optional.',
            },
            {
              id: 'nist_ms_testing',
              label: 'Testing & Evaluation',
              description:
                'MEASURE 1.3 requires independent internal experts (not the system developers) to test AI systems. MEASURE 2.1-2.2 cover testing for trustworthiness characteristics including safety, security, explainability, and reliability across diverse operating conditions.',
              importance:
                'The independence requirement in MEASURE 1.3 mirrors the EU AI Act requirement for independent conformity assessments for biometric and critical-infrastructure AI. Building independent evaluation capacity early satisfies both frameworks.',
            },
            {
              id: 'nist_ms_bias',
              label: 'Bias & Fairness',
              description:
                'MEASURE 2.3 requires evaluation of AI system impacts across demographic groups and operational contexts. MEASURE 2.10 addresses explainability, requiring that AI outputs are interpretable to the users and affected individuals who rely on them.',
              importance:
                'MEASURE 2.3 is NIST\'s implementation of the fairness requirement that the EU AI Act imposes through Art. 10 (data quality) and that GDPR imposes through Art. 22 (automated decisions). A bias evaluation conducted for MEASURE 2.3 supports both.',
            },
            {
              id: 'nist_ms_monitor',
              label: 'Ongoing Monitoring',
              description:
                'MEASURE 4.1-4.3 establish feedback mechanisms for post-deployment monitoring, including tracking AI system performance against pre-deployment benchmarks, identifying distribution shift, and updating risk assessments when conditions change.',
              importance:
                'Post-deployment monitoring is where most AI risk management programmes break down. MEASURE 4 makes it a formal, documented obligation — not a best-effort activity.',
            },
          ],
        },
        {
          id: 'nist_manage',
          label: 'MANAGE',
          description:
            'MANAGE prioritises and addresses risks identified through MAP and MEASURE. It covers risk response planning, residual risk tracking, incident management, and feedback loops for continuous improvement.',
          importance:
            'MANAGE is where risk management produces outcomes rather than documentation. MANAGE 1.1 requires formally weighing AI system risks against benefits — a step that may conclude the system should not be deployed at all.',
          children: [
            {
              id: 'nist_mg_prioritise',
              label: 'Risk Prioritisation',
              description:
                'MANAGE 1.1 requires a formal determination of whether an AI system achieves its intended purpose and whether benefits outweigh risks. MANAGE 1.2 requires treatment of documented risks to be prioritised based on impact, likelihood, and available resources.',
              importance:
                'MANAGE 1.1 is the point at which an organisation should decide not to deploy an AI system. Organisations without a formal risk-benefit evaluation process at this stage lack any structured mechanism for saying no.',
            },
            {
              id: 'nist_mg_response',
              label: 'Risk Response',
              description:
                'MANAGE 1.3 requires risk responses for high-priority risks identified in MAP to be planned and implemented. MANAGE 2.1-2.2 address mechanisms for responding to AI risks, including treatment options: accept, mitigate, transfer, or avoid.',
              importance:
                'MANAGE 1.3 explicitly requires outputs from GOVERN 1, MAP 5, and MEASURE 2 to inform documented risk responses. This cross-function dependency is intentional: risk responses without this evidence trail are insufficiently justified.',
            },
            {
              id: 'nist_mg_incident',
              label: 'Incident Management',
              description:
                'MANAGE 3.1-3.2 require AI incident response procedures including detection, escalation, containment, and post-incident review. Incident response plans must be tested, not just documented.',
              importance:
                'MANAGE 3 overlaps directly with GDPR Art. 33 (72-hour breach notification) and EU AI Act Art. 73 (serious incident reporting). A single AI incident management process that covers both regulatory obligations is more effective than two separate procedures.',
            },
            {
              id: 'nist_mg_improve',
              label: 'Feedback & Learning',
              description:
                'MANAGE 4.1-4.2 establish feedback loops from post-deployment monitoring, incident analysis, and stakeholder input back into the GOVERN, MAP, and MEASURE functions. Risk tolerances are re-calibrated as new information becomes available.',
              importance:
                'MANAGE 4 is what converts a static risk assessment into a living risk management system. Without structured feedback loops, risk assessments reflect the world at deployment time, not the world the AI system is operating in today.',
            },
          ],
        },
        {
          id: 'nist_trustworthy',
          label: 'Trustworthy AI',
          description:
            'The NIST AI RMF defines seven characteristics of trustworthy AI that the GOVERN, MAP, MEASURE, and MANAGE functions are designed to support: Valid and Reliable, Safe, Secure and Resilient, Explainable and Interpretable, Privacy-Enhanced, Fair with Harmful Bias Managed, and Accountable and Transparent.',
          importance:
            'These characteristics are not aspirational values — they are the measurable properties that the AI RMF\'s four functions operationalise. Each MEASURE subcategory maps to one or more of these characteristics. If an organisation cannot demonstrate progress on each characteristic, its AI RMF implementation is incomplete.',
          children: [
            {
              id: 'nist_tr_valid',
              label: 'Valid & Reliable',
              description:
                'AI systems should produce accurate outputs consistently across intended operating contexts and conditions. Validity means the system measures what it is designed to measure. Reliability means it does so consistently, including when inputs are unexpected or adversarial.',
              importance:
                'Valid and reliable AI is a precondition for all other trustworthy characteristics. An AI system that produces inconsistent or inaccurate outputs cannot be safe, fair, or accountable — regardless of how well-designed the governance structure is.',
            },
            {
              id: 'nist_tr_safe',
              label: 'Safe',
              description:
                'AI systems should not pose undue risk to human life, health, property, or the environment during normal use or foreseeable misuse. Safety considerations must be embedded at design time, not retrofitted after an incident.',
              importance:
                'Safety is the characteristic most directly addressed by the EU AI Act\'s prohibited practices and high-risk classification. Demonstrating NIST AI RMF safety measures provides documented evidence relevant to EU AI Act Art. 9 risk management.',
            },
            {
              id: 'nist_tr_secure',
              label: 'Secure & Resilient',
              description:
                'AI systems must withstand adversarial attacks (including prompt injection and data poisoning), unintended inputs, and component failures. Resilience means the system degrades gracefully and recovers from disruption without catastrophic failure.',
              importance:
                'Security of AI systems is explicitly addressed in EU AI Act Art. 15 (accuracy, robustness, and cybersecurity) and ISO 42001 Annex A.8. NIST AI RMF MEASURE 2.6 provides the measurement methodology for demonstrating security resilience.',
            },
            {
              id: 'nist_tr_explain',
              label: 'Explainable & Fair',
              description:
                'AI outputs should be interpretable and understandable to users, operators, and affected individuals. AI systems should not create or amplify harmful bias or produce discriminatory treatment across demographic groups.',
              importance:
                'These two characteristics together address the GDPR Art. 22 explainability obligation and the EU AI Act Art. 10 bias requirement. NIST MEASURE 2.3 (bias evaluation) and MEASURE 2.10 (explainability) provide the evidence that satisfies both.',
            },
            {
              id: 'nist_tr_account',
              label: 'Accountable & Private',
              description:
                'Accountability means specific humans can be held responsible for AI outcomes — there is no accountability vacuum. Privacy means personal data is minimised, protected, and processed only with appropriate safeguards throughout the AI lifecycle.',
              importance:
                'Accountability is operationalised by GOVERN 2.1 (roles and responsibilities) and GOVERN 2.3 (executive accountability). Privacy aligns directly with GDPR\'s data minimisation and purpose limitation principles, making NIST AI RMF privacy requirements a natural complement to GDPR compliance.',
            },
          ],
        },
        {
          id: 'nist_playbooks',
          label: 'Profiles',
          description:
            'AI RMF Profiles translate the framework into organisation-specific implementation roadmaps. A Current Profile captures existing AI risk management practices. A Target Profile defines the desired state. The gap between them drives the implementation plan.',
          importance:
            'Profiles are how organisations make the AI RMF operational rather than aspirational. Sector-specific playbooks exist for finance, healthcare, and critical infrastructure — providing concrete action steps aligned to each subcategory.',
          children: [
            {
              id: 'nist_pb_current',
              label: 'Current Profile',
              description:
                'A Current Profile documents the organisation\'s existing AI risk management activities mapped against the GOVERN, MAP, MEASURE, and MANAGE subcategories. It provides the baseline for measuring progress and identifying gaps.',
              importance:
                'The Current Profile is the honest assessment of where AI governance actually stands, as opposed to where governance documents claim it stands. Organisations without a Current Profile have no foundation for claiming risk management maturity.',
            },
            {
              id: 'nist_pb_target',
              label: 'Target Profile',
              description:
                'A Target Profile defines the desired state of AI risk management maturity, prioritised by the organisation\'s risk tolerance and sector context. It drives the implementation roadmap, resource allocation, and measurable objectives.',
              importance:
                'Target Profiles prevent AI risk management from becoming a compliance checkbox exercise. By committing to a specific maturity target, organisations create accountability for improvement — not just documentation of current state.',
            },
            {
              id: 'nist_pb_alignment',
              label: 'Cross-Framework',
              description:
                'The NIST AI RMF explicitly maps to other frameworks. GOVERN aligns with ISO 42001 Clauses 4 to 6. MAP overlaps with the EU AI Act risk classification requirements. MEASURE aligns with DPIA, FRIA, and conformity assessment processes. MANAGE aligns with incident response requirements across all three EU frameworks.',
              importance:
                'Using the AI RMF alongside EU AI Act and ISO 42001 is additive, not duplicative. Organisations that implement all three as a unified programme typically satisfy 70 to 80% of each framework\'s requirements with a single set of policies, assessments, and controls.',
            },
          ],
        },
      ],
    },
  },
];
