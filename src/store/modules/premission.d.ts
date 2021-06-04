export enum PermissionMutationType{
    SET_ROUTES = 'SET_ROUTES'
}

export enum PermissionActionType{
    ACTION_SET_ROUTES = 'ACTION_SET_ROUTES'
}

export type Mutations<S = PermissionState> = {
    [PermissionMutationType.SET_ROUTES](state: S, routes: RouteRecordRaw[]): void
}
  
