import type { RiskTier } from '@/types';

interface ClassifyResult {
  risk_tier: RiskTier;
  risk_reason: string;
  gdpr_obligations: string[];
  iso_clauses: string[];
  summary: string;
}

const prohibitedKeywords = [
  'social scor', 'social credit', 'biometric surveillance', 'real-time biometric',
  'subliminal', 'manipulat', 'exploit vulnerabilit', 'mass surveillance',
  'predict crime', 'predictive policing', 'emotion recogni', 'public space',
];

const highRiskKeywords = [
  'hiring', 'recruitment', 'cv screen', 'resume screen', 'job applicant',
  'credit scor', 'loan', 'mortgage', 'insurance underwriting',
  'education', 'student assess', 'exam', 'grading',
  'law enforcement', 'police', 'court', 'criminal',
  'border control', 'migration', 'asylum', 'visa',
  'critical infrastructure', 'power grid', 'water supply', 'transport',
  'medical diagnos', 'health', 'clinical', 'patient',
  'welfare benefit', 'social benefit', 'public service',
  'safety component', 'autonomous vehicle', 'self-driving',
];

const limitedRiskKeywords = [
  'chatbot', 'chat bot', 'virtual assistant', 'conversational',
  'deepfake', 'deep fake', 'synthetic media', 'generated image', 'generated video',
  'emotion detect', 'sentiment analy',
  'content moderat', 'content generation', 'text generation',
  'recommendation', 'suggest',
];

const personalDataKeywords = [
  'personal data', 'user data', 'customer data', 'employee data',
  'profil', 'tracking', 'behavioral', 'biometric',
  'health data', 'medical record', 'financial data',
  'name', 'email', 'address', 'identifier',
];

const automatedDecisionKeywords = [
  'automat', 'decision', 'classify', 'rank', 'score', 'screen',
  'approv', 'reject', 'deny', 'select', 'filter',
];

function matchesAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

export function classifySystem(description: string): ClassifyResult {
  const hasPersonalData = matchesAny(description, personalDataKeywords);
  const hasAutomatedDecisions = matchesAny(description, automatedDecisionKeywords);

  // Tier detection
  let risk_tier: RiskTier;
  let risk_reason: string;

  if (matchesAny(description, prohibitedKeywords)) {
    risk_tier = 'unacceptable';
    risk_reason =
      'The description contains characteristics associated with prohibited AI practices under EU AI Act Art. 5, such as real-time biometric surveillance, social scoring, or subliminal manipulation.';
  } else if (matchesAny(description, highRiskKeywords)) {
    risk_tier = 'high';
    risk_reason =
      'The system operates in a sector listed in Annex III of the EU AI Act (e.g. employment, credit, education, law enforcement, or critical infrastructure), triggering full Chapter III obligations.';
  } else if (matchesAny(description, limitedRiskKeywords)) {
    risk_tier = 'limited';
    risk_reason =
      'The system involves chatbots, synthetic media, or emotion recognition — categories that carry transparency obligations under EU AI Act Art. 50, but not full high-risk requirements.';
  } else {
    risk_tier = 'minimal';
    risk_reason =
      'No indicators of prohibited or high-risk use cases were detected. The system appears to fall into the minimal risk category, where no specific EU AI Act obligations apply beyond voluntary codes of conduct.';
  }

  // GDPR obligations
  const gdpr_obligations: string[] = [];
  if (hasPersonalData) {
    gdpr_obligations.push('Art. 5 — Principles of lawful, fair, and transparent processing');
    gdpr_obligations.push('Art. 13/14 — Information obligations to data subjects');
    gdpr_obligations.push('Art. 30 — Records of processing activities (ROPA)');
  }
  if (hasPersonalData && (risk_tier === 'high' || matchesAny(description, ['profil', 'large scale', 'systematic']))) {
    gdpr_obligations.push('Art. 35 — Data Protection Impact Assessment (DPIA) required');
  }
  if (hasAutomatedDecisions && hasPersonalData) {
    gdpr_obligations.push('Art. 22 — Right not to be subject to solely automated decisions');
  }
  if (gdpr_obligations.length === 0) {
    gdpr_obligations.push('No personal data indicators detected — GDPR obligations may not apply');
  }

  // ISO 42001 clauses
  const iso_clauses: string[] = [
    'Clause 6.1 — Risk and opportunity assessment',
    'Clause 7.5 — Documented information',
    'Annex A.6 — AI system lifecycle management',
  ];
  if (risk_tier === 'high' || risk_tier === 'unacceptable') {
    iso_clauses.push('Annex A.5 — AI system impact assessment (B.5.2–B.5.5)');
    iso_clauses.push('Annex A.9 — Responsible use processes (B.9.2–B.9.3)');
  }
  if (hasPersonalData) {
    iso_clauses.push('Annex A.7 — Data governance and quality (B.7 series)');
  }
  iso_clauses.push('Annex A.8 — Information for interested parties (B.8.2)');

  // Summary
  const summaries: Record<RiskTier, string> = {
    unacceptable:
      'This system appears to fall under prohibited practices (EU AI Act Art. 5) and cannot be deployed in the EU without fundamental redesign. Immediate legal review is required.',
    high:
      `This system is likely classified as high-risk under Annex III. Before deployment, you must complete technical documentation (Art. 11), establish a risk management system (Art. 9), ensure human oversight (Art. 14), and register the system in the EU database.${hasPersonalData ? ' A DPIA is also required under GDPR Art. 35.' : ''}`,
    limited:
      `This system has transparency obligations — users must be informed they are interacting with AI (EU AI Act Art. 50).${hasPersonalData ? ' GDPR information obligations also apply.' : ''} No full Chapter III compliance is required.`,
    minimal:
      'No specific EU AI Act obligations apply. Voluntary codes of conduct are recommended. If personal data is involved, standard GDPR compliance applies.',
  };

  return {
    risk_tier,
    risk_reason,
    gdpr_obligations,
    iso_clauses,
    summary: summaries[risk_tier],
  };
}
