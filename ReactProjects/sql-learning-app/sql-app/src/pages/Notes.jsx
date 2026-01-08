import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit2, 
  Eye, 
  FileText, 
  File, 
  Folder,
  Clock,
  Tag,
  Bookmark,
  MoreVertical,
  ChevronDown,
  Grid,
  List,
  Save,
  X,
  BookOpen
} from 'lucide-react';
import NoteEditor from '../components/notes/NoteEditor';
import NoteCard from '../components/notes/NoteCard';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Sample initial notes
  const initialNotes = [
    {
      id: 1,
      title: 'SQL SELECT Statement Notes',
      content: `# SELECT Statement

## Basic Syntax
\`\`\`sql
SELECT column1, column2, ...
FROM table_name;
\`\`\`

## Key Points:
- SELECT retrieves data from a database
- Use * to select all columns
- Always end with semicolon

## Examples:
1. Select all columns:
\`\`\`sql
SELECT * FROM employees;
\`\`\`

2. Select specific columns:
\`\`\`sql
SELECT name, salary FROM employees;
\`\`\``,
      tags: ['sql', 'select', 'basics'],
      folder: 'SQL Basics',
      createdAt: '2024-01-15T10:30:00',
      updatedAt: '2024-01-16T14:20:00',
      isFavorite: true,
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'JOIN Operations',
      content: `# SQL JOIN Operations

## Types of JOINs:
1. **INNER JOIN**: Returns matching rows
2. **LEFT JOIN**: All left table rows + matches
3. **RIGHT JOIN**: All right table rows + matches
4. **FULL JOIN**: All rows when there's a match

## INNER JOIN Example:
\`\`\`sql
SELECT employees.name, departments.name 
FROM employees
INNER JOIN departments 
ON employees.dept_id = departments.id;
\`\`\``,
      tags: ['sql', 'joins', 'advanced'],
      folder: 'Advanced SQL',
      createdAt: '2024-01-18T09:15:00',
      updatedAt: '2024-01-19T16:45:00',
      isFavorite: true,
      color: '#8b5cf6'
    },
    {
      id: 3,
      title: 'WHERE Clause Examples',
      content: `# WHERE Clause

## Basic Usage:
\`\`\`sql
SELECT * FROM table
WHERE condition;
\`\`\`

## Operators:
- = : Equal
- <> : Not equal
- > : Greater than
- < : Less than
- BETWEEN : Between range
- LIKE : Pattern matching
- IN : Multiple values

## Examples:
\`\`\`sql
SELECT * FROM employees
WHERE salary > 50000 
AND department = 'Sales';
\`\`\``,
      tags: ['sql', 'where', 'filtering'],
      folder: 'SQL Basics',
      createdAt: '2024-01-20T11:00:00',
      updatedAt: '2024-01-20T11:00:00',
      isFavorite: false,
      color: '#10b981'
    }
  ];

  useEffect(() => {
    const savedNotes = localStorage.getItem('sqlNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(initialNotes);
      localStorage.setItem('sqlNotes', JSON.stringify(initialNotes));
    }
  }, []);

  useEffect(() => {
    let filtered = [...notes];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply folder filter
    if (selectedFolder !== 'all') {
      filtered = filtered.filter(note => note.folder === selectedFolder);
    }

    // Apply tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(note => note.tags.includes(selectedTag));
    }

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedFolder, selectedTag]);

  const folders = ['all', 'SQL Basics', 'Advanced SQL', 'Practice Problems', 'Interview Prep', 'Quick Reference'];
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const handleCreateNote = () => {
    setIsCreating(true);
    setSelectedNote({
      id: Date.now(),
      title: 'New Note',
      content: '# New Note\n\nStart writing here...',
      tags: [],
      folder: 'SQL Basics',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
      color: '#3b82f6'
    });
  };

  const handleSaveNote = (noteData) => {
    if (isCreating) {
      const newNote = {
        ...noteData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
      setIsCreating(false);
    } else {
      const updatedNotes = notes.map(note =>
        note.id === noteData.id 
          ? { ...noteData, updatedAt: new Date().toISOString() }
          : note
      );
      setNotes(updatedNotes);
    }
    
    setSelectedNote(null);
    setIsEditing(false);
  };

  const handleDeleteNote = (noteId) => {
    setNoteToDelete(noteId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updatedNotes = notes.filter(note => note.id !== noteToDelete);
    setNotes(updatedNotes);
    if (selectedNote?.id === noteToDelete) {
      setSelectedNote(null);
      setIsEditing(false);
    }
    setShowDeleteConfirm(false);
    setNoteToDelete(null);
  };

  const handleExportAll = () => {
    alert('Export feature would generate ZIP file with all notes in selected format');
  };

  const toggleFavorite = (noteId) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId 
        ? { ...note, isFavorite: !note.isFavorite }
        : note
    );
    setNotes(updatedNotes);
  };

  const stats = {
    total: notes.length,
    favorites: notes.filter(n => n.isFavorite).length,
    recent: notes.filter(n => {
      const noteDate = new Date(n.updatedAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return noteDate > weekAgo;
    }).length,
    folders: new Set(notes.map(n => n.folder)).size
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>
              <BookOpen size={28} />
              Notes
            </h1>
            <p>Create, organize, and export your SQL learning notes</p>
          </div>
          <div className="header-actions">
            <button onClick={handleCreateNote} className="btn btn-primary">
              <Plus size={16} />
              New Note
            </button>
            <button onClick={handleExportAll} className="btn btn-secondary">
              <Download size={16} />
              Export All
            </button>
          </div>
        </div>
      </div>

      <div className="notes-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Notes</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Bookmark size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.favorites}</div>
            <div className="stat-label">Favorites</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.recent}</div>
            <div className="stat-label">Recent (7 days)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Folder size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.folders}</div>
            <div className="stat-label">Folders</div>
          </div>
        </div>
      </div>

      <div className="notes-container">
        {/* Sidebar */}
        <div className="notes-sidebar">
          <div className="sidebar-section">
            <h3>Quick Actions</h3>
            <button onClick={handleCreateNote} className="sidebar-action">
              <Plus size={16} />
              New Note
            </button>
            <button className="sidebar-action">
              <Folder size={16} />
              New Folder
            </button>
            <button onClick={handleExportAll} className="sidebar-action">
              <Download size={16} />
              Export All
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Folders</h3>
            <div className="folders-list">
              {folders.map(folder => (
                <button
                  key={folder}
                  className={`folder-item ${selectedFolder === folder ? 'active' : ''}`}
                  onClick={() => setSelectedFolder(folder)}
                >
                  <Folder size={16} />
                  <span>{folder.charAt(0).toUpperCase() + folder.slice(1)}</span>
                  <span className="folder-count">
                    {folder === 'all' ? notes.length : notes.filter(n => n.folder === folder).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Tags</h3>
            <div className="tags-list">
              <button
                className={`tag-item ${selectedTag === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedTag('all')}
              >
                <Tag size={16} />
                <span>All Tags</span>
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-item ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  <Tag size={16} />
                  <span>{tag}</span>
                  <span className="tag-count">
                    {notes.filter(n => n.tags.includes(tag)).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>View Options</h3>
            <div className="view-options">
              <button
                className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
                Grid
              </button>
              <button
                className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="notes-main">
          {/* Search and Filter Bar */}
          <div className="notes-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="toolbar-actions">
              <div className="view-toggle">
                <button
                  className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>

              <div className="sort-dropdown">
                <button className="sort-btn">
                  Sort by: Recent <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Notes Grid/List */}
          {filteredNotes.length > 0 ? (
            <div className={`notes-${viewMode}`}>
              {filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onSelect={setSelectedNote}
                  onEdit={() => {
                    setSelectedNote(note);
                    setIsEditing(true);
                  }}
                  onDelete={() => handleDeleteNote(note.id)}
                  onToggleFavorite={toggleFavorite}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FileText size={64} />
              <h3>No notes found</h3>
              <p>{searchTerm ? 'Try a different search term' : 'Create your first note to get started'}</p>
              <button onClick={handleCreateNote} className="btn btn-primary">
                <Plus size={16} />
                Create Note
              </button>
            </div>
          )}

          {/* Selected Note Preview/Editor */}
          {(selectedNote && !isEditing && !isCreating) && (
            <div className="note-preview">
              <div className="preview-header">
                <h3>{selectedNote.title}</h3>
                <div className="preview-actions">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-secondary btn-small"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedNote.id)}
                    className="btn btn-secondary btn-small"
                  >
                    <Bookmark size={16} />
                    {selectedNote.isFavorite ? 'Unfavorite' : 'Favorite'}
                  </button>
                </div>
              </div>
              <div className="preview-content">
                <div 
                  className="note-content"
                  dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Note Editor Modal */}
      {(isEditing || isCreating) && selectedNote && (
        <NoteEditor
          note={selectedNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setSelectedNote(null);
            setIsEditing(false);
            setIsCreating(false);
          }}
          folders={folders.filter(f => f !== 'all')}
          allTags={allTags}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>Delete Note</h3>
              <button onClick={() => setShowDeleteConfirm(false)} className="close-btn">
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this note? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-danger">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;