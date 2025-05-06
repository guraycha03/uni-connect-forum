// lib/utils.ts

// lib/utils.ts
export const cn = (...args: any[]): string => {
    return args.filter(Boolean).join(' ');
  };