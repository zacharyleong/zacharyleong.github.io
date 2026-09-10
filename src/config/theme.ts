export type ThemeName = 'light' | 'dark';

type ControlColors = {
  background: string;
  text: string;
  hoverText: string;
  hover: readonly string[];
};

export interface ThemeColors {
  backgrounds: {
    site: string;
    home: string;
    about: string;
    projects: string;
    tags: string;
    article: string;
    relatedProjects: string;
    code: string;
    inlineCode: string;
    soft: string;
    selection: string;
  };
  text: {
    site: { primary: string };
    article: {
      body: string;
      heading: string;
      link: string;
      linkHover: string;
      metadata: string;
      caption: string;
      code: string;
      listMarker: string;
      sidebar: string;
      sidebarHover: string;
    };
  };
  cards: {
    standard: { background: string; text: string };
    highlight: { backgrounds: readonly string[]; text: string };
  };
  controls: {
    tag: ControlColors;
    projectButton: ControlColors;
    projectsButton: ControlColors;
    themeToggle: Omit<ControlColors, 'hover'> & { hover: string };
    generic: ControlColors;
  };
  accent: { navigation: string; focus: string };
  structure: {
    border: string;
    shadow: string;
    articleDivider: string;
    scrollbarTrack: string;
    scrollbarPattern: string;
    scrollbarThumb: string;
    scrollbarArrow: string;
  };
  footer: { background: string; text: string; hover: string; statusControl: string };
  status: { finished: string; wip: string; archived: string };
}

const brightColors = [
  '#C084FC', '#F472B6', '#FB7185', '#E879F9',
  '#A78BFA', '#818CF8', '#60A5FA', '#38BDF8',
  '#22D3EE', '#2DD4BF', '#34D399', '#4ADE80',
  '#A3E635', '#FACC15', '#FB923C', '#F87171',
] as const;

const darkColors = [
  '#7E22CE', '#BE185D', '#BE123C', '#A21CAF',
  '#6D28D9', '#4338CA', '#1D4ED8', '#0369A1',
  '#0E7490', '#0F766E', '#047857', '#15803D',
  '#4D7C0F', '#A16207', '#C2410C', '#B91C1C',
] as const;

export const themes = {
  light: {
    backgrounds: {
      site: '#FFFFFF',
      home: '#60A5FA',
      about: '#4ADE80',
      projects: '#4ADE80',
      tags: '#C084FC',
      article: '#FFFFFF',
      relatedProjects: '#FFFFFF',
      code: 'transparent',
      inlineCode: 'transparent',
      soft: '#F1F5F9',
      selection: '#F0F8FF',
    },
    text: {
      site: { primary: '#000000' },
      article: {
        body: '#334155',
        heading: '#0F172A',
        link: '#0F172A',
        linkHover: '#0F172A',
        metadata: '#94A3B8',
        caption: '#64748B',
        code: '#0F172A',
        listMarker: '#94A3B8',
        sidebar: '#222222',
        sidebarHover: '#A8A29E',
      },
    },
    cards: {
      standard: { background: '#FFFFFF', text: '#000000' },
      highlight: { backgrounds: brightColors, text: '#000000' },
    },
    controls: {
      tag: { background: '#FFFFFF', text: '#000000', hoverText: '#000000', hover: brightColors },
      projectButton: { background: '#FFFFFF', text: '#000000', hoverText: '#000000', hover: brightColors },
      projectsButton: { background: '#FFFFFF', text: '#000000', hoverText: '#000000', hover: brightColors },
      themeToggle: { background: '#FFFFFF', text: '#000000', hoverText: '#000000', hover: '#22C55E' },
      generic: { background: '#FFFFFF', text: '#000000', hoverText: '#FFFFFF', hover: brightColors },
    },
    accent: { navigation: '#4ADE80', focus: '#000000' },
    structure: {
      border: '#000000',
      shadow: '#000000',
      articleDivider: '#E2E8F0',
      scrollbarTrack: '#FFFFFF',
      scrollbarPattern: '#000000',
      scrollbarThumb: '#FFFFFF',
      scrollbarArrow: '#000000',
    },
    footer: { background: '#000000', text: '#FFFFFF', hover: '#4ADE80', statusControl: '#000000' },
    status: { finished: '#C4EDD3', wip: '#FBEDA9', archived: '#CCCCCC' },
  },
  dark: {
    backgrounds: {
      site: '#151C28',
      home: '#151C28',
      about: '#17251F',
      projects: '#17251F',
      tags: '#231B29',
      article: '#26282D',
      relatedProjects: '#151C28',
      code: '#1B1D22',
      inlineCode: '#34383F',
      soft: '#1E293B',
      selection: '#315A4B',
    },
    text: {
      site: { primary: '#F3F4F6' },
      article: {
        body: '#E2E8F0',
        heading: '#F1F5F9',
        link: '#F1F5F9',
        linkHover: '#8DE2BE',
        metadata: '#94A3B8',
        caption: '#94A3B8',
        code: '#F1F5F9',
        listMarker: '#64748B',
        sidebar: '#B8BDC7',
        sidebarHover: '#8DE2BE',
      },
    },
    cards: {
      standard: { background: '#26282D', text: '#F3F4F6' },
      highlight: { backgrounds: darkColors, text: '#000000' },
    },
    controls: {
      tag: { background: '#34383F', text: '#F3F4F6', hoverText: '#F3F4F6', hover: darkColors },
      projectButton: { background: '#34383F', text: '#F3F4F6', hoverText: '#F3F4F6', hover: darkColors },
      projectsButton: { background: '#34383F', text: '#F3F4F6', hoverText: '#F3F4F6', hover: darkColors },
      themeToggle: { background: '#34383F', text: '#F3F4F6', hoverText: '#F3F4F6', hover: '#4ADE80' },
      generic: { background: '#34383F', text: '#F3F4F6', hoverText: '#17191D', hover: darkColors },
    },
    accent: { navigation: '#4ADE80', focus: '#4ADE80' },
    structure: {
      border: '#101215',
      shadow: '#000000',
      articleDivider: '#334155',
      scrollbarTrack: '#151C28',
      scrollbarPattern: '#101215',
      scrollbarThumb: '#26282D',
      scrollbarArrow: '#4ADE80',
    },
    footer: { background: '#141619', text: '#F3F4F6', hover: '#4ADE80', statusControl: '#141619' },
    status: { finished: '#244435', wip: '#494022', archived: '#363A42' },
  },
} as const satisfies Record<ThemeName, ThemeColors>;

const variableNames = {
  'backgrounds.site': 'site-background',
  'backgrounds.home': 'home-background',
  'backgrounds.about': 'about-background',
  'backgrounds.projects': 'projects-background',
  'backgrounds.tags': 'tags-background',
  'backgrounds.article': 'article-background',
  'backgrounds.relatedProjects': 'related-projects-background',
  'backgrounds.code': 'code-background',
  'backgrounds.inlineCode': 'inline-code-background',
  'backgrounds.soft': 'soft-background',
  'backgrounds.selection': 'selection-background',
  'text.site.primary': 'site-text-primary',
  'text.article.body': 'article-text',
  'text.article.heading': 'article-heading',
  'text.article.link': 'article-link',
  'text.article.linkHover': 'article-link-hover',
  'text.article.metadata': 'article-metadata',
  'text.article.caption': 'article-caption',
  'text.article.code': 'article-code',
  'text.article.listMarker': 'article-list-marker',
  'text.article.sidebar': 'article-sidebar',
  'text.article.sidebarHover': 'article-sidebar-hover',
  'cards.standard.background': 'standard-card-background',
  'cards.standard.text': 'standard-card-text',
  'cards.highlight.text': 'highlight-card-text',
  'controls.tag.background': 'tag-background',
  'controls.tag.text': 'tag-text',
  'controls.tag.hoverText': 'tag-hover-text',
  'controls.projectButton.background': 'project-button-background',
  'controls.projectButton.text': 'project-button-text',
  'controls.projectButton.hoverText': 'project-button-hover-text',
  'controls.projectsButton.background': 'projects-button-background',
  'controls.projectsButton.text': 'projects-button-text',
  'controls.projectsButton.hoverText': 'projects-button-hover-text',
  'controls.themeToggle.background': 'theme-toggle-background',
  'controls.themeToggle.text': 'theme-toggle-text',
  'controls.themeToggle.hoverText': 'theme-toggle-hover-text',
  'controls.themeToggle.hover': 'theme-toggle-hover',
  'controls.generic.background': 'generic-control-background',
  'controls.generic.text': 'generic-control-text',
  'controls.generic.hoverText': 'generic-control-hover-text',
  'accent.navigation': 'navigation-accent',
  'accent.focus': 'focus',
  'structure.border': 'border',
  'structure.shadow': 'shadow',
  'structure.articleDivider': 'article-divider',
  'structure.scrollbarTrack': 'scrollbar-track',
  'structure.scrollbarPattern': 'scrollbar-pattern',
  'structure.scrollbarThumb': 'scrollbar-thumb',
  'structure.scrollbarArrow': 'scrollbar-arrow',
  'footer.background': 'footer-background',
  'footer.text': 'footer-text',
  'footer.hover': 'footer-hover',
  'footer.statusControl': 'footer-status-control',
  'status.finished': 'status-finished',
  'status.wip': 'status-wip',
  'status.archived': 'status-archived',
} as const;

const getValue = (theme: ThemeColors, path: string) =>
  path.split('.').reduce<unknown>((value, key) => (value as Record<string, unknown>)[key], theme) as string;

const declarations = (theme: ThemeColors) => [
  ...Object.entries(variableNames).map(([path, name]) => `--theme-${name}:${getValue(theme, path)}`),
  ...(['up', 'down', 'left', 'right'] as const).map((direction) => {
    const points = {
      up: '11,6 5,15 17,15',
      down: '5,8 17,8 11,17',
      left: '7,11 16,5 16,17',
      right: '8,5 17,11 8,17',
    }[direction];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23"><rect x=".5" y=".5" width="21" height="22" fill="${theme.structure.scrollbarThumb}" stroke="${theme.structure.border}"/><path d="M${points.replaceAll(' ', ' L')} Z" fill="${theme.structure.scrollbarArrow}"/></svg>`;
    return `--theme-scrollbar-${direction}:url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }),
].join(';');

export const themeStyles = `:root{color-scheme:light;${declarations(themes.light)}}html[data-theme="dark"]{color-scheme:dark;${declarations(themes.dark)}}`;
