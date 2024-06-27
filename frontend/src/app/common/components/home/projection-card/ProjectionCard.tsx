import React from 'react';
import { ProjectionCardProps } from './projectionCard.d';

const ProjectionCard: React.FC<ProjectionCardProps> = ({ graph, title }) => {
  return (
    <div className="bg-white rounded-xl dark:text-slate-900 p-4">
      <h1 className="font-bold text-xl mb-4">{title}</h1>
      <div className="w-full">{graph}</div>
    </div>
  );
};

export default ProjectionCard;
