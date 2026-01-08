import { ChevronDown, ChevronRight, Table } from 'lucide-react';
import { useState } from 'react';

const DatabaseSchema = ({ database }) => {
  const [expandedTables, setExpandedTables] = useState({});

  const toggleTable = (tableName) => {
    setExpandedTables(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  return (
    <div className="database-schema">
      <div className="schema-header">
        <h4>Practice Database</h4>
        <span className="tables-count">{Object.keys(database.tables).length} tables</span>
      </div>
      
      <div className="tables-list">
        {Object.entries(database.tables).map(([tableName, table]) => (
          <div key={tableName} className="table-schema">
            <div 
              className="table-header"
              onClick={() => toggleTable(tableName)}
            >
              {expandedTables[tableName] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <Table size={16} />
              <span className="table-name">{tableName}</span>
              <span className="row-count">{table.rows.length} rows</span>
            </div>
            
            {expandedTables[tableName] && (
              <div className="table-columns">
                {table.columns.map((column, index) => (
                  <div key={index} className="column-item">
                    <div className="column-name">{column}</div>
                    <div className="column-type">VARCHAR</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="schema-footer">
        <p className="schema-info">
          This is a sample database for practice. You can query these tables.
        </p>
      </div>
    </div>
  );
};

export default DatabaseSchema;