import Console from 'console';

export const log = (msg: string, meta?: string) =>
  Console.log(msg + meta?.toString());
