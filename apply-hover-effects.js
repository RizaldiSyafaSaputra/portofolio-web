const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src/components/sections');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Make backgrounds less dark to stand out from pure black, and add neon hover effects.
  
  // 1. Target typical card backgrounds
  const cardRegexes = [
    /bg-neutral-950\/40 border border-white\/10/g,
    /bg-neutral-950\/50 border border-white\/10/g,
    /bg-neutral-950\/80 border border-white\/10/g,
    /bg-black\/40 border border-white\/10/g,
    /bg-black\/50 border border-white\/10/g,
    /bg-black\/80 border border-white\/10/g,
    /bg-slate-900\/50 border border-white\/10/g,
    /bg-slate-900\/80 border border-white\/10/g,
    /bg-neutral-900\/50 border border-white\/10/g,
    /bg-neutral-900\/80 border border-white\/10/g,
  ];

  const glassNeonHover = "bg-white/[0.02] border border-white/5 hover:border-cyan-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500";

  cardRegexes.forEach(regex => {
    content = content.replace(regex, glassNeonHover);
  });

  // 2. Remove base `bg-black` from section tags so the ambient layout background can shine through.
  // Many sections have `className="py-24 bg-black relative...`
  content = content.replace(/className="([^"]*)bg-black ([^"]*)"/g, 'className="$1$2"');
  content = content.replace(/className="([^"]*) bg-black([^"]*)"/g, 'className="$1$2"');
  // Specifically for template literals
  content = content.replace(/bg-black /g, '');

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
  }
});

console.log('Modified ' + changedCount + ' files in sections folder.');
