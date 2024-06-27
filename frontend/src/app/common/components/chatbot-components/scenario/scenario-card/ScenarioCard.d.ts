export type ScenarioCardProps = {
  id: string;
  name: string;
  isActive?: boolean;
  numberOfQuestions: number;
  // eslint-disable-next-line no-unused-vars
  handleSelect?: (id: string | number) => void;
};
