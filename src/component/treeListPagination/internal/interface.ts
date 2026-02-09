import type { FilterDescriptor, SortDescriptor } from "@progress/kendo-data-query";

export interface Employee {
    id: number,
    name: string,
    reportsTo?: null | number,
    phone?: string,
    extension?: number,
    hireDate?: Date,
    fullTime: boolean,
    position: string,
    timeInPosition?: number,
    employees?: Employee[],
    inEdit?: boolean,
    isNew?: boolean
}

export interface DataState {
    sort: SortDescriptor[],
    filter: FilterDescriptor[]
}

export interface AppState {
    data: Employee[];
    dataState: DataState;
    expanded: number[];
    editId?: number | null;
}