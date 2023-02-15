import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

export default function App() {
  const [first1, setFirst1] = useState(0);
  const [rows1, setRows1] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };

  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst1(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const template1 = {
    layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
    'PrevPageLink': (options) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="p-3">Previous</span>
                <Ripple />
            </button>
        )
    },
    'NextPageLink': (options) => {
        return (
            <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                <span className="p-3">Next</span>
                <Ripple />
            </button>
        )
    },
    'PageLinks': (options) => {
        if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
            const className = classNames(options.className, { 'p-disabled': true });

            return <span className={className} style={{ userSelect: 'none' }}>...</span>;
        }

        return (
            <button type="button" className={options.className} onClick={options.onClick}>
                {options.page + 1}
                <Ripple />
            </button>
        )
    },
    'RowsPerPageDropdown': (options) => {
        const dropdownOptions = [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 50, value: 50 },
            { label: 'All', value: options.totalRecords }
        ];

        return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
    },
    'CurrentPageReport': (options) => {
        return (
            <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                Go to <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                    onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
            </span>
        )
    }
};

  const DATA = [
    {
      id: <button value="1">View Document</button>,
      name: "Mainor",
      age: "27",
      city: "SPS",
      ocuppation: "Engineer",
    },
    {
      id: 2,
      name: "Victoria",
      age: "26",
      city: "SPS",
      ocuppation: "Doctor",
    },
    {
      id: 3,
      name: "Agatha",
      age: "3",
      city: "SPS",
      ocuppation: "Cat",
    },
    {
      id: 4,
      name: "Romi",
      age: "5",
      city: "SPS",
      ocuppation: "Cat",
    },
    {
      id: 5,
      name: "Cookie",
      age: "5",
      city: "SPS",
      ocuppation: "Dog",
    },
  ];

  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "NAME" },
    { field: "age", header: "AGE" },
    { field: "ocuppation", header: "OCCUPATION" },
  ];

  const dynamicColumns = columns.map((col, i) => {
    const value = col.field !== "id" ? true : false;
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        sortable={value}
      />
    );
  });

  const footer = `In total there are ${DATA ? DATA.length : 0} entries.`;

  return (
    <div>
      <DataTable
        value={DATA}
        stripedRows
        removableSort
        footer={footer}
        paginator paginatorTemplate={template1} first={first1} rows={rows1} onPage={onCustomPage1}
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
}
