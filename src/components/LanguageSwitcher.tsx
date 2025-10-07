import { useI18n } from '@/hooks/useI18n';

const languageNames: Record<string, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français'
};

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, supportedLanguages } = useI18n();

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
      >
        <span className="text-lg">🌐</span>
        <span className="text-sm font-medium">{languageNames[currentLanguage]}</span>
      </button>
      
      <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {supportedLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`w-full px-4 py-2 text-left text-sm transition-colors ${
              currentLanguage === lang
                ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            } first:rounded-t-lg last:rounded-b-lg`}
          >
            {languageNames[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}