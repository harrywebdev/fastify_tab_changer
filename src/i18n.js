// i18n support for loading translations
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cache for translations
const translationsCache = new Map();

export async function getTranslations(locale) {
  // Default to English if locale is not specified
  const targetLocale = locale || 'en';
  
  // Return cached translations if available
  if (translationsCache.has(targetLocale)) {
    return translationsCache.get(targetLocale);
  }
  
  try {
    // Attempt to load translations for requested locale
    const translationsPath = join(dirname(__dirname), 'i18n', `${targetLocale}.json`);
    const translationsData = await readFile(translationsPath, 'utf8');
    const translations = JSON.parse(translationsData);
    
    // Cache the translations
    translationsCache.set(targetLocale, translations);
    
    return translations;
  } catch (error) {
    console.error(`Error loading translations for ${targetLocale}:`, error);
    
    // Fall back to English if the requested locale fails
    if (targetLocale !== 'en') {
      console.log(`Falling back to English translations`);
      return getTranslations('en');
    }
    
    // If even English fails, return an empty object
    return {};
  }
}
