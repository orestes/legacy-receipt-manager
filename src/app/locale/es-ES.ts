import { formatLocale, FormatLocaleObject } from 'd3-format';

export const locale: FormatLocaleObject = formatLocale({
  'decimal': ',',
  'thousands': '.',
  'grouping': [3],
  'currency': ['', '\u00a0€']
});
