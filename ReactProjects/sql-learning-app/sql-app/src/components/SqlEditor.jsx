import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { Play, RotateCcw, Copy, Download } from 'lucide-react';

const SqlEditor = ({ 
  initialCode = '', 
  onRun, 
  onReset, 
  results = null,
  isLoading = false 
}) => {
  const [code, setCode] = useState(initialCode);
  const [editorHeight, setEditorHeight] = useState('200px');

  const handleRun = () => {
    onRun(code);
  };

  const handleReset = () => {
    setCode(initialCode);
    onReset();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    a.click();
  };

  return (
    <div className="sql-editor-container">
      <div className="editor-header">
        <div className="editor-title">
          <h3>SQL Editor</h3>
          <span className="db-info">Connected to: Practice Database</span>
        </div>
        <div className="editor-controls">
          <button 
            onClick={handleCopy}
            className="btn btn-secondary btn-small"
            title="Copy code"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={handleDownload}
            className="btn btn-secondary btn-small"
            title="Download SQL"
          >
            <Download size={16} />
          </button>
          <button 
            onClick={handleReset}
            className="btn btn-secondary btn-small"
            title="Reset to initial"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={handleRun}
            disabled={isLoading}
            className="btn btn-primary btn-run"
          >
            <Play size={16} />
            {isLoading ? 'Running...' : 'Run Query'}
          </button>
        </div>
      </div>
      
      <div className="editor-wrapper">
        <CodeMirror
          value={code}
          height={editorHeight}
          theme={oneDark}
          extensions={[sql()]}
          onChange={(value) => setCode(value)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            foldGutter: true,
            dropCursor: true,
            indentOnInput: true,
            syntaxHighlighting: true,
          }}
        />
        <div className="editor-resize">
          <button 
            onClick={() => setEditorHeight(prev => prev === '200px' ? '400px' : '200px')}
            className="resize-btn"
          >
            ↕
          </button>
        </div>
      </div>
      
      {results && (
        <div className="results-panel">
          <div className="results-header">
            <h4>Results</h4>
            <span className="results-info">
              {results.rows ? `${results.rows.length} row(s) returned` : 'No results'}
            </span>
          </div>
          {results.error ? (
            <div className="error-message">
              <strong>Error:</strong> {results.error}
            </div>
          ) : results.rows && results.rows.length > 0 ? (
            <div className="results-table-container">
              <table className="results-table">
                <thead>
                  <tr>
                    {Object.keys(results.rows[0]).map((column, index) => (
                      <th key={index}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex}>{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results">
              Query executed successfully. No rows returned.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SqlEditor;