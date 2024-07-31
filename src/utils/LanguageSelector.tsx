import React, { ChangeEvent } from "react";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => (
  <select
    value={selectedLanguage}
    onChange={onLanguageChange}
    className="border rounded p-2 h-14"
  >
    <option value="en">English</option>
    <option value="hi">Hindi</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
  </select>
);

export default LanguageSelector;
