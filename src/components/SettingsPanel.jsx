import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languageOptions } from '../utils/languageOptions';

const SettingsPanel = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger id="language-select">
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
      </div>
    </div>
  );
};

export default SettingsPanel;