const ProjectType = Object.freeze({
    HOSTING: 'hosting',
    NON_HOSTING: 'non-hosting',
});

export const ProjectTypeValues = Object.freeze(Object.values(ProjectType));

export const ProjectTypeLabels = Object.freeze({
    [ProjectType.HOSTING]: 'Hosting',
    [ProjectType.NON_HOSTING]: 'Non-Hosting',
});

export default ProjectType;