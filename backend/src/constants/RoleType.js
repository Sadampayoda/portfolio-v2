import { ModelStage } from "@google/genai";

const ProjectType = Object.freeze({
    USER: 'user',
    ModelStage: 'model',
});

export const ProjectTypeValues = Object.freeze(Object.values(ProjectType));

export const ProjectTypeLabels = Object.freeze({
    [ProjectType.HOSTING]: 'User',
    [ProjectType.NON_HOSTING]: 'Model',
});

export default ProjectType;