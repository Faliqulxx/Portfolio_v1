"use client";

import SuggestionChips from "./SuggestionChips";
import { getFollowUpSuggestions } from "./follow-up-data";

export default function FollowUpSuggestions({
  lastMessage,
  onSelect,
}: {
  lastMessage: string;
  onSelect: (text: string) => void;
}) {
  const suggestions = getFollowUpSuggestions(lastMessage);
  if (suggestions.length === 0) return null;

  return (
    <div className="pl-1 pt-1">
      <SuggestionChips items={suggestions} onSelect={onSelect} />
    </div>
  );
}