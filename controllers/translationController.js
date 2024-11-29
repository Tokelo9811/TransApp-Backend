import axios from "axios";
import { isSupportedLanguage } from "../model/languageModel.js"; // Import using ES module syntax
import dotenv from "dotenv";

dotenv.config();

const translateText = async (req, res) => {
  const { text, targetLang } = req.body;

  if (!isSupportedLanguage(targetLang)) {
    return res.status(400).json({ error: "Unsupported language code" });
  }

  const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLang,
    });

    const translatedText = response.data.data.translations[0].translatedText;
    res.status(200).json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
};

export { translateText };
