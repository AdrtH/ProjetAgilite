export type AppLanguage = "fr" | "en";

const DEFAULT_TRANSLATE_API_URL = "/api/deepl";

const translateApiUrl = (
  import.meta.env.VITE_TRANSLATE_API_URL ?? DEFAULT_TRANSLATE_API_URL
).trim();
const translateApiKey = (import.meta.env.VITE_TRANSLATE_API_KEY ?? "").trim();

type LibreTranslatePayload = {
  translatedText?: string | string[];
};

type LibreTranslateItem = {
  translatedText?: string;
};

type DeepLResponse = {
  translations?: Array<{
    text?: string;
  }>;
};

export async function translateBatch(
  texts: string[],
  sourceLanguage: AppLanguage,
  targetLanguage: AppLanguage,
): Promise<Map<string, string>> {
  if (sourceLanguage === targetLanguage) {
    return new Map();
  }

  const sourceTexts = Array.from(new Set(texts.filter((text) => text.trim().length > 0)));
  if (sourceTexts.length === 0) {
    return new Map();
  }

  if (isDeepLApiUrl(translateApiUrl)) {
    return translateWithDeepL(sourceTexts, sourceLanguage, targetLanguage);
  }

  return translateWithLibreTranslate(sourceTexts, sourceLanguage, targetLanguage);
}

async function translateWithDeepL(
  sourceTexts: string[],
  sourceLanguage: AppLanguage,
  targetLanguage: AppLanguage,
): Promise<Map<string, string>> {
  const payload = new URLSearchParams();
  sourceTexts.forEach((text) => payload.append("text", text));
  payload.set("source_lang", toDeepLLanguage(sourceLanguage));
  payload.set("target_lang", toDeepLLanguage(targetLanguage));
  if (translateApiKey) {
    payload.set("auth_key", translateApiKey);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (translateApiKey && !translateApiUrl.startsWith("/")) {
    headers.Authorization = `DeepL-Auth-Key ${translateApiKey}`;
  }

  const response = await fetch(resolveDeepLEndpoint(translateApiUrl), {
    method: "POST",
    headers,
    body: payload.toString(),
  });

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.status}`);
  }

  const body = (await response.json()) as DeepLResponse;
  const translatedTexts =
    body.translations?.map((item) => item.text ?? "").slice(0, sourceTexts.length) ?? [];

  if (translatedTexts.length !== sourceTexts.length) {
    throw new Error("DeepL API response mismatch.");
  }

  const translatedBySource = new Map<string, string>();
  sourceTexts.forEach((sourceText, index) => {
    translatedBySource.set(sourceText, decodeHtmlEntities(translatedTexts[index] ?? sourceText));
  });

  return translatedBySource;
}

async function translateWithLibreTranslate(
  sourceTexts: string[],
  sourceLanguage: AppLanguage,
  targetLanguage: AppLanguage,
): Promise<Map<string, string>> {
  const payload: {
    q: string[];
    source: AppLanguage;
    target: AppLanguage;
    format: "text";
    api_key?: string;
  } = {
    q: sourceTexts,
    source: sourceLanguage,
    target: targetLanguage,
    format: "text",
  };

  if (translateApiKey) {
    payload.api_key = translateApiKey;
  }

  const response = await fetch(translateApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Translate API error: ${response.status}`);
  }

  const body = (await response.json()) as
    | LibreTranslatePayload
    | LibreTranslateItem[]
    | string[];
  const translatedTexts = extractTranslatedTexts(body, sourceTexts.length);

  if (translatedTexts.length !== sourceTexts.length) {
    throw new Error("Translate API response mismatch.");
  }

  const translatedBySource = new Map<string, string>();
  sourceTexts.forEach((sourceText, index) => {
    translatedBySource.set(sourceText, decodeHtmlEntities(translatedTexts[index] ?? sourceText));
  });

  return translatedBySource;
}

function isDeepLApiUrl(url: string): boolean {
  if (url.startsWith("/api/deepl")) {
    return true;
  }

  try {
    return new URL(url).hostname.endsWith("deepl.com");
  } catch {
    return url.includes("deepl.com");
  }
}

function resolveDeepLEndpoint(url: string): string {
  const normalized = url.replace(/\/+$/, "");
  if (normalized.endsWith("/translate")) {
    return normalized;
  }

  return `${normalized}/translate`;
}

function toDeepLLanguage(language: AppLanguage): "FR" | "EN" {
  return language === "fr" ? "FR" : "EN";
}

function extractTranslatedTexts(
  payload: LibreTranslatePayload | LibreTranslateItem[] | string[],
  expectedLength: number,
): string[] {
  if (Array.isArray(payload)) {
    const values = payload
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return item.translatedText ?? "";
      })
      .slice(0, expectedLength);

    if (values.length === expectedLength) {
      return values;
    }
  }

  if (!Array.isArray(payload) && Array.isArray(payload.translatedText)) {
    return payload.translatedText.slice(0, expectedLength);
  }

  if (!Array.isArray(payload) && typeof payload.translatedText === "string") {
    return [payload.translatedText];
  }

  return [];
}

function decodeHtmlEntities(value: string): string {
  const documentObject = globalThis.document;
  if (!documentObject) {
    return value;
  }

  const textArea = documentObject.createElement("textarea");
  textArea.innerHTML = value;
  return textArea.value;
}
