export type ThemeName = 'light' | 'dark';

export interface ThemeColors {
  backgrounds: {
    page: readonly string[];
    surface: string;
    control: string;
    code: string;
    inlineCode: string;
    selection: string;
  };
  text: {
    primary: string;
    secondary: string;
    caption: string;
    control: string;
    hover: string;
  };
  accent: {
    primary: string;
    hover: readonly string[];
    focus: string;
  };
  structure: {
    border: string;
    shadow: string;
    divider: string;
    scrollbarTrack: string;
    scrollbarPattern: string;
    scrollbarThumb: string;
    scrollbarArrow: string;
  };
  footer: {
    background: string;
    text: string;
  };
  status: {
    finished: string;
    wip: string;
    archived: string;
  };
}

export const themes = {
  light: {
    backgrounds: {
      page: ['#60A5FA', '#4ADE80', '#C084FC'],
      surface: '#FFFFFF',
      control: '#FFFFFF',
      code: '#F1F5F9',
      inlineCode: '#E2E8F0',
      selection: '#F0F8FF',
    },
    text: {
      primary: '#000000',
      secondary: '#475569',
      caption: '#666666',
      control: '#000000',
      hover: '#17191D',
    },
    accent: {
      primary: '#22C55E',
      hover: ['#C084FC', '#F472B6', '#FB7185', '#E879F9', '#A78BFA', '#818CF8', '#60A5FA', '#38BDF8', '#22D3EE', '#2DD4BF', '#34D399', '#4ADE80', '#A3E635', '#FACC15', '#FB923C', '#F87171'],
      focus: '#000000',
    },
    structure: {
      border: '#000000',
      shadow: '#000000',
      divider: '#CBD5E1',
      scrollbarTrack: '#FFFFFF',
      scrollbarPattern: '#000000',
      scrollbarThumb: '#FFFFFF',
      scrollbarArrow: '#000000',
    },
    footer: {
      background: '#000000',
      text: '#FFFFFF',
    },
    status: {
      finished: '#C4EDD3',
      wip: '#FBEDA9',
      archived: '#CCCCCC',
    },
  },
  dark: {
    backgrounds: {
      page: ['#151C28', '#231B29', '#17251F', '#152529'],
      surface: '#26282D',
      control: '#34383F',
      code: '#1B1D22',
      inlineCode: '#34383F',
      selection: '#315A4B',
    },
    text: {
      primary: '#F3F4F6',
      secondary: '#B8BDC7',
      caption: '#A8AFBA',
      control: '#F3F4F6',
      hover: '#17191D',
    },
    accent: {
      primary: '#8DE2BE',
      hover: ['#8DE2BE', '#C4B5FD', '#93C5FD', '#F9A8D4', '#FCD34D'],
      focus: '#8DE2BE',
    },
    structure: {
      border: '#101215',
      shadow: '#000000',
      divider: '#4A4E56',
      scrollbarTrack: '#151C28',
      scrollbarPattern: '#101215',
      scrollbarThumb: '#26282D',
      scrollbarArrow: '#8DE2BE',
    },
    footer: {
      background: '#141619',
      text: '#F3F4F6',
    },
    status: {
      finished: '#244435',
      wip: '#494022',
      archived: '#363A42',
    },
  },
} as const satisfies Record<ThemeName, ThemeColors>;

const variableNames = {
  'backgrounds.surface': 'surface',
  'backgrounds.control': 'control-background',
  'backgrounds.code': 'code-background',
  'backgrounds.inlineCode': 'inline-code-background',
  'backgrounds.selection': 'selection-background',
  'text.primary': 'text-primary',
  'text.secondary': 'text-secondary',
  'text.caption': 'caption-color',
  'text.control': 'control-text',
  'text.hover': 'hover-text',
  'accent.primary': 'accent',
  'accent.focus': 'focus',
  'structure.border': 'border',
  'structure.shadow': 'shadow',
  'structure.divider': 'divider',
  'structure.scrollbarTrack': 'scrollbar-track',
  'structure.scrollbarPattern': 'scrollbar-pattern',
  'structure.scrollbarThumb': 'scrollbar-thumb',
  'structure.scrollbarArrow': 'scrollbar-arrow',
  'footer.background': 'footer-background',
  'footer.text': 'footer-text',
  'status.finished': 'status-finished',
  'status.wip': 'status-wip',
  'status.archived': 'status-archived',
} as const;

const getValue = (theme: ThemeColors, path: string) =>
  path.split('.').reduce<unknown>((value, key) => (value as Record<string, unknown>)[key], theme) as string;

const declarations = (theme: ThemeColors) =>
  [
    ...Object.entries(variableNames)
    .map(([path, name]) => `--theme-${name}:${getValue(theme, path)}`)
    ,
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
