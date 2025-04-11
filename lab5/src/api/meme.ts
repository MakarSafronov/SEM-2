import { MemesResponse } from '../types/index';

export const getAllMemes = async (): Promise<MemesResponse> => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  return await response.json();
};
