const RoleType = Object.freeze({
    USER: 'user',
    MODEL: 'model',
});

export const RoleTypeValues = Object.freeze(Object.values(RoleType));

export const RoleTypeLabels = Object.freeze({
    [RoleType.USER]: 'User',
    [RoleType.MODEL]: 'Model',
});

export default RoleType;