import { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  X, 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Code,
  Link,
  Heading,
  Type,
  Palette,
  Tag,
  Folder,
  Clock,
  Download,
  FileText,
  File,
  Hash,
  Minus,
  Quote
} from 'lucide-react';

const NoteEditor = ({ note, onSave, onCancel, folders, allTags }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [selectedTags, setSelectedTags] = useState(note.tags);
  const [selectedFolder, setSelectedFolder] = useState(note.folder);
  const [color, setColor] = useState(note.color || '#3b82f6');
  const [isFavorite, setIsFavorite] = useState(note.isFavorite || false);
  const [newTag, setNewTag] = useState('');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const textareaRef = useRef(null);

  const colorOptions = [
    '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1',
    '#ec4899', '#14b8a6', '#f97316', '#84cc16'
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleAddTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = () => {
    const updatedNote = {
      ...note,
      title,
      content,
      tags: selectedTags,
      folder: selectedFolder,
      color,
      isFavorite,
      updatedAt: new Date().toISOString()
    };
    onSave(updatedNote);
  };

  // Formatting functions
  const formatText = (format) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newCursorPos = start;

    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        newCursorPos = start + 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        newCursorPos = start + 1;
        break;
      case 'h1':
        formattedText = `# ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'h2':
        formattedText = `## ${selectedText}`;
        newCursorPos = start + 3;
        break;
      case 'bullet':
        formattedText = `- ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'numbered':
        formattedText = `1. ${selectedText}`;
        newCursorPos = start + 3;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        newCursorPos = start + 1;
        break;
      case 'codeblock':
        formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
        newCursorPos = start + 4;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case 'divider':
        formattedText = `\n---\n`;
        newCursorPos = start + 5;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos + selectedText.length);
    }, 0);
  };

  // Export functions (simple versions)
  const exportAsText = () => {
    const textContent = `${title}\n\nFolder: ${selectedFolder}\nTags: ${selectedTags.join(', ')}\nCreated: ${new Date(note.createdAt).toLocaleDateString()}\nUpdated: ${new Date().toLocaleDateString()}\n\n${content}`;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    setShowExportOptions(false);
  };

  const exportAsMarkdown = () => {
    const markdownContent = `# ${title}\n\n**Folder:** ${selectedFolder}\n**Tags:** ${selectedTags.join(', ')}\n**Created:** ${new Date(note.createdAt).toLocaleDateString()}\n**Updated:** ${new Date().toLocaleDateString()}\n\n${content}`;
    
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    setShowExportOptions(false);
  };

  const copyToClipboard = () => {
    const textContent = `${title}\n\n${content}`;
    navigator.clipboard.writeText(textContent)
      .then(() => alert('Note copied to clipboard!'))
      .catch(() => alert('Failed to copy to clipboard'));
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  return (
    <div className="modal-overlay">
      <div className="modal-content note-editor-modal">
        <div className="editor-header">
          <div className="header-left">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="note-title-input"
            />
            <div className="note-meta">
              <Clock size={14} />
              <span>Last edited: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          
          <div className="header-right">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              ★
            </button>
            
            <div className="export-dropdown">
              <button 
                onClick={() => setShowExportOptions(!showExportOptions)}
                className="btn btn-secondary btn-small"
              >
                <Download size={16} />
                Export
              </button>
              
              {showExportOptions && (
                <div className="export-options">
                  <button onClick={exportAsText} className="export-option">
                    <File size={16} />
                    Text File
                  </button>
                  <button onClick={exportAsMarkdown} className="export-option">
                    <Type size={16} />
                    Markdown
                  </button>
                  <button onClick={copyToClipboard} className="export-option">
                    <FileText size={16} />
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
            
            <button onClick={handleSave} className="btn btn-primary">
              <Save size={16} />
              Save
            </button>
            
            <button onClick={onCancel} className="close-btn">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="editor-toolbar">
          <div className="toolbar-left">
            <div className="formatting-tools">
              <button 
                onClick={() => formatText('bold')}
                className="tool-btn"
                title="Bold (**text**)"
              >
                <Bold size={16} />
              </button>
              <button 
                onClick={() => formatText('italic')}
                className="tool-btn"
                title="Italic (*text*)"
              >
                <Italic size={16} />
              </button>
              <button 
                onClick={() => formatText('h1')}
                className="tool-btn"
                title="Heading 1 (# text)"
              >
                <Heading size={16} />
              </button>
              <button 
                onClick={() => formatText('h2')}
                className="tool-btn"
                title="Heading 2 (## text)"
              >
                <Hash size={16} />
              </button>
              <button 
                onClick={() => formatText('bullet')}
                className="tool-btn"
                title="Bullet List (- item)"
              >
                <List size={16} />
              </button>
              <button 
                onClick={() => formatText('numbered')}
                className="tool-btn"
                title="Numbered List (1. item)"
              >
                <ListOrdered size={16} />
              </button>
              <button 
                onClick={() => formatText('code')}
                className="tool-btn"
                title="Inline Code (`code`)"
              >
                <Code size={16} />
              </button>
              <button 
                onClick={() => formatText('codeblock')}
                className="tool-btn"
                title="Code Block (```code```)"
              >
                <Code size={16} />
                <span style={{ fontSize: '10px' }}>[]</span>
              </button>
              <button 
                onClick={() => formatText('quote')}
                className="tool-btn"
                title="Quote (> text)"
              >
                <Quote size={16} />
              </button>
              <button 
                onClick={() => formatText('divider')}
                className="tool-btn"
                title="Divider (---)"
              >
                <Minus size={16} />
              </button>
            </div>
          </div>
          
          <div className="toolbar-right">
            <div className="color-picker">
              <Palette size={16} />
              {colorOptions.map((col) => (
                <button
                  key={col}
                  className={`color-option ${color === col ? 'active' : ''}`}
                  style={{ backgroundColor: col }}
                  onClick={() => setColor(col)}
                  title={col}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="editor-main">
          <div className="editor-sidebar">
            <div className="sidebar-section">
              <h4>
                <Folder size={16} />
                Folder
              </h4>
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="folder-select"
              >
                {folders.map(folder => (
                  <option key={folder} value={folder}>{folder}</option>
                ))}
              </select>
            </div>

            <div className="sidebar-section">
              <h4>
                <Tag size={16} />
                Tags
              </h4>
              <div className="tags-input">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tag..."
                />
                <button onClick={handleAddTag} className="btn btn-small">
                  Add
                </button>
              </div>
              
              <div className="tags-list">
                {selectedTags.map(tag => (
                  <div key={tag} className="tag-item">
                    <span>{tag}</span>
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="suggested-tags">
                <p>Suggested:</p>
                <div className="suggested-tags-list">
                  {allTags
                    .filter(tag => !selectedTags.includes(tag))
                    .slice(0, 5)
                    .map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTags([...selectedTags, tag])}
                        className="suggested-tag"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h4>Note Stats</h4>
              <div className="note-info">
                <div className="info-item">
                  <span className="info-label">Created:</span>
                  <span className="info-value">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Words:</span>
                  <span className="info-value">{wordCount}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Chars:</span>
                  <span className="info-value">{charCount}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h4>Markdown Guide</h4>
              <div className="markdown-guide">
                <div className="guide-item">
                  <code># Heading 1</code>
                  <span>H1</span>
                </div>
                <div className="guide-item">
                  <code>## Heading 2</code>
                  <span>H2</span>
                </div>
                <div className="guide-item">
                  <code>**bold**</code>
                  <span>Bold</span>
                </div>
                <div className="guide-item">
                  <code>*italic*</code>
                  <span>Italic</span>
                </div>
                <div className="guide-item">
                  <code>- item</code>
                  <span>List</span>
                </div>
                <div className="guide-item">
                  <code>`code`</code>
                  <span>Code</span>
                </div>
              </div>
            </div>
          </div>

          <div className="editor-content">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here... Use markdown for formatting:"
              className="note-textarea"
              rows={10}
            />
            
            <div className="editor-tips">
              <p>💡 <strong>Tips:</strong> Select text and use formatting buttons above. Or type markdown directly.</p>
              <div className="tip-examples">
                <span><code># </code>Heading</span>
                <span><code>**</code>Bold<code>**</code></span>
                <span><code>`</code>Code<code>`</code></span>
                <span><code>- </code>List item</span>
              </div>
            </div>

            {/* Preview Pane */}
            <div className="preview-pane">
              <h4>Preview</h4>
              <div className="preview-content">
                {content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index}>{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index}>{line.substring(3)}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={index}>{line.substring(4)}</h3>;
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={index}>{line.substring(2, line.length - 2)}</strong>;
                  } else if (line.startsWith('*') && line.endsWith('*') && line[1] !== '*') {
                    return <em key={index}>{line.substring(1, line.length - 1)}</em>;
                  } else if (line.startsWith('`') && line.endsWith('`')) {
                    return <code key={index}>{line.substring(1, line.length - 1)}</code>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index}>{line.substring(2)}</li>;
                  } else if (line.startsWith('> ')) {
                    return <blockquote key={index}>{line.substring(2)}</blockquote>;
                  } else if (line === '---') {
                    return <hr key={index} />;
                  } else if (line.startsWith('```')) {
                    return null; // Skip code block markers
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index}>{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="editor-footer">
          <div className="footer-left">
            <span className="word-count">{wordCount} words • {charCount} characters</span>
          </div>
          <div className="footer-right">
            <button onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              <Save size={16} />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;