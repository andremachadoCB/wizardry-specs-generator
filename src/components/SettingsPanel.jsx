import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languageOptions } from '../utils/languageOptions';

const SettingsPanel = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="language-select" className="mr-2 text-sm font-medium text-gray-700">
        Language:
      </label>
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger id="language-select" className="w-[180px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SettingsPanel;
