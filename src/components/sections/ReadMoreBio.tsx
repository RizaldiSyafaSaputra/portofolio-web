"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ReadMoreBioProps {
  bio: string;
  maxLength?: number;
}

export default function ReadMoreBio({
  bio,
  maxLength = 200,
}: ReadMoreBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsTruncation = bio.length > maxLength;

  const displayText = isExpanded || !needsTruncation
    ? bio
    : bio.slice(0, maxLength).trimEnd() + "...";

  return (
    <div>
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: "var(--foreground-secondary)" }}
      >
        {displayText}
      </p>

      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 mt-3 text-sm font-semibold transition-colors"
          style={{ color: "var(--accent)" }}
        >
          {isExpanded ? "Sembunyikan" : "Read More"}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
}
