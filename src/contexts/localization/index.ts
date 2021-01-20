import { LanguageProvider } from "./context";
import { useLocalization } from "./hooks";
import { Languages } from "./languages";
import { Language } from "./types";

export default LanguageProvider;
export { useLocalization, Languages };
export type { Language };