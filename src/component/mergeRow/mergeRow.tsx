import { useState } from 'react';
import {
    Grid,
    GridColumn,
    type GridCellProps
} from '@progress/kendo-react-grid';

import { employees } from './employees';

interface FlatRow {
    id: string;
    empId: string;
    full_name: string;
    job_title: string;
    country: string;
    address: string;
    phone: string;
    project_name: string;
    project_role: string;
    _rowSpan: number;
    _isFirst: boolean;
    _hasMore: boolean; // employee has >1 project (show expand icon)
}

export default function MergeRow() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggle = (empId: string) => {
        setExpanded((prev) => ({ ...prev, [empId]: !prev[empId] }));
    };

    // Build flat rows based on current expand state
    const flattenData = (): FlatRow[] => {
        const rows: FlatRow[] = [];

        employees.forEach((emp: any) => {
            const allProjects = emp.projects?.length ? emp.projects : [{}];
            const isExpanded = !!expanded[emp.id];

            // Collapsed -> only first project row; Expanded -> all rows
            const visibleProjects = isExpanded
                ? allProjects
                : allProjects.slice(0, 1);

            visibleProjects.forEach((project: any, index: number) => {
                rows.push({
                    id: `${emp.id}-${project.id ?? index}`,
                    empId: emp.id,
                    full_name: emp.full_name,
                    job_title: emp.job_title,
                    country: emp.country,
                    address: emp.address,
                    phone: emp.phone,
                    project_name: project.full_name ?? '',
                    project_role: project.role ?? '',
                    _rowSpan: visibleProjects.length,
                    _isFirst: index === 0,
                    _hasMore: allProjects.length > 1
                });
            });
        });

        return rows;
    };

    const data = flattenData();

    // Merged cell for employee-level columns
    const MergedCell = (props: GridCellProps) => {
        const { dataItem, field } = props;

        // if (!dataItem._isFirst) {
        //     return null; // covered by previous row's rowSpan
        // }

        return (
            <td rowSpan={dataItem._rowSpan} style={{ verticalAlign: 'top' }}>
                {field ? dataItem[field] : null}
            </td>
        );
    };

    // Expand/collapse icon cell (only meaningful on first row of a group)
    const ExpandCell = (props: GridCellProps) => {
        const { dataItem } = props;

        // if (!dataItem._isFirst) {
        //     return null;
        // }

        return (
            <td rowSpan={dataItem._rowSpan} style={{ verticalAlign: 'top' }}>
                {dataItem._hasMore ? (
                    <button
                        onClick={() => toggle(dataItem.empId)}
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        {expanded[dataItem.empId] ? '▼' : '▶'}
                    </button>
                ) : null}
            </td>
        );
    };

    const employeeColumns = [
        { title: 'Full Name', field: 'full_name', width: 160 },
        { title: 'Job Title', field: 'job_title', width: 160 },
        { title: 'Country', field: 'country', width: 160 },
        { title: 'Address', field: 'address', width: 160 },
        { title: 'Phone', field: 'phone', width: 160 }
    ];

    const projectColumns = [
        { title: 'Project Name', field: 'project_name', width: 160 },
        { title: 'Role', field: 'project_role', width: 160 }
    ];

    return (
        <div>
            <h3>Merge Row (Expand/Collapse)</h3>

            <Grid
                style={{ height: '400px' }}
                dataItemKey="id"
                data={data}
                sortable={false}
                filterable={false}
            >
                <GridColumn
                    title=""
                    width={40}
                    cell={ExpandCell}
                />

                {employeeColumns.map((column) => (
                    <GridColumn
                        key={column.field}
                        field={column.field}
                        title={column.title}
                        width={column.width}
                        cell={MergedCell}
                    />
                ))}

                {projectColumns.map((column) => (
                    <GridColumn
                        key={column.field}
                        field={column.field}
                        title={column.title}
                        width={column.width}
                    />
                ))}
            </Grid>
        </div>
    );
}