export type LMStudioModel = {
  id: string;
  object: string;
  owned_by: string;
};

export type LMStudioModelList = {
  data: LMStudioModel[];
  object: string;
};
