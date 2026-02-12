export type Package = {
  id: 'core' | 'pro' | 'onDemand';
  title: string;
  description: string;
  price: string;
  isFeatured?: boolean;
};
