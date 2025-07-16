export class PageDto<T> {
  content: T[];
  total: number;
  page: number;
  pageSize: number;
}
