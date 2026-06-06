// Generic shared types only. Feature/domain models should live in shared/models or the feature folder.

export type EntityId = string | number;

export type ListResponse<T> = {
  data: Array<T>;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type SelectOption<TValue extends string | number = string> = {
  value: TValue;
  label: string;
};

export type TRoute = {
  link: string;
  title: string;
  icon?: string;
  requiresAuth?: boolean;
  children?: Array<TRoute>;
};
