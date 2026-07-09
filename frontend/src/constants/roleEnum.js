const RoleType = Object.freeze({
    USER: 'user',
    MODEL: 'model',
});

export const RoleTypeLabels = Object.freeze({
    [RoleType.USER]: 'User',
    [RoleType.MODEL]: 'Model',
});

export default RoleType;