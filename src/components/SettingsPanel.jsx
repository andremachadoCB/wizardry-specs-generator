import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languageOptions } from '../utils/languageOptions';

const SettingsPanel = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Settings</h2>
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <Label htmlFor="output-language" className="mb-1">Output Language</Label>
          <Select id="output-language" value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Language" />
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