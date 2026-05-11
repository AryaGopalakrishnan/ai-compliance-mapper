export type Framework = 'eu_ai_act' | 'gdpr' | 'iso_42001' | 'nist_ai_rmf';

export type AppliesWhen =
  | 'always'
  | 'always_applicable'
  | 'high_risk_system'
  | 'personal_data'
  | 'automated_decisions'
  | 'high_risk_processing'
  | 'high_impact_sectors'
  | 'public_body'
  | 'societal_impact';

export interface Mapping {
  framework: Framework;
  ref: string;
  title: string;
  obligation: string;
  applies_when: AppliesWhen[];
  enforcement_date: string;
  action: string;
}

export interface Theme {
  id: string;
  label: string;
  icon: string;
  description: string;
  tags: AppliesWhen[];
  mappings: Mapping[];
  crossmap_note: string;
}

export type RiskTier = 'unacceptable' | 'high' | 'limited' | 'minimal';
export type RiskColor = 'red' | 'amber' | 'blue' | 'green';

export interface RiskTierEntry {
  tier: RiskTier;
  label: string;
  color: RiskColor;
  description: string;
  examples: string[];
}

export interface ISOClause {
  ref: string;
  title: string;
  summary: string;
}

export interface AnnexAGroup {
  ref: string;
  title: string;
  controls: string[];
}

export interface EnforcementNotes {
  eu_ai_act: {
    prohibited_practices: string;
    gpai_models: string;
    high_risk_systems: string;
    other_provisions: string;
  };
  gdpr: string;
  iso_42001: string;
}

export interface KnowledgeBase {
  meta: {
    version: string;
    sources: string[];
    enforcement_notes: EnforcementNotes;
  };
  themes: Theme[];
  risk_tiers: {
    eu_ai_act: RiskTierEntry[];
  };
  iso_42001_clauses: ISOClause[];
  annex_a_groups: AnnexAGroup[];
}

export type FilterTag = 'high_risk_system' | 'personal_data' | 'automated_decisions' | 'always_applicable';

export interface ClassifyRequest {
  description: string;
}

export interface ClassifyResponse {
  risk_tier: RiskTier;
  risk_reason: string;
  gdpr_obligations: string[];
  iso_clauses: string[];
  summary: string;
}

export interface ExplainRequest {
  theme_id: string;
  framework: Framework;
  ref: string;
  obligation: string;
}

export interface ExplainResponse {
  explanation: string;
}
