interface ChildLabel {
  parent: string;
  child?: ChildLabel[];
  uuid: string;
  selected: boolean;
}

export interface ParentLabel {
  parent: string;
  child: ChildLabel[];
  uuid: string;
  selected: boolean;
}

export interface Props {
  interactive_labels: ParentLabel[];
}
