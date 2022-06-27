/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCPF } from '@brazilian-utils/brazilian-utils';
import React, { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import { HiTrash, HiPencil } from 'react-icons/hi';
import { IUser } from '../../interfaces';
import formatDate from '../../utils/formatDate';
import './styles.scss';

export interface IColumn {
  isCenter?: boolean;
  isDate?: boolean;
  isCpf?: boolean;
  key: string;
  label: string;
  hidden?: boolean;
}

export interface DataTableProps {
  data: IUser[];
  hasActions: boolean;
  columns: IColumn[];
  emptyMessage?: string;
  editAction?: (id: string) => void;
  deleteModal?: (id: string) => void;
  size?: string;
}

const DataTable = ({
  data = [],
  hasActions = false,
  columns = [],
  emptyMessage = 'Nenhum item encontrado',
  editAction,
  deleteModal,
  size = 'md',
}: DataTableProps): React.ReactElement => {
  const headers = useMemo(() => {
    const ths = columns.map((item) => (
      <th className={item.isCenter ? 'text-center' : ''} key={item.label}>
        {item.label}
      </th>
    ));

    if (hasActions)
      ths.push(
        <th key="table_action" className="table__actions">
          Ações
        </th>
      );

    return <tr>{ths}</tr>;
  }, [columns, hasActions]);

  const rows = useMemo(() => {
    if (!data.length) {
      return (
        <tr>
          <td key="empty_message" colSpan={10}>
            {emptyMessage}
          </td>
        </tr>
      );
    }

    const trs = data.map((row) => {
      const tds = columns.map(({ isCenter, key, isDate, isCpf }) => {
        let value = (row as any)[key];

        if (isDate) {
          value = formatDate((row as any)[key]);
        }

        if (isCpf) {
          value = formatCPF((row as any)[key]);
        }

        if (key === 'permission') {
          value = row.permission === 'admin' ? 'Administrador' : 'Colaborador';
        }

        const classCenter = isCenter ? 'text-center' : '';
        return (
          <td key={`${Math.random() * data.length}`} className={classCenter}>
            {value}
          </td>
        );
      });

      if (hasActions) {
        tds.push(
          <td key={`${row.id}_action`} className="table__actions">
            <HiPencil
              size={17}
              color="#00a"
              className="table__icon-update table__icon-svg"
              onClick={() => editAction && editAction(row.id)}
            />
            <HiTrash
              size={17}
              color="#ff0000"
              className="table__icon-trash table__icon-svg"
              onClick={() => deleteModal && deleteModal(row.id)}
            />
          </td>
        );
      }
      return <tr key={row.id}>{tds}</tr>;
    });

    return trs;
  }, [data, columns, emptyMessage, hasActions, editAction, deleteModal]);

  return (
    <>
      <Table responsive bordered hover size={size} className="table">
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default DataTable;
