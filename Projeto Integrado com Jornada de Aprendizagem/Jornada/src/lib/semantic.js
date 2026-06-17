

const COLORS = {
  good: "#16a34a",
  mid: "#e5a435",
  warn: "#ea7c2c",
  crit: "#d7282f",
};

const TINTS = {
  good: "#dcfce7",
  mid: "#fef3c7",
  warn: "#ffeed5",
  crit: "#fce6e7",
};

export function semanticColor(value, scale = "good-high") {
  if (scale === "good-high") {
    if (value >= 75) return COLORS.good;
    if (value >= 50) return COLORS.mid;
    if (value >= 25) return COLORS.warn;
    return COLORS.crit;
  }
  if (value >= 90) return COLORS.crit;
  if (value >= 75) return COLORS.warn;
  if (value >= 50) return COLORS.mid;
  return COLORS.good;
}

export function semanticTint(value, scale = "good-high") {
  if (scale === "good-high") {
    if (value >= 75) return TINTS.good;
    if (value >= 50) return TINTS.mid;
    if (value >= 25) return TINTS.warn;
    return TINTS.crit;
  }
  if (value >= 90) return TINTS.crit;
  if (value >= 75) return TINTS.warn;
  if (value >= 50) return TINTS.mid;
  return TINTS.good;
}


export const SEMANTIC_GRADIENT =
  "linear-gradient(90deg, #d7282f 0%, #ea7c2c 33%, #e5a435 66%, #16a34a 100%)";
