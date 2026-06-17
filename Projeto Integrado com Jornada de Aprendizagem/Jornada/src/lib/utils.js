import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatRelativeTime(minutesAgo) {
  if (minutesAgo < 1) return "agora mesmo";
  if (minutesAgo < 60) return `há ${minutesAgo} min`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days}d`;
}
