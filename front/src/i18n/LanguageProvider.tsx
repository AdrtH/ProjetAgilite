import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LanguageContext } from "./context";
import { translateBatch, type AppLanguage } from "./translationApi";

const LANGUAGE_STORAGE_KEY = "project_agilite_language";
const TRANSLATIONS_STORAGE_KEY_PREFIX = "project_agilite_translations_";

type LanguageProviderProps = Readonly<{
  children: ReactNode;
}>;

export function LanguageProvider({ children }: LanguageProviderProps) {
  const initialLanguage = readStoredLanguage();
  const [language, setLanguageState] = useState<AppLanguage>(initialLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>(() =>
    readStoredTranslations(initialLanguage),
  );
  const [isTranslating, setIsTranslating] = useState(false);

  const pendingTextsRef = useRef<Set<string>>(new Set());
  const requestInFlightRef = useRef(false);
  const isMountedRef = useRef(true);
  const flushTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      const windowObject = globalThis.window;
      if (windowObject && flushTimeoutRef.current !== null) {
        windowObject.clearTimeout(flushTimeoutRef.current);
        flushTimeoutRef.current = null;
      }
    };
  }, []);

  const flushPendingTranslations = useCallback(async () => {
    if (language !== "en" || requestInFlightRef.current || pendingTextsRef.current.size === 0) {
      return;
    }

    requestInFlightRef.current = true;
    setIsTranslating(true);

    const batch = Array.from(pendingTextsRef.current);
    pendingTextsRef.current.clear();

    try {
      const translatedBySource = await translateBatch(batch, "fr", "en");
      if (!isMountedRef.current) {
        return;
      }

      setTranslations((previous) => {
        const next = { ...previous };
        let hasChanged = false;

        translatedBySource.forEach((translatedText, sourceText) => {
          const resolvedText =
            translatedText && translatedText.trim().length > 0 ? translatedText : sourceText;

          if (next[sourceText] === resolvedText) {
            return;
          }

          // Cache even unchanged values (e.g. proper names) to avoid retry loops.
          next[sourceText] = resolvedText;
          hasChanged = true;
        });

        return hasChanged ? next : previous;
      });
    } catch {
      // Keep source French text if API translation fails.
    } finally {
      requestInFlightRef.current = false;

      if (isMountedRef.current) {
        setIsTranslating(false);
      }

      if (pendingTextsRef.current.size > 0) {
        const windowObject = globalThis.window;
        if (windowObject && flushTimeoutRef.current === null) {
          flushTimeoutRef.current = windowObject.setTimeout(() => {
            flushTimeoutRef.current = null;
            void flushPendingTranslations();
          }, 140);
        }
      }
    }
  }, [language]);

  useEffect(() => {
    const storage = globalThis.window?.localStorage;
    if (storage) {
      storage.setItem(LANGUAGE_STORAGE_KEY, language);
    }

    const documentElement = globalThis.document?.documentElement;
    if (documentElement) {
      documentElement.lang = language;
    }

    if (language !== "en") {
      pendingTextsRef.current.clear();
      const windowObject = globalThis.window;
      if (windowObject && flushTimeoutRef.current !== null) {
        windowObject.clearTimeout(flushTimeoutRef.current);
        flushTimeoutRef.current = null;
      }
      setIsTranslating(false);
      return;
    }

    setTranslations((previous) => {
      if (Object.keys(previous).length > 0) {
        return previous;
      }

      const storedTranslations = readStoredTranslations("en");
      return Object.keys(storedTranslations).length > 0 ? storedTranslations : previous;
    });
  }, [language]);

  useEffect(() => {
    if (language !== "en") {
      return;
    }

    const storage = globalThis.window?.localStorage;
    if (!storage) {
      return;
    }

    storage.setItem(
      `${TRANSLATIONS_STORAGE_KEY_PREFIX}${language}`,
      JSON.stringify(translations),
    );
  }, [language, translations]);

  const setLanguage = useCallback((nextLanguage: AppLanguage) => {
    const storage = globalThis.window?.localStorage;
    if (storage) {
      storage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    }

    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((language === "fr" ? "en" : "fr") as AppLanguage);
  }, [language, setLanguage]);

  const t = useCallback(
    (text: string): string => {
      if (language !== "en") {
        return text;
      }

      if (text.trim().length === 0) {
        return text;
      }

      const translatedText = translations[text];
      if (translatedText) {
        return translatedText;
      }

      pendingTextsRef.current.add(text);

      const windowObject = globalThis.window;
      if (windowObject && flushTimeoutRef.current === null) {
        flushTimeoutRef.current = windowObject.setTimeout(() => {
          flushTimeoutRef.current = null;
          void flushPendingTranslations();
        }, 140);
      }

      return text;
    },
    [flushPendingTranslations, language, translations],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isTranslating,
    }),
    [isTranslating, language, setLanguage, t, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function readStoredLanguage(): AppLanguage {
  const storedValue = globalThis.window?.localStorage?.getItem(LANGUAGE_STORAGE_KEY);
  return storedValue === "en" ? "en" : "fr";
}

function readStoredTranslations(language: AppLanguage): Record<string, string> {
  if (language !== "en") {
    return {};
  }

  const rawValue = globalThis.window?.localStorage?.getItem(
    `${TRANSLATIONS_STORAGE_KEY_PREFIX}${language}`,
  );

  if (!rawValue) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawValue) as Record<string, string>;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}
