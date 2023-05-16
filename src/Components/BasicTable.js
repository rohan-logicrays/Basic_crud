import React, { useMemo, useEffect } from "react";
import { COLUMNS } from "./columns";
import { useTable, useSortBy, useGlobalFilter, useFilters,usePagination,useRowSelect } from "react-table";
import { GlobalFilter } from "./GlobalFilter"
import { useSelector,useDispatch } from "react-redux";
import { CheckBox } from "./CheckBox";
import {removeData} from "../store/dataSlice"

export const BasicTable = () => {
  const dispatch = useDispatch()
  const items = useSelector(({ user }) => user);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => items.items, [items]);
  const TableInstance = useTable(
    {
      columns,
      data,
      initialState:{pageSize:3}

      
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks)=>{
      hooks.visibleColumns.push((columns)=>{
        return [
          {
            name:"selection",
            Header:({getToggleAllRowsSelectedProps})=>(
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell:({row})=>(
              <CheckBox {...row.getToggleRowSelectedProps()}/>
            )
          },
          ...columns
        ]
      })
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    pageOptions,
    state,
    setGlobalFilter,
    selectedFlatRows
    
    
  } = TableInstance;
  const { globalFilter,pageIndex } = state;

  useEffect(()=>{
    if(selectedFlatRows.length){
    let deletedData=selectedFlatRows.map(
      d => d.original.name
    )
    console.log("deletedData",deletedData);
    }
  },[selectedFlatRows])
  const handleSelectedDelete = ()=>{
    let deletedData = selectedFlatRows.map(
      d =>dispatch(removeData(d.original.name))
    )

  }
  return (
    <div className="container">
    <button style={{width:"80px",height:"35px"}} onClick={handleSelectedDelete}>Delete Selected</button>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "⬇️" : "🔝") : ""}
                  </span>
                  <div>{column.canFilter ? column.render('Filter'):null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
            page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
        </span>
        <span>
            | Go to page:{' '}
            <input type="number" defaultValue={pageIndex+1}
                onChange={e=>{
                    const pageNumber = e.target.value ? Number(e.target.value)-1 : 0
                    gotoPage(pageNumber)
                }}
                style={{width:"50px"}}
            />
        </span>
        <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>
        <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previos</button>
        <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{">>"}</button>
      </div>
      
    </div>
  );
};
