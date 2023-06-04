declare namespace ICommon {
  export type WithMusicList<T> = T & {
    musicList?: IMusic.IMusicItem[];
  };

  export type PaginationResponse<T> = {
    isEnd?: boolean;
    data?: T[];
  };
}