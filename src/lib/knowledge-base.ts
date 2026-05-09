import type { KnowledgeBase, Theme, FilterTag } from '@/types';
import rawData from '@/data/knowledge_base.json';

export const knowledgeBase: KnowledgeBase = rawData as KnowledgeBase;

export function getAllThemes(): Theme[] {
  return knowledgeBase.themes;
}

export function getThemeById(id: string): Theme | undefined {
  return knowledgeBase.themes.find((t) => t.id === id);
}

export function filterThemes(themes: Theme[], activeFilters: FilterTag[]): Theme[] {
  if (activeFilters.length === 0) return themes;

  return themes.filter((theme) => {
    return activeFilters.some((filter) => {
      if (filter === 'always_applicable') {
        return theme.tags.includes('always_applicable') || theme.tags.includes('always');
      }
      return theme.tags.includes(filter);
    });
  });
}
