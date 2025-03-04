import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
interface Column {
  id: string
  label: string
  minWidth?: number
  align?: "right"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string
}

interface TableProps {
  columns: Column[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: { [key: string]: any }[]
}

export default function Table({ columns, rows }: TableProps) {
  return (
    <TableContainer component={Paper}>
      <MuiTable stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column) => {
                  const value = row[column.id]
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

