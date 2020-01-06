import i18n from 'i18n-js';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en';
import ru from './locales/ru';
import fr from './locales/fr';
import de from './locales/de';
import ptBR from './locales/pt-BR';
import zhCN from './locales/zh-CN';
import ptPT from './locales/pt-PT';

i18n.translations = {
	'zh-CN': zhCN,
	'pt-BR': ptBR,
	en,
	ru,
	fr,
	de,
	'pt-PT': ptPT
};
i18n.fallbacks = true;

const defaultLanguage = { languageTag: 'zh-CN', isRTL: false };
const availableLanguages = Object.keys(i18n.translations);
const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(availableLanguages) || defaultLanguage;

I18nManager.forceRTL(isRTL);
i18n.locale = languageTag;

export default i18n;
