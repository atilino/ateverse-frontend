export interface TagCategory{
  name: string;
  multiSelect: boolean;
}

export interface Tag {
  name: string;
  categoryId: string;
}